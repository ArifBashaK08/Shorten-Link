import { URL } from "../models/url.js";
import { nanoid } from "nanoid";

const timeStamp = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const options = { timeZone: 'Asia/Kolkata' };
    const ISTTime = date.toLocaleString('en-IN', options);
    return ISTTime
}

export const getAllURLs = async (req, res) => {
    try {
        if(!req.user) return res.status(409).redirect("/signin")

    const allURLs = await URL.find({createdBy: req.user._id})
        if (!allURLs) return res.status(404).send(`<h2>Data not found</h2>`)

        return res.status(200).render("index", {urls : allURLs})

    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).send(`<h1>Something went wrong..!</h1>`)
    }
}

export const generateShortURL = async (req, res) => {
    const {url} = req.body
    try {
        if (!url) return res.status(400).json({ error: "URL required..!" })

        const shortID = nanoid(8)

        await URL.create({
            shortID: shortID,
            redirectedURL: url,
            history: [],
            createdBy: req.user._id,
        })
        return res.status(200).redirect("/")
        // return res.status(200).render("index", {id : shortID})
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).send(`<h1>Something went wrong..!</h1>`)
    }
}

export const redirectToURL = async (req, res) => {
    const shortID = req.params.shortID
    try {
        const link = await URL.findOneAndUpdate({ shortID }, {
            $push: {
                history: [{ timeStamp: timeStamp() }],
            }
        })
        res.status(200).redirect(link.redirectedURL)
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).send(`<h1>Something went wrong..!</h1>`)
    }
}

export const getURLAnalytics = async (req, res) => {
    const shortID = req.params.shortID
    try {
        const result = await URL.findOne({shortID})
        if(!result) return res.status(404).json({msg: "Data not found"})
            return res.status(200).json({totalClicks: result.history.length, history: result.history})
    } catch (error) {
        console.log("Error: ", error.message)
        res.status(500).send(`<h1>Something went wrong..!</h1>`)
    }
}