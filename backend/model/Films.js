const { Schema, model } = require('mongoose');

const schema = new Schema({
  part: { type: Number },
  films: { type: Array },
});

module.exports = model('Films', schema);
