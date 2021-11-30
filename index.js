const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require("socket.io")
const formatMsg = require('./utils/moments')
const {userjoin,getuser,userleft,getroom} = require('./utils/user')


const app = express()
const port = 3000

app.use(express.static(path.join(__dirname,'public')))

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
const io = socketio(server)
const botname = "ChatBox"
 // connection
io.on('connection',socket => {
 
  console.log("connected")
  socket.on('user',({username,room})=>{
    console.log(room)
    const user=userjoin(socket.id,username,room)
    socket.join(user.room)
  // server to client msg emit - msg => name of the message to be send
  socket.emit('msg',formatMsg(botname,'Welcome!'))
  socket.broadcast.to(user.room).emit('msg',formatMsg(botname,`${user.username}joined the chat`));
  io.to(user.room).emit('roomuser',{
    room:user.room,
    users:getroom(user.room)
  })
  })
 // getting the msg from client
  socket.on('chat-msg',sentMsg =>{
    const user=getuser(socket.id)
    // send msg to client
    io.to(user.room).emit('msg',formatMsg(user.username,sentMsg));
    

  })
  socket.on('disconnect',()=>{
    const user=userleft(socket.id)
    console.log(user)
    if (user)
    {
      io.to(user.room).emit('msg',formatMsg(botname,`${user.username}left the chat`))
  
    }
    })
})





