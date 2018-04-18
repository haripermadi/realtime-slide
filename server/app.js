const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)


io.on('connection', function (socket) {
  console.log('a user connect', socket.id)
  socket.on('disconnect', function(){
    console.log('user disconnected', socket.id);
  });
  socket.emit('welcome', 'haloo')
  socket.on('send message',(payload)=>{
    console.log("payload==",payload)
    let input ={
      message: payload,
      id: 'Mr. '+socket.id
    }
    io.emit('send message', input);
  })
  socket.on('slideprev', function () {
    socket.broadcast.emit('slideprev')
  })
  socket.on('slidenext', function () {
    socket.broadcast.emit('slidenext')
  })
})


http.listen(3000, function () {
  console.log('running on 3000')
})