from app.services.anomaly import detect_anomalies

def generate_warnings(trends_data):
    warnings = []

    # 1. Revenue anomalies
    revenue_anomalies = detect_anomalies(trends_data["revenue"])
    for a in revenue_anomalies:
        warnings.append({
            "title": "Revenue Anomaly",
            "message": f"{a['type'].capitalize()} detected in {a['label']}: {a['value']} vs expected {a['expected']}"
        })

    # 2. Complaint anomalies
    complaint_anomalies = detect_anomalies(trends_data["complaints"])
    for a in complaint_anomalies:
        warnings.append({
            "title": "Complaint Spike",
            "message": f"{a['type'].capitalize()} in complaints during {a['label']}"
        })

    # 3. Transaction failure spike
    failure_anomalies = detect_anomalies(trends_data["failures"])
    for a in failure_anomalies:
        warnings.append({
            "title": "Transaction Failure",
            "message": f"High failure rate in {a['label']}"
        })

    return warnings