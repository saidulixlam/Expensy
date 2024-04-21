const express=require('express');

const expenseController = require("../controllers/expense");

const router=express.Router();

router.post('/expense',expenseController.createExpense);
router.get('/expense',expenseController.getExpenses);
router.delete('/expense/:id',expenseController.deleteExpense);

module.exports=router;