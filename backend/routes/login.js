// routes/login.js

import express from "express";
import validator from "validator";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const { email } = request.body;

    if (!email || !validator.isEmail(email)) {
      return response.status(400).send({ message: "Invalid email provided" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    request.session.userId = user._id;

    return response
      .status(200)
      .send({ message: "User successfully logged in" });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Could not log out, please try again" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).send({ message: "Logout successful" });
  });
});

export default router;
