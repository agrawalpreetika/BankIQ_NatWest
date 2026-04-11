from prophet import Prophet
import pandas as pd

def run_forecast(df, periods=7):
    """
    df must have columns: ds, y
    """

    model = Prophet(
        daily_seasonality=True,
        weekly_seasonality=True
    )

    model.fit(df)

    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)

    result = forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail(periods)

    # 🎯 FIX: round values
    result['yhat'] = result['yhat'].round().astype(int)
    result['yhat_lower'] = result['yhat_lower'].round().astype(int)
    result['yhat_upper'] = result['yhat_upper'].round().astype(int)

    return result.to_dict(orient="records")