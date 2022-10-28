import express from "express"
import { db } from "../database.js"
import continentdata from "../data/continents.json" assert {type: 'json'};

import format from 'pg-format';

// const postArrow = async (reqx, resx, ifields) => {
//   try {
//     const entry = await db.query(`INSERT INTO continents 
//     (continent, overviewoverviewoverviewoverviewoverviewoverview, image1, image2, latitude, longitude)
//     VALUES ($1, $2, $3, $4, $5, $6);`, ifields, (error, results) => {
//       if (error) { resx.send(error) }
//       // resx.json(results.rows)
//       // resx.send(`New row added`)
//       resx.json(entry)
//     })
//     // return resx.json(entry)
//   } catch (error) {
//     return resx.json({ error: error.message })
//   }
// }
// // console.log(continentdata)

const subRouter = express.Router()

subRouter
  .route("/")
  .get((req, res) => {
    db.query('SELECT * FROM continents ORDER BY id ASC', (error, results) => {
      if (error) { res.send(error) }
      res.json(results.rows)
    })
  })
  .post((req, res) => {
    const bigval = [];
    continentdata.forEach((item) => {
      // item.images.map(i => imgarr.push(i.url))
      const fields = [item.name, item.overview, item.images[0].url, item.images[1].url, item.map.lat, item.map.lon];
      bigval.push(fields)
    })
    console.log(bigval)

    db.query(
      format(
        `INSERT INTO continents (continent, overviewoverviewoverviewoverviewoverviewoverview, image1, image2, latitude, longitude) VALUES %L;`, bigval
      ), [], (err, result) => { console.log(err) }
    ).then(
      data => res.status(201).json()
    ).catch(
      e => res.sendStatus(404)
    );


    // db.query(`INSERT INTO continents (continent, overviewoverviewoverviewoverviewoverviewoverview, image1, image2, latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6);`, bigval).then(
    //   data => res.json(data)
    // ).catch(
    //   e => res.sendStatus(404)
    // )
  })

subRouter
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params
    db.query('SELECT * FROM continents WHERE id=$1 ORDER BY id ASC', [id],
      (error, results) => {
        if (error) { res.send(error) }
        res.json(results.rows)
      })
  })
  .put((req, res) => {
    const { first_name, last_name, age } = req.body
    const { id } = req.params
    db.query('UPDATE continents SET first_name=$2, last_name=$3, age=$4 WHERE id=$1', [id, first_name, last_name, age],
      (error, results) => {
        if (error) { res.send(error) }
        res.json(results.rows)
      })

  })
  .delete((req, res) => {
    const { id } = req.params
    db.query('DELETE FROM continents WHERE id=$1', [id],
      (error, results) => {
        if (error) { res.send(error) }
        res.json(results.rows)
      })
  })

export default subRouter;