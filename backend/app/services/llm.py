import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()


client = Groq(api_key=os.getenv("GROQ_API_KEY"))



def text_to_sql(user_query):
    prompt = f"""
    Convert this question into SQL:

    Question: {user_query}

    Tables:
    customers(customer_id, join_date, region, age_group, churn)
    transactions(transaction_id, customer_id, date, region, product, amount, status)
    complaints(complaint_id, customer_id, date, issue_type, resolution_time)

    Rules:
    - Use SQLite syntax
    - Use aggregation when needed
    - Handle time phrases like 'last month'
    
    CRITICAL:
- Use SQLite date syntax ONLY
- For last 3 months use:
  DATE('now', '-3 months')
- NEVER use DATE_SUB or INTERVAL

- complaints table has ONLY:
  complaint_id, customer_id, date, issue_type, resolution_time
- DO NOT use region or product in complaints queries

    Only return SQL query.
    """

    response = client.chat.completions.create(
    model="llama-3.1-8b-instant",   # ✅ WORKING MODEL
    messages=[
        {
  "role": "system",
  "content": """
You are an expert SQL generator.

STRICT RULES:
- Return ONLY ONE SQL query
- NEVER return multiple queries
- NEVER add comments (-- ...)
- NO explanations
- NO markdown

Rules:
- Use SQLite syntax
- Use correct table names: customers, transactions, complaints
- DO NOT use JOIN unless necessary
- For revenue → use transactions table
- For "by region" → GROUP BY region
- For "trend" → include date and GROUP BY date

Return ONLY ONE clean SQL query.
"""
},
        {"role": "user", "content": prompt}
    ],
    temperature=0
)

    return response.choices[0].message.content.strip()


import re

def clean_sql(query: str) -> str:
    query = query.replace("```sql", "").replace("```", "")

    # ❗ remove comments (-- ...)
    query = re.sub(r"--.*", "", query)

    # ❗ take only first query
    query = query.split(";")[0]

    return query.strip()

def fix_sql(query: str) -> str:
    # Fix wrong status values
    query = query.replace("paid", "success")

    # Fix date issue (replace DATE('now') logic)
    if "DATE('now'" in query:
        query = query.replace(
            "DATE('now', '-1 month')",
            "DATE((SELECT MAX(date) FROM transactions), '-30 days')"
        )

    # Remove unnecessary joins (basic cleanup)
    if "JOIN customers" in query and "customers." not in query:
        query = query.replace(
            "FROM customers T1 JOIN transactions T2 ON T1.customer_id = T2.customer_id",
            "FROM transactions T2"
        )

    return query