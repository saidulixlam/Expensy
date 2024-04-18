// const Expense = require("../models/expense");

// exports.getExpenses = async (req, res, next) => {
//   try {
//     const expenses = await Expense.findAll();
//     res.json(expenses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error });
//   }
// };

// exports.postExpense = async (req, res, next) => {
//   try {
//     const { name, description, price } = req.body;
//     const expense = await Expense.create({ name, description, price });
//     res.status(201).json(expense);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// exports.deleteExpense = async (req, res, next) => {
//   const id = req.params.id;
//   try {
//     const expense = await Expense.findByPk(id);
//     if (!expense) {
//       res.status(404).json({ error: "Expense not found" });
//     } else {
//       await expense.destroy();
//       res.status(204).end();
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };