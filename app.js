const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');


const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(3001, ()=> console.log("Server Running..."))






const io = require("socket.io")(3000,{
  cors:{

  }
})

io.on('connection',(socket,connectedUsers)=>{
  const id = socket.id
  console.log(id)

  socket.emit('connectionID',socket.id,connectedUsers) // emit info gönderme
  //io.sockets


  socket.broadcast.emit('userConnected',socket.id);


  socket.on('chat', (usernamevalue, messagevalue, room)=>{
    console.log("iddd: "+id)
      if (room === '') {
        console.log("broadcast room: " + room);
        socket.broadcast.emit('chat', usernamevalue, messagevalue ,id,room);
        socket.emit('chat', usernamevalue, messagevalue,id);
      }
      else {
        console.log("room: " + room,id);
        socket.to(room).emit('chat', usernamevalue, messagevalue,id,room);
        socket.emit('chat', usernamevalue, messagevalue,id);

      }
    })

  socket.on('join-room',(room,userID) => {
    socket.room = room;
    socket.emit('join-room',room,userID)
    socket.join(room,userID);
    console.log("Joined: "+room + " ID: "+socket.id)
  
  
  
  

  
});
 



      
    
  



  socket.on('disconnect', () => {
    // Diğer kullanıcılara bağlantı kesilen kullanıcının socket.id'sini gönderelim
    socket.broadcast.emit('userDisconnected', socket.id);
  });
})





  


    
    
    
  

  









const dbURL = 'mongodb+srv://cagan:cagan123@cluster0.6gmh81j.mongodb.net/';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("MongoDB Connected");
    
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });




app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





app.get("/",(req, res) => {
  res.render("index");
  

  })

app.get("/register", (req, res) => {
  res.render("register");
});

app.use((req, res) => {
  res.status(404).render("404");
})




