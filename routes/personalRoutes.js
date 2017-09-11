const mongoose = require('mongoose');
const User = mongoose.model('users');
const testImgur = require('../services/testImgur');

module.exports = app => {
  app.put('/api/updateUserInfo', (req, res) => {
    testImgur(req.body.avatar).then(data => {
      const avatarSrc = data.data.data.link;
      User.update({ _id: req.body.accountId }, { avatar: avatarSrc })
      .then(async () => {
        const datas = await User.find({ _id: req.body.accountId });
        res.send(datas[0]);        
      })
      .catch(err => {
        res.send('發表文章錯誤');
        res.status(413).send(err);
      });
    });
  });
};