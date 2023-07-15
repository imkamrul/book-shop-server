"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLogInZodSchema = exports.UpdateUserZodSchema = exports.PasswordChangeUserZodSchema = exports.CreateUserZodSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
exports.CreateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        role: zod_1.z.string().optional(),
    }),
});
exports.PasswordChangeUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: zod_1.z.string({
            required_error: "New Password is required",
        }),
        oldPassword: zod_1.z.string({
            required_error: "Old password is required",
        }),
    }),
});
exports.UpdateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum([...user_constant_1.role]).optional(),
        password: zod_1.z.string().optional(),
        fullName: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        totalBuy: zod_1.z.number().optional(),
        totalSell: zod_1.z.number().optional(),
    }),
});
exports.CreateLogInZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
        email: zod_1.z.string({
            required_error: "Phone number is required",
        }),
    }),
});
