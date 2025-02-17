#!/usr/bin/env node

import fs from "fs";
import { program } from "commander";

const fileName = "expenses.csv"; // File where expenses are stored

// Define the "add" command
program
  .command("add")
  .description("Add a new expense")
  .requiredOption("--description <string>", "Description of the expense")
  .requiredOption("--amount <number>", "Amount of the expense")
  .action((options) => {
    add(options.description, options.amount);
  });

// Define the "delete" command
program
  .command("delete")
  .description("Delete an expense")
  .requiredOption("--id <number>", "Id of expense that you want to delete")
  .action((options) => {
    deleteExpense(options.id);
  });

// Define the "list" command
program.command("list").description("Shows all expenses").action(list);

// Define the "summary" command
program
  .command("summary")
  .description("Summary of expenses")
  .option("--month <number>", "Filter expenses by month")
  .action((options) => {
    summaryMonth(options.month);
  });

// Parse command-line arguments
program.parse(process.argv);

/**
 * Adds a new expense to the file
 * @param {string} description - The description of the expense
 * @param {number} amount - The amount spent
 */
function add(description, amount) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err && err.code === "ENOENT") {
      // If file does not exist, create it
      fs.writeFileSync(fileName, "");
      data = "";
    } else if (err) {
      console.log("Reading error ", err);
      return;
    }

    const rows = data
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    // Create a new expense object
    const expense = {
      ID: rows.length, // ID is based on the number of rows
      Date: new Date().toISOString().split("T")[0], // Get today's date
      Description: description,
      amount: amount,
    };

    const expenseCsv = Object.values(expense).join(",") + "\n";

    // Append the new expense to the file
    fs.appendFile(fileName, expenseCsv, (err) => {
      if (err) {
        console.log("Error saving data ", err);
      } else {
        console.log(`# Expense added successfully (ID: ${expense.ID})`);
      }
    });
  });
}

/**
 * Lists all stored expenses
 */
function list() {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err || !data.trim()) {
      console.log("No expenses found.", err);
      return;
    }

    const rows = data
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    // Print each expense in a formatted table
    rows.forEach(([id, date, description, amount]) => {
      console.log(
        `# ${id.padEnd(3)} ${date.padEnd(10)} ${description.padEnd(
          15
        )} $${amount}`
      );
    });
  });
}

/**
 * Deletes an expense by ID
 * @param {number} id - The ID of the expense to delete
 */
function deleteExpense(id) {
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.log("Reading error ", err);
      process.exit(1);
    }

    let rows = data
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    // Filter out the expense with the given ID
    rows = rows.filter((row) => row[0] !== id.toString());

    const updatedData =
      rows.length > 0 ? rows.map((row) => row.join(",")).join("\n") : "";

    // Save the updated expenses back to the file
    fs.writeFile(fileName, updatedData, (err) => {
      if (err) {
        console.log("Error saving data ", err);
      } else {
        console.log(`# Expense deleted successfully`);
      }
    });
  });
}

/**
 * Shows the total expenses for a given month (or all months if not specified)
 * @param {number} month - The month to filter expenses by (optional)
 */
function summaryMonth(month) {
  let sum = 0;
  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.log("Reading error ", err);
      process.exit(1);
    }

    const rows = data
      .trim()
      .split("\n")
      .map((row) => row.split(","));

    let filteredRows = rows;

    // Filter expenses by the specified month (if provided)
    if (month) {
      const formattedMonth = month.toString().padStart(2, "0"); // Ensure month is 2-digit
      filteredRows = rows.filter((row) => {
        const rowMonth = row[1].split("-")[1]; // Extract month from date
        return rowMonth === formattedMonth;
      });
    }

    // Sum up the expenses
    filteredRows.forEach((row) => {
      const amount = parseInt(row[3]);
      if (!isNaN(amount)) {
        sum += amount;
      }
    });

    console.log(`# Total expenses for month ${month || "all"}: $${sum}`);
  });
}
