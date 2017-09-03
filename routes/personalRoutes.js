const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
  app.put('/api/updateUserInfo', (req, res) => {
    User.update({
      avatar: req.body.avatar,
    });
  });
};