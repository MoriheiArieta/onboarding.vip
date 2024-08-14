import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Define a mongoose schema for your chart data
const ChartDataSchema = new mongoose.Schema({
  id: Number,
  year: Number,
  userGain: Number,
  userLost: Number,
});

// Create a model from the schema
const ChartData = mongoose.model("ChartData", ChartDataSchema);

router.get("/chartData", async (req, res) => {
  try {
    const data = await ChartData.find({});
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

export default router;
