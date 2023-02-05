const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config();
const mongoose = require("mongoose");
const { Server } = require('socket.io')
const http = require('http')

const router = require('./routes/userRoutes')
const messageRouter = require('./routes/messageRoutes')
const ConversationRouter = require('./routes/conversationRoute')
const app = express();
app.use(express.json());

app.use(cookieSession({ name: "session", keys: ["xxxxx"], maxAge: 24 * 60 * 60 * 100 }))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true
}));

const server = app.listen(5000, () => {
  console.log('Server Started on port 5000');
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE"
  }
});

//socket

io.on("connection",(socket)=>{
  console.log(`User connected ${socket.id}`)
  socket.on('joinRoom',(data)=>{
    socket.join(data);
  })
  socket.on('send message',(message)=>{
    io.to(message.conversationId.toString()).emit('new message', message)
  });
  socket.on('deleteMessage',(messageArr)=>{
    io.to(messageArr[0].conversationId.toString()).emit('updated arr', messageArr);
  })
  socket.on('disconnect',()=>{
    console.log('A user disconnected');
  })
})

//routers
app.use("/api/user", router);
app.use("/api/message",messageRouter);
app.use("/api/conversation",ConversationRouter);

//mongo
mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGO_PASSWORD}@cluster0.6ihaclf.mongodb.net/?retryWrites=true&w=majority`
).then(() =>
  console.log('Mongo Connected and Server running at port 5000')
).catch((err) => console.log(err))