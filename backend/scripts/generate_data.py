import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

np.random.seed(42)

# CONFIG
num_customers = 500
num_transactions = 5000
num_complaints = 800

regions = ["North", "South", "East", "West"]
products = ["Credit Card", "Loan", "Savings"]
statuses = ["success", "failed"]
issues = ["payment_failure", "login_issue", "card_blocked"]

# ----------------------
# Customers Table
# ----------------------
customers = []
for i in range(num_customers):
    customers.append([
        i,
        datetime(2023,1,1) + timedelta(days=random.randint(0, 365)),
        random.choice(regions),
        random.choice(["18-25", "26-35", "36-50", "50+"]),
        np.random.choice([0,1], p=[0.85, 0.15])  # 15% churn
    ])

customers_df = pd.DataFrame(customers, columns=[
    "customer_id", "join_date", "region", "age_group", "churn"
])

# ----------------------
# Transactions Table
# ----------------------
transactions = []
for i in range(num_transactions):
    cust_id = random.randint(0, num_customers-1)
    region = customers_df.loc[cust_id, "region"]

    txn_date = datetime(2024,1,1) + timedelta(days=random.randint(0, 90))

    amount = round(np.random.normal(2000, 500), 2)

    # 📉 Revenue drop in last days
    if txn_date > datetime(2024,3,15):
        amount *= 0.8

    # 🚨 Increased failures (anomaly)
    if txn_date > datetime(2024,3,20):
        status = np.random.choice(statuses, p=[0.7, 0.3])
    else:
        status = np.random.choice(statuses, p=[0.9, 0.1])

    transactions.append([
        i,
        cust_id,
        txn_date,
        region,
        random.choice(products),
        max(100, amount),
        status
    ])

transactions_df = pd.DataFrame(transactions, columns=[
    "transaction_id","customer_id","date","region","product","amount","status"
])

# ----------------------
# Complaints Table
# ----------------------
complaints = []
for i in range(num_complaints):
    cust_id = random.randint(0, num_customers-1)
    issue_type = np.random.choice(issues, p=[0.5, 0.3, 0.2])

    # 📞 Higher resolution time for serious issues
    if issue_type == "payment_failure":
        resolution_time = random.randint(12, 72)
    else:
        resolution_time = random.randint(1, 24)

    complaints.append([
        i,
        cust_id,
        datetime(2024,1,1) + timedelta(days=random.randint(0, 90)),
        issue_type,
        resolution_time
    ])

complaints_df = pd.DataFrame(complaints, columns=[
    "complaint_id","customer_id","date","issue_type","resolution_time"
])

# Count complaints per customer
complaint_counts = complaints_df.groupby("customer_id").size()

# Update churn probability based on complaints
for cust_id, count in complaint_counts.items():
    if count > 3:
        customers_df.loc[cust_id, "churn"] = np.random.choice([0,1], p=[0.6, 0.4])
    elif count > 1:
        customers_df.loc[cust_id, "churn"] = np.random.choice([0,1], p=[0.75, 0.25])

# ----------------------
# SAVE FILES
# ----------------------
import os

# Create data folder if it doesn't exist
output_dir = os.path.join(os.path.dirname(__file__), "..", "data")
os.makedirs(output_dir, exist_ok=True)

# Save files
customers_df.to_csv(os.path.join(output_dir, "customers.csv"), index=False)
transactions_df.to_csv(os.path.join(output_dir, "transactions.csv"), index=False)
complaints_df.to_csv(os.path.join(output_dir, "complaints.csv"), index=False)

print(f"✅ Files saved in: {output_dir}")