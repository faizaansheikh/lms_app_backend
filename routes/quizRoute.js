const express = require("express");
const QuizController = require("../controllers/quiz");
const { verifyJWT } = require("../middlewares/authenticate");


const router = express.Router();

router.get("/", verifyJWT, QuizController.getAll); //get
router.get("/:id", verifyJWT, QuizController.getById); //single get

router.delete("/:id", verifyJWT, QuizController.delete); //delete

router.put("/:id", verifyJWT, QuizController.update); //update 
router.post("/", verifyJWT, QuizController.create); //create

router.get("/final_exam/:id", verifyJWT, QuizController.getFinalExamQuiz); //get

router.post("/search", verifyJWT, QuizController.getFilters);

module.exports = router;