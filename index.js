const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const axios = require('axios');

require('./models/User');
require('./models/Survey');
require('./models/Post');
require('./services/passport');
require('./services/fbpassport');

mongoose.connect(keys.mongoURL);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/articleRoutes')(app);
require('./routes/personalRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  socket.on('message', body => {
    socket.broadcast.emit('message', {
      body,
      from: socket.id.slice(8)
    })
  });

  socket.on('postArticle', (data) => {
    // const res = await axios.get('/api/getArticles');
    // console.log('res: ', res);
    getApiAndEmit(socket);
    // setInterval(
    // () => getApiAndEmit(socket),
    // 10000
    // );
    // socket.broadcast.emit('updateArticle', data);
    // socket.emit('updateArticle', data);
  })
})
const getApiAndEmit = async socket => {
  try {
    const res = await axios.get(
      "http://localhost:5000/api/getArticles"
    ); // Getting the data from DarkSky
    socket.broadcast.emit("updateArticle", res.data);
    socket.emit("updateArticle", res.data); // Emitting a new message. It will be consumed by the client
  } catch (error) {
    console.error(`Error: ${error.code}`);
  }
};
const PORT = process.env.PORT || 5000;
server.listen(PORT);
