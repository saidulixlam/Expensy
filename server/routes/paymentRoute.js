const express = require('express');

const paymentController = require("../controllers/payments");
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/premium', auth.authenticate, paymentController.purchasePremium);
// router.post('/status', auth.authenticate, paymentController.purchaseStatus);

module.exports = router;