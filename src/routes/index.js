const express = require("express");
const { getPremieres } = require("../controllers/premieres");
const { getCandies } = require("../controllers/candies");
const { postOrder, getOrderById } = require("../controllers/order");

const router = express.Router();

router.get("/premieres", getPremieres);
router.get("/candies", getCandies);
router.post('/complete', postOrder)
router.get("/orders/:id", getOrderById);

module.exports = router;