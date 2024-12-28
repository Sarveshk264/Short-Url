const express = require("express");
const URL = require("../models/url.js");

const router = express.Router();

// Render Home Page with All URLs
router.get("/", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home.ejs", { urls: allUrls });
});

module.exports = router;
