import express from "express";

const router = express.Router();

router.get("/", (request, response) => {
  request.session.visited = true;
  return response.send("onboarding.vip");
});

export default router;
