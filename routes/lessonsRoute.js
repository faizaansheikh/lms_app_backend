const express = require("express");
const LessonsController = require("../controllers/lessons");

const router = express.Router();

router.get("/", LessonsController.getAll); //get
router.get("/:id", LessonsController.getById); //single get

router.delete("/:id", LessonsController.delete); //delete

router.put("/:id", LessonsController.update); //update 
router.post("/", LessonsController.create); //create


module.exports = router;
