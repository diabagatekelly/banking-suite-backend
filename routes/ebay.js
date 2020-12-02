const express = require('express')
const Ebay = require('../models/Ebay')
const axios = require('axios')

const router = new express.Router();

router.get('/login', (req, res) => {
  Ebay.openEbayAuthWindow();
})

router.get('/consented', async (req, res) => {

    try {
        let token = await Ebay.getUserAccessToken(req.query.code);
        res.json(token);
        }
     catch(e) {
        console.log(e)
    }  
    
})

module.exports = router;