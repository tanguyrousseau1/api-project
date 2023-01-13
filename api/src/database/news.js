const {getDatabase} = require('./mongo');
const {ObjectId} = require('mongodb');

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

async function deleteNews(id) {
    const database = await getDatabase();
    await database.collection(collectionName).deleteOne({
        _id: new ObjectId(id)
    });
}

async function updateNews(id, news) {
    const database = await getDatabase();
    delete news._id;
    await database.collection(collectionName).update(
        { _id: new ObjectId(id)},
        {
            $set: {
                ...news
            }
        }
    );
}

module.exports = {
    insertNews,
    getNews,
    deleteNews,
    updateNews
}