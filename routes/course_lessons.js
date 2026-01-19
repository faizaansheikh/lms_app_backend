const express = require("express");

const Course_LessonsController = require("../controllers/course_lessons");
const { verifyJWT } = require("../middlewares/authenticate");


const router = express.Router();


router.get("/:id", verifyJWT,Course_LessonsController.getById); //single get

router.delete("/:id", verifyJWT,Course_LessonsController.delete); //delete

router.put("/:id", verifyJWT,Course_LessonsController.update); //update 


router.get("/", verifyJWT,Course_LessonsController.getAll); //get
router.post("/", verifyJWT,Course_LessonsController.create); //create

router.post("/search", verifyJWT,Course_LessonsController.getFilters);

module.exports = router;