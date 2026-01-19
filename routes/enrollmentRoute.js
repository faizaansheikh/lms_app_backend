const express = require("express");
const EnrollmentController = require("../controllers/enrollment");
const { verifyJWT } = require("../middlewares/authenticate");


const router = express.Router();

router.get("/", verifyJWT,EnrollmentController.getAll); //get
router.get("/:id", verifyJWT,EnrollmentController.getById); //single get

router.delete("/:id", verifyJWT,EnrollmentController.delete); //delete

router.post("/update", verifyJWT,EnrollmentController.update); //update 
router.post("/", verifyJWT,EnrollmentController.create); //create

router.get("/courses/:id", verifyJWT,EnrollmentController.getEnrolledCourses); // get enrolled courses by id
router.post("/search", verifyJWT,EnrollmentController.getFilters);

module.exports = router;
