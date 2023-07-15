import { z } from "zod";
import { role } from "./user.constant";

export const CreateUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    role: z.string().optional(),
  }),
});
export const PasswordChangeUserZodSchema = z.object({
  body: z.object({
    newPassword: z.string({
      required_error: "New Password is required",
    }),
    oldPassword: z.string({
      required_error: "Old password is required",
    }),
  }),
});
export const UpdateUserZodSchema = z.object({
  body: z.object({
    role: z.enum([...role] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    email: z.string().optional(),
    totalBuy: z.number().optional(),
    totalSell: z.number().optional(),
  }),
});

export const CreateLogInZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),

    email: z.string({
      required_error: "Phone number is required",
    }),
  }),
});
