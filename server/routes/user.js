const express=require('express');

const userController = require("../controllers/user");

const router=express.Router();

router.post('/signup',userController.createUser);
router.post('/login',userController.getUser);
router.post('/forget-password',userController.forgetPassword);
router.post('/reset-password/:token',userController.resetPassword);

module.exports=router;