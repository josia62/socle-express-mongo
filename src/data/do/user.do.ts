import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { baseSchema } from "./base.do";

const { Schema } = mongoose;

export type UserDO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  socketId: string;
};

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  socketId: { type: String, default: "" },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.add(baseSchema);

export const userModeName = "User";

export const UserModel = mongoose.model(userModeName, userSchema);
