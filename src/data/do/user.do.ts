import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { baseSchema } from "./base.do";
export type UserDO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  socketId?: string;
};

export const userSchema = new mongoose.Schema<UserDO>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  socketId: { type: String, required: false, default: "" },
});

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password);
  }
  next();
});

userSchema.add(baseSchema);
export const userModelName = "User";

export const UserModel = mongoose.model(userModelName, userSchema);
