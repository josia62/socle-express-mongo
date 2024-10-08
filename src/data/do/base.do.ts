import mongoose from "mongoose";

export const baseSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

baseSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});
