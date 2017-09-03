const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  credits: { type: Number, default: 0 },
  avatar: String
});

mongoose.model('users', userSchema);
