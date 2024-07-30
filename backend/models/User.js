import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    magicLink: {
      type: String,
      default: uuidv4(),
      required: false,
      unique: false,
    },
    magicLinkExpired: {
      type: Boolean,
      default: false,
    },
  },
  { strictQuery: false }
);

export const User = mongoose.model("User", userSchema);
