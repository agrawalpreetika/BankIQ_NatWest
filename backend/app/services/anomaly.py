import numpy as np

def detect_anomalies(data, label="value"):
    if not data or len(data) < 3:
        return []

    values = [d[label] for d in data if d[label] is not None]

    if len(values) < 3:
        return []

    mean = np.mean(values)
    std = np.std(values)

    if std == 0:
        return []

    threshold_high = mean + 2 * std
    threshold_low = mean - 2 * std

    anomalies = []

    for d in data:
        val = d.get(label)
        if val is None:
            continue

        if val > threshold_high:
            severity = "critical" if val > mean + 3*std else "high"

            anomalies.append({
                "title": "Spike detected",
                "desc": f"Value {val} is significantly higher than expected ({round(mean,2)})",
                "severity": severity,
                "date": d["label"]
            })

        elif val < threshold_low:
            anomalies.append({
                "title": "Drop detected",
                "desc": f"Value {val} is significantly lower than expected ({round(mean,2)})",
                "severity": "medium",
                "date": d["label"]
            })

    return anomalies