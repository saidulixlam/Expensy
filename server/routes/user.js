const express=require('express');

const userController = require("../controllers/user");

const router=express.Router();

router.post('/signup',userController.createUser);

// router.get('/',userController.getExpenses);


// router.delete("/:id", userController.deleteExpense);

module.exports=router;