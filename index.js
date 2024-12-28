const express = require("express");
const { connectToMongoDB } = require("./connect.js");
const path = require("path");
const router = require("./routes/url.js");
const staticRoute = require("./routes/staticRouter.js");

const app = express();
const PORT = 8001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
    console.log("MongoDB connected")
);

// Template Engine Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Routes
app.use("/url", router);
app.use("/", staticRoute);

// Redirect Logic for Short URL
app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );
        if (!entry) return res.status(404).send("Short URL not found");
        res.redirect(entry.redirectedUrl);
    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Server Listener
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
