const express = require("express");
const CourseController = require("../controllers/course");
const { verifyJWT } = require("../middlewares/authenticate");
// const UserController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", CourseController.getAll); //get
router.get("/:id",CourseController.getById); //single get

router.delete("/:id", verifyJWT,CourseController.delete); //delete

router.put("/:id", verifyJWT,CourseController.update); //update 
router.post("/", verifyJWT,CourseController.create); //create

router.post("/lessons", verifyJWT,CourseController.getLessons); // get lessons

router.get("/details/:id",CourseController.getCourseFullDetail); // get details



router.post("/search", verifyJWT,CourseController.getFilters);
module.exports = router;
