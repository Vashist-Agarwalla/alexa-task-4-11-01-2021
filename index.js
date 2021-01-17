const express = require('express');
const mongodb = require('mongodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new mongodb.MongoClient(process.env.MONGO, {
    useUnifiedTopology: true
});

let collection;

const testFunction = async () => {
    try {
        await client.connect();
        console.log("Mongo connected");
        collection = client.db().collection("Vashist");
    } catch (error) {
        console.error(error);
        process.exit(-1);
    }
};

app.post('/', async (req, res) => {
    let incomingData = req.body;
    await collection.insertOne(incomingData);
    res.send("Data Sent");
})

app.put('/', async (req, res) => {
    let incomingData = req.body;
    let data = await collection.findOne({ name: incomingData.name });
    data.age = incomingData.age;
    await collection.replaceOne({ name: incomingData.name }, data)
    res.send("Update and written");
})

app.delete('/', async (req, res) => {
    let incomingData = req.body;
    await collection.deleteOne({ name: incomingData.name });
    res.send('DELETE and written');
})

app.get('/', async (req, res) => {
    // let fileBuffer = fs.readFileSync('random.json', { encoding: "utf-8" });
    let data = await collection.find({}).toArray();
    res.json(data);
})

testFunction().then(() => {
    app.listen(8080, () => {
        console.log('LISTENING ON PORT 8080!')
    })
})