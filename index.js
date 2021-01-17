const express = require('express');
const mongodb = require('mongodb');

const app = express();

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

startprg();

function startprg() {
    console.log("\n\n1. Add Address");
    console.log("2. Delete Address");
    console.log("3. View Address");
    console.log("4. Exit");

    r1.question("Enter your choice: ", (Option) => {
        switch (parseInt(Option)) {
            case 1:
                addad();
                break;
            case 2:
                delad();
                break;
            case 3:
                viewad();
                break;
            case 4:
                console.log("Bye");
                exit(0);
            default:
                console.log("Wrong Option!")
                startprg();
        }
    })
}

var obj = {
    name: "NULL",
    address: "NULL"
};

function addad() {
    // console.log("Adding");
    let dataBuffer = fs.readFileSync("data.json");
    let data = JSON.parse(dataBuffer);
    r1.question("Enter the Address: ", (Add) => {
        r1.question("Enter the name with to which this Address will be saved: ", (Name) => {
            obj.name = Name;
            obj.address = Add;
            data.push(obj);
            let jsonString = JSON.stringify(data);
            fs.writeFileSync("data.json", jsonString);
            startprg();
        });
    });

}

function delad() {
    // console.log("DELETING");
    let dataBuffer = fs.readFileSync("data.json");
    let data = JSON.parse(dataBuffer);
    let final = [];
    r1.question("Enter the name whose address would you like to delete: ", (Name) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name !== Name) {
                final.push(data[i]);
            }
        }
        let jsonString = JSON.stringify(final);
        fs.writeFileSync("data.json", jsonString);
        startprg();
    })
}

function viewad() {
    // console.log("View");
    let dataBuffer = fs.readFileSync("data.json");
    console.table(JSON.parse(dataBuffer.toString()))
    startprg();
}

testFunction().then(() => {
    app.listen(8080, () => {
        console.log('LISTENING ON PORT 8080!')
    })
})