import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import login from "./routes/login.js";
import session from "express-session";
import logout from "./routes/logout.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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

app.get("/", (request, response) => {
  request.session.visited = true;
  return response.send("onboarding.vip");
});

app.use("/login", login);
app.use("/logout", logout);

// Add a route to check authentication status
app.get("/check-auth", (req, res) => {
  if (req.session.userId) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
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
