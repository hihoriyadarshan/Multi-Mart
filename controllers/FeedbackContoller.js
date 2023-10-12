import FeedbackModel from "../models/FeedbakModel.js";

//create feedback
export const createFeedback = async (req, res) => {
  try {
    const { firstname, subject, email, message } = req.body;

    const newContact = new FeedbackModel({
      firstname,
      subject,
      email,
      message,
    });

    await newContact.save();

    res
      .status(201)
      .json({ success: true, message: "your Feedback send successfully " });
  } catch (error) {
    console.error("Error creating Feedback:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create Feedback" });
  }
};

//get All feedback(Admin)

export const get_all_feedback = async (req, res) => {
  try {
    const contacts = await FeedbackModel.find({});

    res.status(200).json({
      success: true,
      message: "All Feedback details",
      contacts,
    });
  } catch (error) {
    console.error("Error retrieving feedback data:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error while retrieving feedback details",
    });
  }
};
