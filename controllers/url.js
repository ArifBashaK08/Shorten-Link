const URL = require("../models/url")

const timeStamp = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const options = { timeZone: 'Asia/Kolkata' };
    const ISTTime = date.toLocaleString('en-IN', options);
    return ISTTime
}

const generateShortURLHandler = async (req, res) => {
    const body = req.body
    if (!body.url) return res.status(400).json({ error: "URL required!" })

    const { nanoid } = await import('nanoid');
    const shortID = nanoid(8)

    await URL.create({
        shortID: shortID,
        redirectedURL: body.url,
        history: [],
        createdBy: req.user._id,
    })
    return res.redirect("/")
}

const redirectHandler = async (req, res) => {
    const shortID = req.params.shortID
    const entry = await URL.findOneAndUpdate({
        shortID
    }, {
        $push: {
            history: { timeStamp: timeStamp() }
        }
    }, { new: true })
    res.redirect(entry.redirectedURL)
}

const getAnalyticsHandler = async (req, res) => {
    const shortID = req.params.shortID
    try {
        const result = await URL.findOne({ shortID })
        if (!result) return res.status(404).json({ msg: "Data not found" })
        res.json({ totalClicks: result.history.length, analytics: result.history })
    }
    catch (err) {
        console.error("Inernal Error: ", err)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { generateShortURLHandler, redirectHandler, getAnalyticsHandler }