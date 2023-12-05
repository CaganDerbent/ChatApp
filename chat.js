

const socket = io('http://localhost:3000')




const { connectedUsers } = require('./app');
      

const sender = document.getElementById('sender')
const username = document.getElementById('username')
const message = document.getElementById('message')
const submit = document.getElementById('submit')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')
const id = document.getElementById('socketID')
const roomID = document.getElementById('roomID')
const userlist = document.getElementById('userlist')
const listwrap = document.getElementById('listwrap')

const roomInput = document.getElementById('room')
const joinButton = document.getElementById('join')




joinButton.addEventListener("click",()=>{
    const room =  roomInput.value
    if (room === ''){
        console.log("room value empty")
    }
    else{
        socket.emit('join-room',room)
        roomID.innerHTML = 'Room: '+room

    }

})

userlist.addEventListener("click",()=>{
  
})




submit.addEventListener('click',()=>{
    const room = roomInput.value
    const messagevalue = message.value
    const usernamevalue = username.value
    if(messagevalue === '' || usernamevalue === ''){
        console.log("message value empty")
        
    }
    else{
        socket.emit('chat',messagevalue,usernamevalue,room)

        username.disabled = true;
        message.value = ''

    }
})

message.addEventListener('keydown',event =>{
    const room = roomInput.value
    const messagevalue = message.value
    const usernamevalue = username.value
    if(messagevalue === '' || usernamevalue === ''){
        console.log("message value empty")
        
    }
    else{
        if(event.keyCode === 13){
        event.preventDefault()
        socket.emit('chat',messagevalue,usernamevalue,room)
       
    
    username.disabled = true;
    message.value = ''
    }

    }
    
})


socket.on('connectionID',(connectionID,array)=>{ //kendine
    date = new Date()
    console.log(date)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if(minutes === 0  || (minutes === 1 ) || (minutes === 2) || (minutes === 3)|| (minutes === 4) || (minutes === 5) || (minutes ===6) || (minutes === 7)|| (minutes === 8) || (minutes === 9) ){
        minutes = "0"+minutes
    }
    console.log(hours +" "+ minutes)
    id.innerHTML = "ID: "+connectionID
    output.innerHTML += '<p>' + connectionID + "  " + 'connected.' + '<span>' + hours + ":" + minutes  + '</span>' + '</p>'
    connectedUsers.push(connectionID);
    updateConnectedUserList();
})

socket.on('userConnected', (userId,array) => { // kendi hariç herkese

    date = new Date()
    console.log(date)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if(minutes === 0  || (minutes === 1 ) || (minutes === 2) || (minutes === 3)|| (minutes === 4) || (minutes === 5) || (minutes ===6) || (minutes === 7)|| (minutes === 8) || (minutes === 9) ){
        minutes = "0"+minutes
    }
    output.innerHTML += '<p>' + userId + "  " + 'connected.' + '<span>' + hours + ":" + minutes  + '</span>' + '</p>'
    connectedUsers.push(userId);
    updateConnectedUserList();
  
});

socket.on('userDisconnected', (userId) => {

    date = new Date()
    console.log(date)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if(minutes === 0  || (minutes === 1 ) || (minutes === 2) || (minutes === 3)|| (minutes === 4) || (minutes === 5) || (minutes ===6) || (minutes === 7)|| (minutes === 8) || (minutes === 9) ){
        minutes = "0"+minutes
    }
    console.log(`User disconnected: ${userId}`);
    output.innerHTML += '<p>' + userId + "  " + 'disconnected.' + '<span>' + hours + ":" + minutes  + '</span>' + '</p>';
    
});


socket.on('chat',(usernamevalue,messagevalue) =>{
    date = new Date()
    console.log(date)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if(minutes === 0  || (minutes === 1 ) || (minutes === 2) || (minutes === 3)|| (minutes === 4) || (minutes === 5) || (minutes ===6) || (minutes === 7)|| (minutes === 8) || (minutes === 9) ){
        minutes = "0"+minutes
    }
    console.log(hours +" "+ minutes)
    output.innerHTML += '<p><strong>' + messagevalue  + ':   </strong>  ' + "     " + usernamevalue + '<span>' + hours + ":" + minutes  + '</span>' + '</p>'
})

