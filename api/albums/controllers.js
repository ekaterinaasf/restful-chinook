const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM albums`;

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
    console.log(id);
    let sql = `SELECT * FROM albums WHERE AlbumId=${id}`;
    console.log(sql);
    db.all(sql, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        console.log(err.message);
        return;
      }
      console.log(row);
      res.json(row);
    });
  },
  create: (req, res) => {
    //this.lastID or This.data.lastID will give you last inserted ID
    // const id = this.lastId + 1; //AlbumId
    // console.log(this.lastId);
    const title = req.body.title; //Title
    const artist = Number(req.body.artist); //ArtistId
    let lastId;
    // 'max(artistId)' doesn't work correctly
    db.get(`SELECT count(artistId) AS res FROM albums`, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        console.log(err.message);
        return;
      }
      lastId = row.res;
      console.log(row);
      let sql = `INSERT INTO albums(AlbumId, Title, ArtistId) VALUES(${
        lastId + 1
      }, "${title}", ${artist})`;
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
    const value = req.body.value; //{"value": "title_for_update"}
    let sql = `UPDATE albums SET Title='${value}' WHERE AlbumId=${id}`;
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
    let sql = `DELETE FROM albums WHERE AlbumId=${id}`;
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
