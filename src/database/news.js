const {getDatabase} = require('./mongo');

const collectionName = 'news';

async function insertNews(news) {
    const database = await getDatabase();
    const{insertedId} = await database.collection(collectionName).insertOne(news);
    return insertedId;
}

async function getNews() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

module.exports = {
    insertNews,
    getNews,
}