require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const bodyParser = require('body-parser');

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@cluster0.ad4ql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
const db = mongoose.connection;

const Schema = mongoose.Schema;

const Prodotti = new Schema({
    nome: String,
    descrizione: String,
    quantità: Number
});


const modelloProdotto = mongoose.model('Prodotto', Prodotti);

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const port = process.env.PORT || 5003

app.get("/home", (req, res) => {
    modelloProdotto.find({}, (err, data) => {
        if (err) {console.error(err);}
        else {
            res.json(data)
        }
    });
})

app.post("/add", (req, res) => {
     const nuovoProdotto = new modelloProdotto({ 
         nome: req.body.nome,
         descrizione: req.body.descrizione,
         quantità: req.body.quantità,
     });
     nuovoProdotto.save();

})

app.delete("/delete/:id", (req, res) => {
    console.log("ID: " + req.params.id)
    modelloProdotto.findOneAndDelete({_id: req.params.id}).then(() => {res.redirect("/")})
})


 app.listen(port, function () {
     console.log(`Listening on port ${port}`)
 })