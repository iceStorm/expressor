import express from "express"
import * as dotenv from "dotenv"
import path from "path"

console.log(path.resolve(__dirname, "../env/.env"))

// LOADING ENVIRONMENT VARIABLES FROM .env FILES
dotenv.config({
    debug: process.env.NODE_ENV === "development",
    path: __dirname + "../env/.env",
})

// START SERVER AND BEGIN LISTENING
const app = express()
const PORT = process.env.PORT || 7502
app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
    console.log(process.env)
})

// LISTENING ON ROUTES
app.route("/").get((req, res, next) => {
    res.status(200).send({ [process.env.APP_NAME ?? "NodeJS Server"]: "ok" })
})
