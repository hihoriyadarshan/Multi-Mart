import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

{
  timestamps: true;
}
const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);

export default FeedbackModel;
