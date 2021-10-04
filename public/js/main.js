const socket = io();
const form = document.getElementById('chat-form')
socket.on('msg',msg => {
    console.log(msg)
})
form.addEventListener('submit',e => {
    e.preventDefault();
    const sentMsg = e.target.elements.msg.value
    socket.emit('chat-msg',sentMsg)
} )