require('dotenv').config();
//dont forget to update description

const express = require('express');
const mongoose = require('mongoose');

const routesPlayers = require('./Routes/DataHandlerScout')
const app = express();
const port = process.env.PORT || 1887;
//please dont hack the DB, no important information there
const dbname = "mongodb+srv://admin:admin123@cluster0.6leuj.mongodb.net/ProductsDB?retryWrites=true&w=majority";

const DataWarehouse = require('./models/DataSchema');

app.use(express.static(__dirname+'/public'));
//ejs allows us to inject stuff directly into html
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended:true }));
app.use(express.json())

//database initial connection
mongoose.connect(dbname,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const selectedDB = mongoose.connection;
selectedDB.on('error', ()=>{
    console.log("Sorry there was an error connecting to the players database database");
})
selectedDB.once('open', ()=>{
    console.log('connected to the Products database, Break a leg!');
})

app.get('/', async (req,res) => {
    try{
        let Products = await DataWarehouse.find();
        res.render('Home', {Products} )
    }catch (error) {
        res.status(500).json({message: error.message})
    }
       
    
})
app.get('/Dashboard', async (req,res) => {
    try{
        let Products = await DataWarehouse.find();
        res.render('BlackDash', {Products} )
    }catch (error) {
        res.status(500).json({message: error.message})
    }
       
    
})
app.use('/Products', routesPlayers)

app.listen(port,() => {
    console.log(`Listening on port ${port}`);
})