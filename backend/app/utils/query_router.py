def detect_query_type(query: str):

    q = query.lower()

    forecast_keywords = [
        "forecast", "predict", "future",
        "next week", "next month", "projection", "next"
    ]

    anomaly_keywords = [
        "anomaly", "unusual", "spike", "drop"
    ]

    if any(k in q for k in forecast_keywords):
        return "forecast"

    if any(k in q for k in anomaly_keywords):
        return "anomaly"

    return "sql"