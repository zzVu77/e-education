/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/user.model.ts
import { Schema, model, Document } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

export interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  email?: string;
  googleId?: string;
  role: "user" | "admin";
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, unique: true, sparse: true },
    googleId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

UserSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.password; // không trả password ra JSON
  },
});
UserSchema.plugin(mongooseLeanVirtuals);
export const UserModel = model<IUser>("User", UserSchema);
