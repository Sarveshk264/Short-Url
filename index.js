const express = require("express");
const urlRoute = require("./routes/url.js")
const {connectToMongoDB} = require("./connect.js")
const URL = require("./models/url.js");
const router = require("./routes/url.js");

const app = express();

const PORT = 8001;

app.use(express.json());

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => console.log("MongoDB connected"));

app.use("/url", router);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId: shortId
    },{
        $push:{
            visitHistory: {
                timestamp : Date.now()
            }
        }
    });
    res.redirect(entry.redirectedUrl);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});