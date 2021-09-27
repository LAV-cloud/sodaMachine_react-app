const mongoose = require('mongoose');
const Soda = mongoose.model('Soda');

const createSoda = (req, res) => {
  const { id, name, price, count } = req.body;
  const image = req.file ? req.file.filename : '';

  Soda.create({ id, image, name, price, count })
    .then((createdSoda) => res.json(createdSoda))
    .catch((err) => res.status(500).json(err));
};

const getSodas = (req, res) => {
  Soda.find()
    .exec()
    .then((sodas) => res.json(sodas))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  getSodas,
  createSoda,
};
