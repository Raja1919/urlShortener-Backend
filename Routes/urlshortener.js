const express = require("express");
const UrlModel = require("../model/urlshortener");
const routes = express.Router();
const shortid = require("shortid");

routes.get("/all", async (req, res) => {
  const data = await UrlModel.find();
  if (!data) {
    return res.status(404).json({ message: "not found" });
  }
  res.status(200).json(data);
});

routes.post("/create", async (req, res) => {
  const { originalUrl } = req.body;

  const existingUrl = await UrlModel.findOne({ originalUrl });
  if (existingUrl) {
    return res.json({ shortUrl: existingUrl.shortUrl });
  }

  const shortUrl = shortid.generate();

  const newUrl = new UrlModel({
    originalUrl,
    shortUrl,
  });

  await newUrl.save();

  res.json({ shortUrl });
});

routes.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await UrlModel.findOneAndUpdate(
      { shortUrl },
      { $inc: { count: 1 } }
    );
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = routes;
