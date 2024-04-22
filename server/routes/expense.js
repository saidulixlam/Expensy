const express = require('express');

const expenseController = require("../controllers/expense");
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/expense', auth.authenticate, expenseController.createExpense);
router.get('/expense', auth.authenticate, expenseController.getExpenses);
router.delete('/expense/:id', expenseController.deleteExpense);

module.exports = router;