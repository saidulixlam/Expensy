const User = require("../models/user");

// exports.getExpenses = async (req, res, next) => {
//   try {
//     const expenses = await Expense.findAll();
//     res.json(expenses);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error });
//   }
// };

exports.createUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      // Checking  if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists. Please login instead." });
      }
      // Create the user if not already exists
      const newUser = await User.create({ name, email, password });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

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