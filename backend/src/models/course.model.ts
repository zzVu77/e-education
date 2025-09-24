/* eslint-disable @typescript-eslint/no-explicit-any */
// src/models/course.model.ts
import { Schema, model, Document } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

export interface ICourse extends Document {
  title: string;
  description?: string;
  price: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  duration: number;
  imgUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    instructor: { type: String, required: true },
    duration: { type: Number, required: true },
    imgUrl: { type: String, default: "" },
  },
  { timestamps: true },
);

CourseSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});
CourseSchema.plugin(mongooseLeanVirtuals);

export const CourseModel = model<ICourse>("Course", CourseSchema);
