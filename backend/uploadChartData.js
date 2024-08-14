// run this script once to upload data to db

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MongoDB URL:", process.env.MONGODB_URL); // Log the URL (make sure to remove this in production)

const ChartDataSchema = new mongoose.Schema({
  id: Number,
  year: Number,
  userGain: Number,
  userLost: Number,
});

const ChartData = mongoose.model("ChartData", ChartDataSchema);

const data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
  // ... (rest of your data)
];

async function uploadData() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");

    console.log("Clearing existing data...");
    const deleteResult = await ChartData.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing documents`);

    console.log("Inserting new data...");
    const insertResult = await ChartData.insertMany(data);
    console.log(`Inserted ${insertResult.length} documents`);

    console.log("Verifying inserted data...");
    const count = await ChartData.countDocuments();
    console.log(`Total documents in collection: ${count}`);

    const firstDoc = await ChartData.findOne({});
    console.log("Sample document:", firstDoc);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

uploadData();
