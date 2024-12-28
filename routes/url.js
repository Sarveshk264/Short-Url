const express = require("express");
const {handleGenrateNewShortUrl} = require("../controllers/url");
const {handleGetAnalytics} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenrateNewShortUrl);

router.get("/analytics/:shortId", handleGetAnalytics);


module.exports= router;

