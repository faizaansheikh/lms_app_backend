const express = require("express");

const { verifyJWT } = require("../middlewares/authenticate");
const course_desc = require("../controllers/course_desc");
// const UserController = require("../controllers/user.controller");

const router = express.Router();

router.get("/", course_desc.getAll); //get
router.get("/:id",course_desc.getById); //single get

router.delete("/:id", verifyJWT,course_desc.delete); //delete

router.put("/:id", verifyJWT,course_desc.update); //update 
router.post("/", verifyJWT,course_desc.create); //create


router.post("/search", verifyJWT,course_desc.getFilters);
module.exports = router;
