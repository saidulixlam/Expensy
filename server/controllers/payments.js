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
    
    const { order_id, payment_id } = req.body;
    const userId = req.user.id;

    try {
        const updatedOrder = await Order.findOne({
            where: {
                orderId: order_id,
                status: 'PENDING'
            }
        });

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found or already processed.' });
        }

        updatedOrder.status = 'SUCCESS';
        updatedOrder.paymentId = payment_id;
        await updatedOrder.save();

        // Update the user to mark them as premium
        const updatedUser = await User.findByPk(userId);
        console.log(updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        updatedUser.premium = true;
        await updatedUser.save();

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

