const express = require('express');
const app = express();
const { connections } = require('mongoose');

const ProductRouter = express.Router();//Note the case and the brackets on router as javascript is case sensitive...
const DataWarehouse = require('../models/DataSchema');
app.use(express.static(__dirname+'/public'));
function getDate() {
    let date = new Date()
    return date.toLocaleString();
  }


ProductRouter.get('/', async (req, res)=>{
    try{
        let Products = await DataWarehouse.find();
        res.render('Home', {Products} )
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})
ProductRouter.post('/', async (req, res)=>{
    try{
        let Products = await DataWarehouse.find();
        res.render('Home', {Products} )
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})
ProductRouter.post('/add', async (req, res)=>{
    const productName = req.body.productName;
    const productPhase = req.body.productPhase; 

    const incomingProduct = new DataWarehouse({
        ProductName: productName,
        ProductPhase: productPhase,
        Date: getDate()
    })
    try{
        await incomingProduct.save();
        res.status(201).redirect('/Products')
    }catch (error) {
        res.status(500).send({message: error.message})
    }
})

ProductRouter.post('/view/id', async (req, res)=>{
    try{
        let Product = await DataWarehouse.findById(req.body.ProductID);
        if(!Product){
            res.status(404).send({message: 'Product does not exist here'})
        }
        else{
            let Products = [Product];
            res.status(201).render('Home', {Products} )
        }
        
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})
ProductRouter.post('/update', async (req, res)=>{//requires user id and also the form
    const ProductID = req.body.ProductID;
    const productName = req.body.productName;
    const productPhase = req.body.productPhase;  
    try{
        await DataWarehouse.findOneAndUpdate(
            {_id: ProductID},
            {
                ProductName: productName,
                ProductPhase: productPhase,
                Date: getDate()
            },
            {new: true}, 
            (error, Product)=>{
            if(error){
                res.status(404).json({message: error.message});
            }
            else{
                let Products = [Product];
                res.status(201).render('Home', {Products} )
            }
        })
    }catch (error){
        res.status(500).json({message: error.message})
    }
    
     
})
ProductRouter.post('/delete', async (req, res)=>{
    const ProductID = req.body.ProductID;
    console.log(req.route);
    res.redirect('/');
    try{
        await DataWarehouse.findOneAndDelete(
            {_id: ProductID},
            {new: false}, 
            (error, Product)=>{
            if(error){
                res.status(404).json({message: error.message});
            }
            else{
                let Products = [Product];
                res.status(201).render('Home', {Products} )
            }
        })
    }catch (error){
        res.status(500).json({message: error.message})
    }
    
     
})
module.exports = ProductRouter;