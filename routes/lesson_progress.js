const express = require("express");
const Lesson_progressController = require("../controllers/lesson_progress");
const { verifyJWT } = require("../middlewares/authenticate");



const router = express.Router();

router.get("/", verifyJWT,Lesson_progressController.getAll); //get
router.get("/:id", verifyJWT,Lesson_progressController.getById); //single get

router.delete("/:id", verifyJWT,Lesson_progressController.delete); //delete

router.put("/:id", verifyJWT,Lesson_progressController.update); //update 
router.post("/", verifyJWT,Lesson_progressController.create); //create
router.post("/search", verifyJWT,Lesson_progressController.getFilters);


module.exports = router;
