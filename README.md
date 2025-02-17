
==========================================
        Expense Tracker CLI - README
==========================================

Expense Tracker CLI is a simple command-line tool for managing expenses.
You can add, delete, list, and summarize expenses by month.

Project URL: https://roadmap.sh/projects/expense-tracker

------------------------------------------
📌 INSTALLATION
------------------------------------------

1. Clone the repository:
   git clone https://github.com/erybie222/expenseTracker.git
   cd expenseTracker

2. Install dependencies:
   npm install

3. Link the script to your system (optional):
   npm link

------------------------------------------
📌 USAGE
------------------------------------------

After installation, use the `expense-tracker` command in the terminal.

➕ ADDING AN EXPENSE
---------------------
expense-tracker add --description "Lunch" --amount 20

✅ OUTPUT:
# Expense added successfully (ID: 1)

📋 LISTING EXPENSES
---------------------
expense-tracker list

✅ OUTPUT:
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20

🗑 DELETING AN EXPENSE
-----------------------
expense-tracker delete --id 1

✅ OUTPUT:
# Expense deleted successfully

📊 TOTAL EXPENSES SUMMARY
--------------------------
expense-tracker summary

✅ OUTPUT:
# Total expenses: $30

📆 MONTHLY EXPENSE SUMMARY
--------------------------
expense-tracker summary --month 8

✅ OUTPUT:
# Total expenses for month 8: $20

------------------------------------------
📌 EXPENSE FILE STRUCTURE
------------------------------------------

Each expense is saved in `expenses.csv` in the following format:
ID,Date,Description,Amount
1,2024-08-06,Lunch,20

------------------------------------------
📌 REQUIREMENTS
------------------------------------------

- Node.js (>=14.0)
- npm

------------------------------------------
📌 LICENSE
------------------------------------------

MIT License 📜

Feel free to contribute with forks and pull requests! 🚀

