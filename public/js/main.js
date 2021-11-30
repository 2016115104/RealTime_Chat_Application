const socket = io();
const form = document.getElementById('chat-form')
const roomname = document.getElementById('room-name')
const usersList = document.getElementById('users')
const chatMsg =  document.querySelector('.chat-messages')
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true});
socket.emit('user',{username,room})

// getting the msg from server
socket.on('msg',msg => {
    console.log(msg)
    writeHtml(msg)
    chatMsg.scrollTop=chatMsg.scrollHeight;
})
socket.on('roomuser',({room,users})=>{
outputroom(room)
outputusers(users)}
)
function outputroom(room)
{
 roomname.innerText=room
}
function outputusers(users)
{
    console.log(users)
    usersList.innerHTML=`${users.map(user=>`<li>${user.username}<\li>`).join('')}`
}



form.addEventListener('submit',e => {
    e.preventDefault();
    const sentMsg = e.target.elements.msg.value
    // emitting typed msg from client to server
    socket.emit('chat-msg',sentMsg)
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();

} )
function writeHtml(msg){
    const div = document.createElement('div')
    div.classList.add('messages')
    div.innerHTML=`<p class="time">${msg.username}<span>${msg.time}</span></p>
    <p class="text">${msg.text}</p>`
    document.querySelector('.chat-messages').appendChild(div)
    
}