const express = require("express");
const LessonsController = require("../controllers/lessons");
const { verifyJWT } = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", verifyJWT,LessonsController.getAll); //get
router.get("/:id", verifyJWT,LessonsController.getById); //single get

router.delete("/:id", verifyJWT,LessonsController.delete); //delete

router.put("/:id", verifyJWT,LessonsController.update); //update 
router.post("/", verifyJWT,LessonsController.create); //create

router.post("/search", verifyJWT,LessonsController.getFilters); 
module.exports = router;
