def parse_query_intent(user_query: str, sql_query: str = None, data=None):
    query = user_query.lower()

    # =========================
    # 1. FORCE FORECAST
    # =========================
    if "forecast" in query or "predict" in query:
        return "line"

    # =========================
    # 2. TIME SERIES DETECT
    # =========================
    if any(word in query for word in ["trend", "over time", "daily", "monthly", "weekly"]):
        return "line"

    # =========================
    # 3. COMPARISON
    # =========================
    if "compare" in query or "vs" in query:
        return "bar"

    # =========================
    # 4. DISTRIBUTION / PARTS OF WHOLE
    # =========================
    if any(word in query for word in ["distribution", "share", "breakdown"]):
        return "pie"

    # =========================
    # 5. REGION / CATEGORY GROUPING
    # =========================
    if "by region" in query or "region" in query:
        return "pie"

    # =========================
    # 6. FALLBACK BASED ON DATA
    # =========================
    if data:
        keys = list(data[0].keys())

        if any("date" in k.lower() for k in keys):
            return "line"

        if any("region" in k.lower() for k in keys):
            return "pie"

    return "bar"