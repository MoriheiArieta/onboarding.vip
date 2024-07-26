// models/User.js

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    magicLinkToken: {
      type: String,
      default: null,
    },
    magicLinkExpires: {
      type: Date,
      default: null,
    },
  },
  { strictQuery: false }
);

export const User = mongoose.model("User", userSchema);
