const socket = io();
const form = document.getElementById('chat-form')

// getting the msg from server
socket.on('msg',msg => {
    console.log(msg)
})



form.addEventListener('submit',e => {
    e.preventDefault();
    const sentMsg = e.target.elements.msg.value
    // emitting typed msg from client to server
    socket.emit('chat-msg',sentMsg)
} )