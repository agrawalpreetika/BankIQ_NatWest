import sqlite3
import pandas as pd

def init_db():
    conn = sqlite3.connect("bank.db")

    customers = pd.read_csv("data/customers.csv")
    transactions = pd.read_csv("data/transactions.csv")
    complaints = pd.read_csv("data/complaints.csv")

    customers.to_sql("customers", conn, if_exists="replace", index=False)
    transactions.to_sql("transactions", conn, if_exists="replace", index=False)
    complaints.to_sql("complaints", conn, if_exists="replace", index=False)

    conn.commit()
    conn.close()

def get_connection():
    return sqlite3.connect("bank.db")


