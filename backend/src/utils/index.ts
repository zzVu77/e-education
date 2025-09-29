import { Types } from "mongoose";
// Convert various types of values to an ID string
export function toIdString(value: string | object | undefined | null): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    const obj = value as { id?: unknown; _id?: unknown };
    if (typeof obj.id === "string") return obj.id;
    if (obj._id instanceof Types.ObjectId) {
      return obj._id.toString();
    }
  }
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}
