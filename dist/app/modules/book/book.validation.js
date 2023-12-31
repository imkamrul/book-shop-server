"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookZodSchema = exports.bookZodSchema = exports.reviewZodSchema = void 0;
const zod_1 = require("zod");
const reviewSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    rating: zod_1.z.number().optional(),
    message: zod_1.z.string().optional(),
    user: zod_1.z.string().optional(),
});
exports.reviewZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name field is required ",
        }),
        rating: zod_1.z.number({
            required_error: "Rating field is required ",
        }),
        message: zod_1.z.string({
            required_error: "Message field is required ",
        }),
        user: zod_1.z.string({
            required_error: "User field is required ",
        }),
    }),
});
exports.bookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book_img: zod_1.z.string({
            required_error: "Book image field is required ",
        }),
        rating: zod_1.z
            .number({
            required_error: "Rating field is required ",
        })
            .min(0)
            .max(5),
        title: zod_1.z.string({
            required_error: "Title field is required ",
        }),
        author: zod_1.z.string({
            required_error: "Author field is required ",
        }),
        genre: zod_1.z.string({
            required_error: "Genre field is required ",
        }),
        publishDate: zod_1.z.string({
            required_error: "Publish date field is required ",
        }),
        totalDownload: zod_1.z.number({
            required_error: "Total download field is required ",
        }),
        reviews: zod_1.z.array(reviewSchema).optional(),
        price: zod_1.z
            .number({
            required_error: "Price field is required ",
        })
            .positive(),
        seller: zod_1.z.string({
            required_error: "Seller field is required ",
        }),
    }),
});
exports.updateBookZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        book_img: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(0).max(5),
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publishDate: zod_1.z.string().optional(),
        totalDownload: zod_1.z.number().optional(),
        price: zod_1.z.number().positive().optional(),
        seller: zod_1.z.string().optional(),
        reviews: zod_1.z.array(reviewSchema).optional(),
    }),
});
