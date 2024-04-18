const express=require('express');

const userController= require('../controllers/expense');

const router=express.Router();

router.post('/',userController.postExpense);

router.get('/',userController.getExpenses);


router.delete("/:id", userController.deleteExpense);

module.exports=router;