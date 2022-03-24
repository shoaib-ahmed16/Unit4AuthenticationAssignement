
const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const Product = require("../models/product.model")

router.post("", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.get("", async (req, res) => {
    try{
        const product = await Product.find()
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

router.patch("/:id", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})

        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

router.delete("/:id", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const product = await Product.findByIdAndDelete(req.params.id)

        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

module.exports = router;