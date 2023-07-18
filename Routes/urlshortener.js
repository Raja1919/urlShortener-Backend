const express = require("express");
const UrlModel = require("../model/urlshortener");
const routes = express.Router();
const shortid=require("shortid")


routes.get("/all", async (req, res) => {
    const data = await UrlModel.find();
    if (!data) {
      return res.status(404).json({ message: "not found" });
    }
    res.status(200).json(data);
  });


  routes.post('/create', async (req, res) => {
    const { originalUrl } = req.body;
  
    // Check if the URL is already shortened
    const existingUrl = await UrlModel.findOne({ originalUrl });
    if (existingUrl) {
      return res.json({ shortUrl: existingUrl.shortUrl }); 
    }
  
    // Generate a new short URL
    const shortUrl = shortid.generate();
  
    // Create a new URL document
    const newUrl = new UrlModel({
      originalUrl,
      shortUrl
    });
  
    // Save the URL document
    await newUrl.save();
  
    res.json({ shortUrl });
  });
  
  // Define the API endpoint for redirecting to the original URL
  routes.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
  
    // Find the URL document with the given short URL
    const url = await UrlModel.findOneAndUpdate({ shortUrl },{$inc:{count:1}});
    if (!url) {
      res.status(404).json({ error: 'URL not found' });
      return;
    }
  
    res.redirect(url.originalUrl);
  });

  


module.exports = routes;