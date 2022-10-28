import express from "express"
import { db } from "../database.js"
import countrydata from "../data/countries.json" assert {type: 'json'};

import format from 'pg-format';


const subRouter = express.Router()

subRouter
  .route("/")
  .get((req, res) => {
    db.query('SELECT * FROM countries ORDER BY id ASC', (error, results) => {
      if (error) { res.send(error) }
      res.json(results.rows)
    })
  })
  .post((req, res) => {
    const cntnts = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']
    const bigval = [];
    countrydata.forEach(item => {
      // const imgarr = []
      // item.images.map(i => imgarr.push(i.url))
      const fields = [item.name, item.overview, item.images[0].url, item.images[1].url, item.images[2].url, cntnts[item.id - 1], item.location.lat, item.location.lon];
      bigval.push(fields);
    })
    db.query(
      format(
        `INSERT INTO countries (country, overviewoverviewoverviewoverviewoverviewoverview, image1, image2, image3, continent, latitude, longitude) VALUES %L;`, bigval
      ), [], (err, result) => { console.log(err) }
    ).then(
      data => res.status(201).json()
    ).catch(
      e => res.sendStatus(404)
    );
  })

subRouter
  .route("/:id")
  .get((req, res) => {
    const { id } = req.params
    db.query('SELECT * FROM countries WHERE id=$1 ORDER BY id ASC', [id],
      (error, results) => {
        if (error) { res.send(error) }
        res.json(results.rows)
      })
  })
  .put((req, res) => {
    const { first_name, last_name, age } = req.body
    const { id } = req.params
    db.query('UPDATE countries SET first_name=$2, last_name=$3, age=$4 WHERE id=$1', [id, first_name, last_name, age],
      (error, results) => {
        if (error) { res.send(error) }
        res.json(results.rows)
      })

  })
  .delete((req, res) => {
    const { id } = req.params
    db.query('DELETE FROM countries WHERE id=$1', [id],
      (error, results) => {
        if (error) { res.send(error) }
        res.json(results.rows)
      })
  })

export default subRouter;