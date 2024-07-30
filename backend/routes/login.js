import express from "express";
import validator from "validator";
import { User } from "../models/User.js";
import { v4 as uuidv4 } from "uuid"; //random uuid generator
import sendMagicLink from "../controllers/mailer.js";

const router = express.Router();


router.post("/", async (request, response) => {
  try {
    const { email } = request.body;

    if (!email || !validator.isEmail(email)) {
      return response.status(400).send({ message: "Invalid email provided" });
    }

    let user = await User.findOne({ email: email });

    if (!user) {
      user = await User.create({ email });
    }

    const magicLink = uuidv4();
    user.magicLink = magicLink;
    user.magicLinkExpired = false;
    await user.save();

    await sendMagicLink(email, magicLink);

    response
      .status(200)
      .send({ message: "Magic link sent to your email.", userId: user._id });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
