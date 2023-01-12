//dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

//array to work as temporary db
const news = [
    {
        title: 'News article 1',
        content: 'Content for the first news article',
        date: new Date("2022-01-11")
    }
]

const user = [
    {
        username: "Naty",
        email: "Naty@gmail.com",
        birthday: new Date("2022-09-21"),
        description: "Owner and Developper"
    }
]

//enabling modules on express app
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

//enpoint
app.get('/', (req, res) => {
    res.send("this is the root endpoint")
});
app.get('/news', (req,res) => {
    res.send(news);
});
app.get('/user', (req,res) => {
    res.send(user);
});

//starting server
app.listen(3001, () => {
    console.log('listening on port 3001');
});