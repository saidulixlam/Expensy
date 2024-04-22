const { where } = require("sequelize");
const Expense = require("../models/expense");
exports.createExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { amount, description, category } = req.body;
    const expense = await Expense.create({ amount, description, category, userId });

    return res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const id = req.user.id;
    const expenses = await Expense.findAll({ where: { userId: id } });

    return res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {

  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const deletedExpense = await Expense.destroy({ where: { id,userId } });

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
