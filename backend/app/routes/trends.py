from fastapi import APIRouter
from app.services.sql_engine import run_query
from app.services.warning_service import generate_warnings

router = APIRouter()

@router.get("/trends")
def get_trends():

    # ---------- TRANSACTIONS ----------
    tx_latest = run_query("SELECT MAX(date) as max_date FROM transactions")
    tx_latest_date = tx_latest[0]["max_date"]

    revenue = run_query(f"""
    SELECT strftime('%Y-%m', date) as label,
       SUM(amount) as value
FROM transactions
WHERE date >= DATE('{tx_latest_date}', 'start of month', '-2 months')
  AND status = 'success'
GROUP BY label
ORDER BY label;
    """)

    transactions = run_query(f"""
    SELECT strftime('%Y-%m', date) as label,
           COUNT(*) as value
    FROM transactions
    WHERE date >= DATE('{tx_latest_date}', '-3 months')
     AND status = 'success'
    GROUP BY label
    ORDER BY label;
    """)

    # ---------- CUSTOMERS ----------
    cust_latest = run_query("SELECT MAX(join_date) as max_date FROM customers")
    cust_latest_date = cust_latest[0]["max_date"]

    customers = run_query(f"""
    SELECT strftime('%Y-%m', join_date) as label,
           COUNT(*) as value
    FROM customers
    WHERE join_date >= DATE('{cust_latest_date}', '-5 months')
    GROUP BY label
    ORDER BY label;
    """)

    # ---------- COMPLAINTS ----------
    comp_latest = run_query("SELECT MAX(date) as max_date FROM complaints")
    comp_latest_date = comp_latest[0]["max_date"]

    complaints = run_query(f"""
    SELECT strftime('%Y-%m', date) as label,
           COUNT(*) as value
    FROM complaints
    WHERE date >= DATE('{comp_latest_date}', '-3 months')
    GROUP BY label
    ORDER BY label;
    """)
    
    failures = run_query(f"""
SELECT strftime('%Y-%m', date) as label,
       COUNT(*) as value
FROM transactions
WHERE status = 'failed'
AND date >= DATE('{tx_latest_date}', 'start of month', '-2 months')
GROUP BY label
ORDER BY label;
""")

    data = {
        "revenue": revenue,
        "transactions": transactions,
        "customers": customers,
        "complaints": complaints,
        "failures": failures
    }

    warnings = generate_warnings(data)

    return {
        "charts": data, 
        "warnings": warnings
    }
    
    
    
