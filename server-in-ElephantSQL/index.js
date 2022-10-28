import express from "express"
import continentRouter from "./continents/routes.js"
import countryRouter from "./countries/routes.js"
import { connectToDB } from "./database.js"
import cors from "cors"

const PORT = process.env.PORT || 5432
const api = express()

connectToDB()
  .then(() => {
    api.use(express.json())

    api.use(cors())

    api.use("/continents", continentRouter)
    api.use("/countries", countryRouter)

    api.listen(PORT, () => console.log(`succesfully running at http://localhost:${PORT}`))
  })
  .catch(error => console.log("ERROR!! failed to connect to database. Turning off." + error))

