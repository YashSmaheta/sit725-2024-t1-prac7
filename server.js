const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
const dbName = 'yashFormDb';
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
// app.get('/', 'index.html');
let db;

async function connectdb(){
    try{
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log("DB Connected!!");
    }
    catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500),send('Something went wrong!!!');
});

app.post('/submit', async(req,res)=> {

    const client = new MongoClient(url);
    try{
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('formData');

        const result = await collection.insertOne(req.body);

        res.status(201).json({ message: 'Form Data Saved Success!!!!!', result});
    }
    catch(err){
        console.error('Error occured !!! :(', err);
        res.status(500).json({error: 'Internal Server error'});
    }
    finally{
        client.close();
    }
});


connectdb().then(() => {
    app.listen(port, () => { console.log(`Example app listening on port ${port}!`)
    });
});




