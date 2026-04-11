import pandas as pd
from statsmodels.tsa.holtwinters import ExponentialSmoothing

def forecast_series(data):
    try:
        if not data or len(data) < 5:
            return {}

        df = pd.DataFrame(data)

        if "date" not in df.columns:
            return {}

        # pick numeric column
        numeric_col = df.select_dtypes(include=['number']).columns[0]
        series = df[numeric_col]

        # model
        model = ExponentialSmoothing(series, trend='add', seasonal=None).fit()

        forecast = model.forecast(4)

        # bounds
        lower = forecast * 0.9
        upper = forecast * 1.1

        # growth %
        last_val = series.iloc[-1]
        growth = ((forecast.mean() - last_val) / last_val) * 100

        return {
            "forecast": forecast.tolist(),
            "lower": lower.tolist(),
            "upper": upper.tolist(),
            "growth_percent": round(growth, 2)
        }

    except Exception:
        return {}