const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Create or update order data
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    let email = req.body.email;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("Order data:", data);
    console.log("Email:", email);

    try {
        let existingOrder = await Order.findOne({ email: email });

        if (!existingOrder) {
            await Order.create({
                email: email,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate(
                { email: email },
                { $push: { order_data: data } }
            );
        }

        res.json({ success: true });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })

    } catch (error) {

        res.send("server error", error.message)
    }

})

module.exports = router;
