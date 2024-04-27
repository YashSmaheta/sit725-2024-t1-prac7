const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'yashFormDb';

let db;

async function connectdb() {
    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log("DB Connected!!");
    } catch (err) {
        console.err('Error connecting to Database:', err);
    }
}

async function insertData(formData) {
    try {
        const collection = db.collection('formData');
        const result = await collection.insertOne(formData);
        return result;
    } catch (err) {
        console.error('Error while inserting data:', err);
        throw err;
    }
}

module.exports = { connectdb, insertData };
