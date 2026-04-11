# def detect_anomaly(data, forecast_data):
#     try:
#         if not data or not forecast_data:
#             return None

#         latest_actual = list(data[0].values())[-1]
#         expected = forecast_data["forecast"][0]

#         if latest_actual > expected * 1.2:
#             return "Spike detected: Value is higher than expected range."

#         if latest_actual < expected * 0.8:
#             return "Drop detected: Value is lower than expected range."

#         return None

#     except Exception:
#         return None

def detect_anomaly(data):
    try:
        if not data:
            return None

        row = data[0]
        values = list(row.values())

        if len(values) == 0:
            return None

        current = values[-1]

        if isinstance(current, (int, float)):
            if current > 1_000_000:
                return "⚠️ Revenue spike detected — could be seasonal surge or unusual activity."

            if current < 500:
                return "⚠️ Revenue unusually low — possible drop in transactions or system issue."

        return None

    except Exception:
        return None