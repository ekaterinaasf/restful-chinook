const controllers = require("./controllers.js");
const express = require("express");

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:id", controllers.getOne);

router.post("/", controllers.create); //body

router.put("/:id", controllers.update);

router.delete("/:id", controllers.delete);

module.exports = router;
