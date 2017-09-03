const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
	posterAccount: String,
	posterName: String,
	title: String,
  content: String,
  PostDate: Date
});

mongoose.model('post', postSchema);
