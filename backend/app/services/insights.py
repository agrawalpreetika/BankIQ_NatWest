from app.services.llm import client
BASE_PROMPT = """
You are a financial insight assistant.

RULES:
- You MUST NOT generate or assume any numbers.
- You can ONLY use the data provided.
- Never predict or extrapolate beyond given data.
- Do NOT say "will happen" unless forecast data is explicitly provided.
- Keep responses factual, short, and data-driven.

IF FORECAST DATA IS PRESENT:
- Describe trend direction (up/down/stable)


IF ONLY HISTORICAL DATA IS PRESENT:
- Summarize patterns
- Identify spikes/drops
- Suggest possible reasons as hypotheses
"""

def generate_explanation(user_query, data):
    prompt = f"""
You are a banking analyst.

Explain the result clearly.

Question: {user_query}
Data: {data}

Rules:
- Mention exact numbers
- If possible, compare with previous period
- Avoid generic phrases like "significant amount"
- Keep it 2-3 lines
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You explain data insights simply."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()

# def generate_chart_data(data):
#     # ❌ No data
#     if not data or isinstance(data, dict):
#         return []

#     keys = list(data[0].keys())

#     # ❌ Only one column → no chart possible
#     if len(keys) < 2:
#         return []

#     # ✅ Known patterns
#     if "region" in keys and "revenue" in keys:
#         return [{"label": row["region"], "value": row["revenue"]} for row in data]

#     if "date" in keys and "amount" in keys:
#         return [{"label": row["date"], "value": row["amount"]} for row in data]

#     # ✅ Safe fallback
#     first_key, second_key = keys[0], keys[1]

#     return [
#         {
#             "label": str(row[first_key]),
#             "value": row[second_key]
#         }
#         for row in data
#     ]
    
    
def generate_chart_data(data, chart_type="bar"):
    if not data or isinstance(data, dict):
        return {"type": "bar", "data": []}

    keys = list(data[0].keys())

    if len(keys) < 2:
        return {"type": chart_type, "data": []}

    x_key = keys[0]
    y_key = keys[1]

    return {
        "type": chart_type,
        "data": [
            {"label": str(row[x_key]), "value": row[y_key]}
            for row in data
        ]
    }
    
def generate_root_cause(data, user_query):
    from app.services.llm import client

    prompt = f"""
You are a banking analyst.

User asked:
{user_query}

Data:
{data}

Find the most likely reasons behind the change.

Rules:
- Mention 2–3 causes
- Use region, product, failures if relevant
- Keep it simple and clear
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You analyze business data."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()


def generate_recommendation(data, user_query):
    from app.services.llm import client

    prompt = f"""
User asked:
{user_query}

Data:
{data}

Suggest 1–2 actionable steps for a bank employee.

Rules:
- Be practical
- No generic advice
- Keep it short
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You suggest business actions."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()


def generate_forecast_explanation(forecast_data, user_query):
    from app.services.llm import client

    prompt = BASE_PROMPT  + f"""
You are a banking analyst.

Forecast data:
{forecast_data}

Explain:
- Expected growth/decline %
- Range (low, high)
- Any pattern (trend or spike)

Output in simple language (2-3 lines).
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    return response.choices[0].message.content.strip()