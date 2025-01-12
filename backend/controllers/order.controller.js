import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
    const {
        name,
        address,
        date,
        phoneNo,
        customerId,
        pantLength,
        waist,
        pantHips,
        forkLength,
        thighs,
        calf,
        bottom,
        pantType,
        shirtLength,
        chest,
        abs,
        shirtHips,
        sleevelength,
        arms,
        shoulder,
        collar,
        shirtType,
        deliveryDate, 
        balance,
        advanceAmount,
        totalAmount
    } = req.body;

    try {
        const newOrder = await Order.create({
            name,
            date,
            address,
            phoneNo,
            customerId,
            pant:{
                measurements:[{
                    length:pantLength,
                    waist,
                    hips:pantHips,
                    forkLength,
                    thighs,
                    calf,
                    bottom
                }],
                type:pantType
            },
            shirt:{
                measurements:[{
                    length:shirtLength,
                    chest,
                    abs,
                    hips:shirtHips, 
                    sleevelength,
                    arms,
                    shoulder,
                    collar
                }],
                type:shirtType
            },
            deliveryDate, 
            balance, 
            advanceAmount,
            totalAmount 
        });

        if (newOrder) {
            res.status(201).json({ message: "Order created!!", newOrder });
        }

    } catch (error) {
        console.log("Error in createOrder controller!!!", error.message);
        res.status(500).json({ message: "Server error!!!", error: error.message });
    }
}


export const getOrder = async (req, res) => {
    const { orderId } = req.query; 

    if (!orderId) {
        return res.status(400).json({ message: "Order ID is required." });
    }

    try {
        const order = await Order.findOne({ customerId: orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        res.json(order);
    } catch (error) {
        console.error("Error in getOrder controller:", error.message);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};