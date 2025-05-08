const { getCandiesFromFirestore } = require("../services/firebase");

const getCandies = async (req, res) => {
  try {
    const result = await getCandiesFromFirestore();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCandies };