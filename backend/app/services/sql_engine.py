from database.db import get_connection

def run_query(sql_query):
    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute(sql_query)
        columns = [col[0] for col in cursor.description]
        data = cursor.fetchall()

        result = [dict(zip(columns, row)) for row in data]
        return result
    except Exception as e:
        return {"error": str(e)}
    finally:
        conn.close()