const mongoose = require('mongoose');
const Post = mongoose.model('post');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get('/api/getArticles', async (req, res) => {
    const datas = await Post.find();
    res.send(datas);
  })
  app.post('/api/postArticle', requireLogin, async (req, res) => {
    const { content, title } = req.body;
		const post = new Post({
			// posterAccount: req.body.account,
			// posterName: req.body.name,
			title,
		  content,
		  // PostDate: new Date()
		});
    try {
      await post.save();
      res.send({ content, title });
    } catch (err) {
      res.send('發表文章錯誤');
      res.status(500).send(err);
    }
  })
}