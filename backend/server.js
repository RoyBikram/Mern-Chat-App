const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data');
const connectDB = require('./config/db');

const app = express();
dotenv.config()
connectDB()
app.get('/', (req, res) => {
    res.send('Api is running');
});
app.get('/api/chat', (req, res) => {
    res.send(chats);
});

app.get("/api/chat/:id",(req,res)=>{
    let singleChat = null;
     singleChat=chats.find((c)=>c._id === req.params.id);
     console.log(singleChat)
    res.send(singleChat);
   });


   const PORT = process.env.PORT || 5000;


app.listen(PORT, console.log(`Backend Start At ${PORT}`));
