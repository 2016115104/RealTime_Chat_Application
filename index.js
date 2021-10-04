const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require("socket.io")

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname,'public')))

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const io = socketio(server)

 // connection
io.on('connection',socket => {
 
  console.log("connected")

  // server to client msg emit - msg => name of the message to be send
  socket.emit('msg','Welcome!')

  
  socket.broadcast.emit('msg','User joined the chat');


  socket.on('disconnect',()=>{
    io.emit('msg','User left the chat')
  })


  // getting the msg from client
  socket.on('chat-msg',sentMsg =>{

    // send msg to client
    io.emit('msg',sentMsg);
  })

})





