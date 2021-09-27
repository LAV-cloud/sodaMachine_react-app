const mongoose = require('mongoose');

const SodaSchema = new mongoose.Schema({
  id: Number,
  image: String,
  name: String,
  price: Number,
  count: Number,
});
mongoose.model('Soda', SodaSchema);
