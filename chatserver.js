const express = require('express');
const http = require('http')
const socketio = require('socket.io')



const app = express()
const server = http.createServer(app)
const io = socketio(server)

idtoname = {}

io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('login', (data) => {
    
    idtoname[socket.id] = data.username;

    socket.join(data.username)

    socket.emit('logged-in', {success: 'true'})
  })

  socket.on('send_message', (data) => {

  


    if(idtoname[socket.id]) {
      if(data.message.charAt(0) === '@'){
        let username = data.message.split(' ')[0].substring(1)
        let msgArray = data.message.split(' ')
        msgArray.splice(0,1);
        io.in(username).emit('receive_message', {
          message: msgArray.join(' '),
          username: idtoname[socket.id],
          
        })
      }else {
        io.emit('receive_message', {
          message: data.message,
          username: idtoname[socket.id],
          
        })
      }
    }
  })


})

app.use( express.static(__dirname + '/public'));

server.listen(2222, () => {
  console.log("Server started at port 2222")
})
