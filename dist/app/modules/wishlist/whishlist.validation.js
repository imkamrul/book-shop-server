"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhishListUpdateZodSchema = exports.WhishListZodSchema = void 0;
const zod_1 = require("zod");
const whishlist_constant_1 = require("./whishlist.constant");
exports.WhishListZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({
            required_error: "Book Id field is required ",
        }),
        buyer: zod_1.z.string({
            required_error: "Buye ID field is required ",
        }),
        currentStatus: zod_1.z
            .enum([...whishlist_constant_1.currentStatus])
            .optional(),
    }),
});
exports.WhishListUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        currentStatus: zod_1.z
            .enum([...whishlist_constant_1.currentStatus])
            .optional(),
    }),
});
