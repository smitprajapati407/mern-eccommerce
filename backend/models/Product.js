const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }, {timestamps: true});

module.exports = mongoose.model('Product', categorySchema);