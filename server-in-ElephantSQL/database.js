import pg from "pg"
import * as dotenv from 'dotenv'
dotenv.config()

let db;

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD } = process.env

function connectToDB() {
  return new Promise(function (resolve, reject) {
    try {
      db = new pg.Pool({
        host: PGHOST,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD,
      })

      db.connect((err, client, release) => {
        if (err) {
          reject(err)
        }
        client.query('SELECT NOW()', (err, result) => {
          release()
          if (err) {
            reject(err)
          }
          console.log(result)
          resolve()
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}

export { connectToDB, db }