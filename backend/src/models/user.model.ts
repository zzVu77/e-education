// src/models/user.model.ts
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
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

export const UserModel = model<IUser>("User", UserSchema);
