const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM tracks`;

    db.all(sql, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      res.json(rows);
    });
  },
  getOne: (req, res) => {
    const id = Number(req.params.id);
    let sql = `SELECT * FROM tracks WHERE TrackId=${id}`;
    db.all(sql, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        console.log(err.message);
        return;
      }
      res.json(row);
    });
  },
  create: (req, res) => {
    // read row data from body
    // {
    //   "name": "JavaScript is singing",
    //     "composer": "Alexandre Ivanovich",
    //       "album": 5,
    //         "media": 12,
    //           "genre": 14
    // }
    const name = req.body.name; //Name
    const album = Number(req.body.album); //AlbumId
    const media = Number(req.body.media); //MediaTypeId
    const genre = Number(req.body.genre); //GenreId
    const composer = req.body.composer; //Composer
    const mlsec = Number(req.body.mlsec); //Milliseconds
    const price = Number(req.body.price); //UnitPrice
    db.get(`SELECT max(TrackId) AS res FROM tracks`, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        console.log(err.message);
        return;
      }
      console.log(row);
      let sql = `INSERT INTO tracks(TrackId, Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, UnitPrice) VALUES(${
        row.res + 1
      }, "${name}", ${album}, ${media}, ${genre}, '${composer}', ${mlsec}, ${price})`;
      console.log(sql);
      db.run(sql, (err, row) => {
        if (err) {
          res.status(400).json({ error: err.message });
          console.log(err.message);
          return;
        }
        res.json(row);
      });
    });
  },
  update: (req, res) => {
    // read row data from body
    const id = req.params.id;
    const value = req.body.value; //{"value": "name_for_update"}
    let sql = `UPDATE tracks SET Name='${value}' WHERE TrackId=${id}`;
    db.run(sql, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  },
  delete: (req, res) => {
    const id = req.params.id;
    let sql = `DELETE FROM tracks WHERE TrackId=${id}`;
    db.run(sql, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  },
};

module.exports = controllers;
