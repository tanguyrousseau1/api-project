//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const {insertNews, getNews} = require('./database/news');
const {insertUser, getUser} = require('./database/user');

const app = express();


//enabling modules on express app
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

//enpoint
app.get('/', (req, res) => {
    res.send("this is the root endpoint")
});
app.get('/news', async (req,res) => {
    res.send(await getNews());
});
app.get('/user', async (req,res) => {
    res.send(await getUser());
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

