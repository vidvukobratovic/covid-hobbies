// index.js

/**
 * Required External Modules
 */
const { hobbies } = require("./hobbies.json")
const express = require("express");
const path = require("path");
const storage = require('node-persist')

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "3000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

app.get("/", async (req, res) => {
    try {
        const visits = await incrementVisitCount()
        res.render("index", { title: "CONQUER COVID", visits});
    }
    catch (e) {
        console.error(e)
    }
  });

app.get("/hobbies", async (req, res) => {
    try {
        const visits = await incrementVisitCount()
        res.json({hobbies, visits})
    }
    catch (e) {
        console.error(e)
    }
})

const incrementVisitCount = async () => {
    await storage.init()
    const storageKeys = await storage.keys()

    let visitCount = 0
    if (storageKeys.includes("visits"))
        visitCount = await storage.getItem("visits")
    visitCount++
    await storage.setItem("visits", visitCount)

    return visitCount
}

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });