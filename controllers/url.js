const shortid = require('shortid');
const URL = require("../models/url.js");


async function handleGenrateNewShortUrl(req, res){
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({
            success: false,
            message: "url is required"
        });
    }
    const shortId = shortid.generate();
    await URL.create({
        shortId: shortId,
        redirectedUrl: body.url,
        visitHistory: []
    });

    return res.json({shortId: shortId});
}

async function handleGetAnalytics(req, res) {
    try {
        const { shortId } = req.params;
        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (err) {
        console.error("Error fetching analytics:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    handleGenrateNewShortUrl,
    handleGetAnalytics,
}