const { getOrderByIdFromFirestore, postOrderToFirestore } = require("../services/firebase");

const postOrder = async (req, res) => {
    try {
        const order = req.body;
        const { message, orderId } = await postOrderToFirestore(order);
        res.status(201).json({ message, orderId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await getOrderByIdFromFirestore(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { postOrder, getOrderById };