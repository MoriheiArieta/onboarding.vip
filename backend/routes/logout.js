import express from "express";


const router = express.Router();
//logout
router.post("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Could not log out, please try again" });
    }
    res.clearCookie("connect.sid"); // clear the session cookie
    return res.status(200).send({ message: "Logout successful" });
  });
});

export default router;
