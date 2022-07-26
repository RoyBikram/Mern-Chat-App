const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data/data');
const connectDB = require('./config/db');
const userRouters = require('./routes/userRoutes');
const pathNotFoundRouters = require('./routes/pathNotFoundRouters');

const app = express();
dotenv.config();
connectDB();

app.use(express.json())
app.get('/', (req, res) => {
    res.send('Api is running');
});
app.get('/chats', (req, res) => {
    res.send('Api is running');
});

app.use('/api/user', userRouters)
app.use(pathNotFoundRouters)
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Backend Start At ${PORT}`));
