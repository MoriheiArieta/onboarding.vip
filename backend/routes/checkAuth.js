import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  console.log("Session:", req.session); // For debugging
  if (req.session && req.session.userId) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

export default router;
