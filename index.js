const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require("socket.io")
const app = express()
const port = 3000
app.use(express.static(path.join(__dirname,'public')))
const server = http.createServer(app)
const io = socketio(server)
io.on('connection',socket => {
  console.log("connected")
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

