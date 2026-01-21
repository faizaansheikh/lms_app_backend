const express = require("express");
const { verifyJWT } = require("../middlewares/authenticate");
const ReviewController = require("../controllers/review");


const router = express.Router();

router.get("/", verifyJWT, ReviewController.getAll); //get
router.get("/:id", verifyJWT, ReviewController.getById); //single get

router.delete("/:id", verifyJWT, ReviewController.delete); //delete

router.put("/:id", verifyJWT, ReviewController.update); //update 
router.post("/", verifyJWT, ReviewController.create); //create


router.post("/search", verifyJWT, ReviewController.getFilters);

module.exports = router;