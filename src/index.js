//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertNews, getNews, deleteNews, updateNews} = require('./database/news');
const {insertUser, getUser, deleteUser, updateUser} = require('./database/user');

const app = express();


//enabling modules on express app
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

//endpoints
//post
app.post('/news', async (req,res) => {
    const newNews = req.body;
    await insertNews(newNews);
    res.send({ message: 'New news inserted.' });
});
app.post('/user', async(req,res) => {
    const newUser = req.body;
    await insertUser(newUser);
    res.send({ message: "New user inserted." });
});

//get
app.get('/', (req, res) => {
    res.send("this is the root endpoint")
});
app.get('/news', async (req,res) => {
    res.send(await getNews());
});
app.get('/user', async (req,res) => {
    res.send(await getUser());
});

//delete
app.delete('/news:id', async (req,res) => {
    await deleteNews(req.params.id);
    res.send({ message: "News removed." });
});
app.delete('/user:id', async (req,res) => {
    await deleteUser(req.params.id);
    res.send({ message: "User removed." });
});

//update
app.put('/news:id', async (req,res) => {
    const updatedNews = req.body;
    await updateNews(req.params.id, updatedNews);
    res.send({ message: "News updated." });
});
app.put('/user:id', async (req,res) => {
    const updatedUser = req.body;
    await updateUser(req.params.id, updatedUser);
    res.send({ message: "User updated." });
});

//start in-memory mongoDB instance
startDatabase().then(async () => {
    await insertNews({
        title: 'News article 1',
        content: 'Content for the first news article',
        date: new Date("2022-01-11")
    });
    await insertUser({
        username: "Naty",
        email: "Naty@gmail.com",
        birthday: new Date("2022-09-21"),
        description: "Owner and Developper"
    })

    //starting server
    app.listen(3001, () => {
        console.log('listening on port 3001');
    });
})

