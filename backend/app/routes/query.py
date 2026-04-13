
from fastapi import APIRouter

from app.services.llm import text_to_sql, clean_sql, fix_sql
from app.services.sql_engine import run_query

from app.services.insights import (
    generate_explanation,
    generate_root_cause,
    generate_recommendation,
    generate_chart_data,
    generate_forecast_explanation,
    generate_forecast_recommendation
)

# from app.services.forecast import forecast_series
from app.services.anomaly import detect_anomalies

from app.utils.query_router import detect_query_type
import pandas as pd
from app.services.forecast_service import run_forecast
from app.utils.understand_query import parse_query_intent

router = APIRouter()

import re

def extract_forecast_period(user_query: str) -> int:
    query = user_query.lower()

    # explicit number (e.g. "next 10 days")
    match = re.search(r'(\d+)\s*(day|days|week|weeks)', query)
    if match:
        value = int(match.group(1))
        unit = match.group(2)

        if "week" in unit:
            return value * 7
        return value

    # keywords
    if "week" in query:
        return 7
    if "month" in query:
        return 30

    # default
    return 7

def extract_region(user_query):
    regions = ["north", "south", "east", "west"]
    query = user_query.lower()

    for r in regions:
        if r in query:
            return r.capitalize()
    return None

def extract_metric(user_query):
    query = user_query.lower()

    if "transaction" in query:
        return "volume"
    if "revenue" in query or "amount" in query:
        return "revenue"
    if "failure" in query:
        return "failure"

    return "revenue"  # default


@router.post("/")
def handle_query(request: dict):

    user_query = request["query"]

    # =========================
    # 1. DETECT INTENT (NEW)
    # =========================
    query_type = detect_query_type(user_query)

    # =========================
    # 2. FORECAST FLOW (SEPARATE)
    # =========================
    if query_type == "forecast":

        # ⚠️ IMPORTANT:
        # You still need historical data source
        region = extract_region(user_query)
        metric = extract_metric(user_query)

        # 🎯 choose aggregation based on metric
        if metric == "revenue":
            value_expr = "SUM(amount)"
        elif metric == "volume":
            value_expr = "COUNT(*)"
        elif metric == "failure":
            value_expr = "SUM(CASE WHEN status != 'success' THEN 1 ELSE 0 END)"
        else:
            value_expr = "SUM(amount)"  # fallback

        # 🎯 dynamic SQL
        sql_query = f"""
        SELECT date, {value_expr} as value
        FROM transactions
        WHERE 1=1
        """

        if metric != "failure":
            sql_query += " AND status = 'success'"

        if region:
            sql_query += f" AND region = '{region}'"

        sql_query += """
        GROUP BY date
        ORDER BY date
        """


        data = run_query(sql_query)

        df = pd.DataFrame(data)

        # 🚨 STEP 1: check empty data
        if df.empty:
            return {
                "type": "forecast",
                "error": "No data available for forecasting"
            }

        # 🚨 STEP 2: must have time column
        if "date" not in df.columns:
            return {
                "type": "forecast",
                "error": "Forecast requires time-series data (date column missing)"
            }

        # 🚨 STEP 3: must have at least 2 columns
        if len(df.columns) < 2:
            return {
                "type": "forecast",
                "error": "Not enough data for forecasting"
            }

        # 🚨 STEP 4: detect value column automatically
        value_cols = [col for col in df.columns if col != "date"]

        if not value_cols:
            return {
                "type": "forecast",
                "error": "No numeric column found for forecasting"
            }

        value_col = value_cols[0]

        # 🚨 STEP 5: rename for Prophet
        df = df.rename(columns={
            "date": "ds",
            value_col: "y"
        })

        # 🚨 STEP 6: convert date
        df["ds"] = pd.to_datetime(df["ds"])

        # 🚨 STEP 7: run forecast safely
        try:
            periods = extract_forecast_period(user_query)
            forecast_data = run_forecast(df, periods)
        except Exception as e:
            return {
                "type": "forecast",
                "error": f"Forecast failed: {str(e)}"
            }

        return {
    "type": "analysis",  # ✅ IMPORTANT (so frontend accepts it)

    "insights": {
        "summary": generate_forecast_explanation(
            forecast_data,
            user_query
        ),
        "root_cause": None
    },

    "recommendation": generate_forecast_recommendation(forecast_data, user_query),

    # ✅ send forecast as chart
    "chart": {
    "type": "line",
    "data": [
        {
            "label": row["ds"],
            "value": row["yhat"]
        }
        for row in forecast_data
    ]
},

    "sql": sql_query,

    # ✅ keep raw forecast
    "data": forecast_data
}
        
        

    # =========================
    # 3. ANOMALY FLOW
    # =========================
    if query_type == "anomaly":

        sql_query = text_to_sql(user_query)
        data = run_query(sql_query)

        warning = detect_anomalies(data)

        return {
            "type": "anomaly",
            "warning": warning,
            "data": data
        }

    # =========================
    # 4. DEFAULT SQL FLOW
    # =========================
    sql_query = text_to_sql(user_query)
    sql_query = clean_sql(sql_query)
    sql_query = fix_sql(sql_query)

    data = run_query(sql_query)
    
    chart_type = parse_query_intent(user_query)

    chart = generate_chart_data(data, chart_type)

    return {
        "type": "analysis",
        "insights": {
            "summary": generate_explanation(user_query, data),
            "root_cause": generate_root_cause(data, user_query)
        },
        "recommendation": generate_recommendation(data, user_query),
        "chart": chart,
        "sql": sql_query,
        "data": data
    }