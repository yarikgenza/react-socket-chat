"use strict"
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var port = 8080;
app.use('/', express.static(path.join(__dirname)))

let usersCount = 0;

io.on('connection', function(socket){
  let added = false;

  socket.on('addUser', function(user) {
    added = true;
    usersCount++;
    socket.username = user.username;
    socket.broadcast.emit('userJoined', {
      username: socket.username,
      count: usersCount
    })
    console.log(`Connected ${socket.username}, there are ${usersCount} users`);
  })


  socket.on('typing', function(){
    socket.broadcast.emit('listenTyping', {username: socket.username})
  })


  socket.on('messageSend', function(data){
    socket.broadcast.emit('messageGet', {
       text: data.text,
       username: socket.username,
       color: data.color
     });
  })

  socket.on('disconnect', function() {
    if(added) {
      usersCount--;
      socket.broadcast.emit('userOut', {
        username: socket.username,
        count: usersCount
      })
      console.log(`disconnected ${socket.username} there are ${usersCount} users`);
    } else {
      console.log(`disconnected there are ${usersCount} users`);
    }
  })

});

http.listen(port, function(){
  console.log(`listening on ${port}...`);
});
