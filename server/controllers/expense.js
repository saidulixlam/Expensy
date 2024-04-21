const Expense = require("../models/expense");

exports.createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    
    const expense = await Expense.create({ amount, description, category });

    return res.status(201).json(expense);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    return res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  console.log("I am here to runnnnnn");
  try {
      const { id } = req.params; // Corrected
      console.log(id);
      const deletedExpense = await Expense.destroy({ where: { id } });

      if (!deletedExpense) {
          return res.status(404).json({ message: 'Expense not found' });
      }

      return res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
      console.error('Error deleting expense:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
};



