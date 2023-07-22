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

  res.json({ data:shortUrl });
});

routes.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await UrlModel.findOneAndUpdate(
      { shortUrl },
      { $inc: { count: 1 } }
    );
    console.log('originalUrl',url.originalUrl)
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
routes.get("/counts/day", async (req, res) => {
  try {
    const data = await UrlModel.find();
    console.log(data);
    const counts = {};

    data.map((item) => {
      const createdAtDate = new Date(item.createdAt).toISOString().slice(0, 10);
      if (counts[createdAtDate]) {
        counts[createdAtDate]++;
      } else {
        counts[createdAtDate] = 1;
      }
    });

    const countsArray = Object.keys(counts).map((date) => ({
      date: date,
      count: counts[date],
    }));

    res.json(countsArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = routes;
