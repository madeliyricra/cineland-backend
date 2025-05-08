const { getPremieresFromFirestore } = require("../services/firebase");

const getPremieres = async (req, res) => {
  try {
    const result = await getPremieresFromFirestore();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPremieres };