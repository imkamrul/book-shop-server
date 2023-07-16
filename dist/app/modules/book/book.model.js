"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    book_img: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publishDate: {
        type: String,
        required: true,
    },
    totalDownload: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            message: {
                type: String,
                required: true,
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        },
    ],
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
bookSchema.pre("save", function (next) {
    this.totalDownload = 0;
    next();
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
