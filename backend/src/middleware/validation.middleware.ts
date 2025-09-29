/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// validation.middleware.ts
import { Request, Response, NextFunction } from "express";
import z from "zod";

export const validate = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return res.status(400).json({
        status: "error",
        errors,
      });
    }
    req.body = result.data;
    next();
  };
};
