const db = require("../db-connection");

const controllers = {
  getAll: (req, res) => {
    const sql = `SELECT * FROM playlists`;

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
    let sql = `SELECT * FROM playlists WHERE PlaylistId=${id}`;
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
    const name = req.body.name; //Name
    db.get(`SELECT max(PlaylistId) AS res FROM playlists`, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        console.log(err.message);
        return;
      }
      console.log(row);
      let sql = `INSERT INTO playlists(PlaylistId, Name) VALUES(${
        row.res + 1
      }, "${name}")`;
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
    let sql = `UPDATE playlists SET Name='${value}' WHERE PlaylistId=${id}`;
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
    let sql = `DELETE FROM playlists WHERE PlaylistId=${id}`;
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
