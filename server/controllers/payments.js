const Razorpay = require('razorpay');
const Order = require("../models/order");
const User = require('../models/user');

exports.purchasePremium = async (req, res) => {
    
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            
            throw new Error('Razorpay API keys are missing or invalid');
        }
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        // Define amount for premium subscription
        const amount = 100; // Amount in paisa (₹25.00)

        // Create an order with Razorpay
        rzp.orders.create({ amount, currency: 'INR' }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }

            // Create order in database
            const newOrder = await Order.create({ orderId: order.id, status: 'PENDING', userId: req.user.id });

            // Respond with order details and Razorpay key ID
            return res.status(201).json({ order, key_id: rzp.key_id });
        });
    } catch (error) {
        console.error('Error purchasing premium:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.premiumStatus = async (req, res) => {
    // Log the request body
    console.log(req.body);

    // Extract order_id, payment_id, and user_id from the request body
    const { order_id, payment_id, user_id } = req.body;

    try {
        // Update the order to mark it as paid
        const updatedOrder = await Order.findOneAndUpdate(
            { _id: order_id, status: 'pending' },
            { $set: { status: 'success', paymentId: payment_id } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found or already processed.' });
        }

        // Update the user to mark them as premium
        const updatedUser = await User.findOneAndUpdate(
            { _id: user_id },
            { $set: { premium: true } },
            { new: true }
        );

        res.status(200).json({
            message: 'Payment completed successfully.',
            order: updatedOrder,
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating order status or user premium status:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

