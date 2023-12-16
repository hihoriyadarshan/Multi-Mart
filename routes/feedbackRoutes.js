import express from "express";
import {
  FeedbackCountController,
  createFeedback,
  get_all_feedback,
} from "../controllers/FeedbackContoller.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

//create feedback
router.post("/feedbacks", createFeedback);

//admin get feedback
router.get("/getAllfeedback", requireSignIn, isAdmin, get_all_feedback);

//feedback count
router.get("/feedback-count", requireSignIn, isAdmin, FeedbackCountController);

export default router;
