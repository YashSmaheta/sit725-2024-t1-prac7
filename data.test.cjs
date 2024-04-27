// const { expect } = require('chai');
const assert = require('assert');
const { MongoClient } = require('mongodb');
const { connectdb, insertData } = require('./data');

const url = 'mongodb://localhost:27017';
const dbName = 'yashFormDb';

describe('Model Tests', () => {
    let db;

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    before(async () => {
        await client.connect();
        db = client.db(dbName);
        console.log("DB Connected!!");
    });

    after(async () => {
        // await db.dropDatabase();
        await client.close();
    });

    describe('insertData()', () => {
        it('should insert form data into the database', async () => {
            const formData = { first_name: 'Yash', last_name: 'Maheta', mobile_no: '0123456789', email: 'yash123@deakin.com' };
            const result = await insertData(formData);
            assert.equal(result.acknowledged, true);
        });
    });
});
