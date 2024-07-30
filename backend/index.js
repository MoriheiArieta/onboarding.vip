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

dotenv.config();
const app = express();

app.use(express.json());

// specific ports
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
