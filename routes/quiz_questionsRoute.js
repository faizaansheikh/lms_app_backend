const express = require("express");
const Quiz_QuestionsController = require("../controllers/quiz_questions");
const { verifyJWT } = require("../middlewares/authenticate");



const router = express.Router();

router.get("/", verifyJWT,Quiz_QuestionsController.getAll); //get
router.get("/:id", verifyJWT,Quiz_QuestionsController.getById); //single get

router.delete("/:id", verifyJWT,Quiz_QuestionsController.delete); //delete

router.put("/:id", verifyJWT,Quiz_QuestionsController.update); //update 
router.post("/", verifyJWT,Quiz_QuestionsController.create); //create
router.post("/search", verifyJWT,Quiz_QuestionsController.getFilters); 
module.exports = router;