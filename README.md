<div align="center">
  <table>
  <tr>
    <td align="left" width="70%">
      <h3>Team Name: Accept_All_Cookies</h2>
      <h1>BankIQ</h1>
      <p><i>Your 24/7 Intelligent Banking Colleague</i></p>
    </td>
    <td align="right" width="30%">
      <img src="https://github.com/user-attachments/assets/ca4f54e5-bd1a-478e-ae08-3af40c135459" alt="BankIQ Logo" width="100%"/>
    </td>
  </tr>
  </table>
</div>


## 1. Solution Overview

**BankIQ** is an AI-powered *talk-to-data* platform that enables users to query banking data using natural language and instantly receive insights, visualizations, and forecasts.

It eliminates the need for manual SQL queries and static dashboards by converting user questions into data-driven outputs such as charts, summaries, and anomaly alerts.

The solution is designed for **bank analysts, business teams, and non-technical stakeholders** who need fast, intelligent access to banking insights for better decision-making.

(SCREENSHOTS OF DASHBOARD, TABS)

## 2. Features

- **Natural Language to SQL Conversion:** </br> Converts user queries in plain English into executable SQL queries using an LLM.

- **Dynamic Data Visualization:**  
  Automatically generates **bar, line, and pie charts** based on the query result and data type.

- **AI-Generated Insights:**  
  Provides intelligent summaries, trend analysis, root-cause explanations, and actionable recommendations.

- **Time-Series Forecasting:**  
  Predicts future trends such as revenue, transaction volume, and failure patterns using historical data.

- **Basic Anomaly Detection:**  
  Identifies unusual patterns and flags anomalies in the queried data.

- **Smart Query Routing:**  
  Automatically classifies user queries into **analysis, forecasting, or anomaly detection** workflows.

- **Region-Based Filtering:**  
  Supports location-specific queries such as regional revenue trends and transaction insights.

## 3. Install and Run Instructions

### 3.1 Deployed Link:
Access the live deployed application here:   **[BankIQ Live Demo](https://bank-iq-nat-west.vercel.app/)**

```bash
https://bank-iq-nat-west.vercel.app/
```

---

### 3.2 Backend Setup

**1. Navigate to the backend directory:**

```bash
cd backend
```

**2. Create a virtual environment:**

```bash
python -m venv venv
```

**3. Activate the virtual environment:**

- **Mac/Linux**
  ```bash
  source venv/bin/activate
  ```

- Windows
  ```bash
  venv\Scripts\activate
  ```

**4. Install dependencies:**

```bash
pip install -r requirements.txt
```

**5. Create a `.env` file:**

```bash
touch .env
```

**6. Add the following environment variable inside `.env`:**

```env
GROQ_API_KEY=your_api_key_here
```

**7. Run the backend server:**

```bash
uvicorn app.main:app --reload
```

---

### 3.3 Frontend Setup

> Open a new terminal window before running the frontend.

**1. Navigate to the frontend directory:**

```bash
cd frontend
```

**2. Install dependencies:**

```bash
npm install
```

**3. Start the frontend application:**

```bash
npm start
```

---

## 4. Tech Stack

### Frontend:
- **React.js** – Frontend framework for building the user interface
- **Recharts** – Data visualization library for charts and graphs
- **Axios** – API communication between frontend and backend
- **Tailwind CSS** – UI styling and responsive design

### Backend:
- **Python** – Core programming language
- **FastAPI** – Backend framework for REST API development

### Data Processing:
- **Pandas** – Data manipulation and processing
- **NumPy** – Numerical computations

### AI / NLP:
- **Groq API** – LLM inference service
- **LLaMA 3.1** – Natural language to SQL conversion and AI-generated insights

### Forecasting:
- **Prophet (Meta)** – Time-series forecasting and trend prediction

### Database:
- **SQLite** – Relational database for storing and querying banking data

## 5. Usage Examples

### 5.1 BankIQ in Action  
**(Features aligned with the "Talk to Data" problem statement)**

The following examples demonstrate how BankIQ supports **natural language querying, comparative analysis, trend understanding, reasoning, and data-driven insights:**.

<p align="center">
  <img src="PASTE_IMAGE_LINK_FOR_TALK_TO_DATA_FEATURES" alt="BankIQ in Action" width="850"/>
</p>

---

### 5.2 Additional Features  
**(Advanced capabilities aligned with "AI Predictive Forecasting")**

These examples showcase predictive **analytics, scenario comparison, short-term forecasting, and anomaly detection** capabilities:

<p align="center">
  <img src="PASTE_IMAGE_LINK_FOR_FORECASTING_FEATURES" alt="Additional Features" width="100%"/>
</p>

---

### 5.3 Try Yourself:

Go to our deployed link → **Dashboard** → paste any of the following commands and hit **Enter**.

#### Main Queries:
```text
What is posing Credit Risk this quarter?
Compare North and South region revenues
Which product should we focus on?
Failure trend over time
```

#### Additional Queries:
```text
what happens if churn increases by 10%?
what will the next few weeks look like for transactions?
Show branches currently at risk
```

---

## 6. Architecture

This section provides a high-level overview of the system design, implementation workflow, data flow, database schema, and project structure.
### Included Diagrams:
- **Implementation Flow**
- **Data Flow Diagram**
- **Database Schema**
- **File Structure**

<p align="center">
  <img src="PASTE_ARCHITECTURE_IMAGE_LINK_HERE" alt="BankIQ Architecture" width="900"/>
</p>

---

## 7. Limitations & Future Improvements

### Current Limitations:
- Uses **Groq LLM API** due to its free accessibility and ease of integration, so query depth is limited.
- **Trends** and **Warnings** tabs are presently hardcoded due to time constraints.

### Future Improvements:
- Add **multi-metric forecasting**.
- Implement **LLM response caching**.
- Make **Trends** and **Warnings** fully dynamic.
