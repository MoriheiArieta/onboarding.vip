import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const { token } = request.query;

    if (!token) {
      return response.status(400).send({ message: "Invalid token" });
    }

    const user = await User.findOne({
      magicLink: token,
      magicLinkExpired: false,
    });

    if (!user) {
      return response.status(400).send({ message: "Invalid or expired token" });
    }

    user.magicLinkExpired = true;
    await user.save();

    request.session.userId = user._id;
    request.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return response.status(500).send({ message: "Error creating session" });
      }
      response.send(
        "<h1>Verification successful. You can close this tab now.</h1>"
      );
    });
  } catch (error) {
    console.error("Verification error:", error);
    response.status(500).send({ message: error.message });
  }
});

export default router;
