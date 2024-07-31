import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import login from "./routes/login.js";
import session from "express-session";
import logout from "./routes/logout.js";
import checkAuth from "./routes/checkAuth.js";
import home from "./routes/home.js";
import verifyMagicLink from "./routes/verifyMagicLink.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

app.use(express.json());
app.use;

// specific ports
app.use(
  cors({
    origin: "http://localhost:5000", //change this to proper origin
    credentials: true,
  })
);

const __filename = fileURLToPath(import.meta.url); //get resolved path to file
const __dirname = path.dirname(__filename); // get name of the directory

app.use(express.static(path.join(__dirname, "../frontend/dist"))); // use like normal __dirname
// all ports
// app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 60000 * 60, // 1 hour
      sameSite: "lax",
    },
  })
);

// ROUTES
app.use("/", home);
app.use("/login", login);
app.use("/verify", verifyMagicLink);
app.use("/logout", logout);
app.use("/check-auth", checkAuth);

// serve static files

// Catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Database connected.");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
