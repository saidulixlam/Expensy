const Razorpay = require('razorpay');
const Order = require("../models/order");

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
