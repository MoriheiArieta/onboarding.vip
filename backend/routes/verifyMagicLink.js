import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { token } = request.query;

    if (!token) {
      return response.status(400).send("Invalid token");
    }

    const user = await User.findOne({
      magicLink: token,
      magicLinkExpired: false,
    });

    if (!user) {
      return response.status(400).send("Invalid or expired token");
    }

    user.magicLinkExpired = true;
    await user.save();

    request.session.userId = user._id;
    request.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return response.status(500).send("Error creating session");
      }

      // Redirect to the dashboard
      response.redirect("http://localhost:5173/dashboard");
    });
  } catch (error) {
    console.error("Verification error:", error);
    response.status(500).send("An error occurred");
  }
});

export default router;
