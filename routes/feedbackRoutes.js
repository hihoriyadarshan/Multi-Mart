import express from "express";
import {
  createFeedback,
  get_all_feedback,
} from "../controllers/FeedbackContoller.js";

//router object
const router = express.Router();

//create feedback
router.post("/feedbacks", createFeedback);

router.get("/getAllfeedback", get_all_feedback);

export default router;
