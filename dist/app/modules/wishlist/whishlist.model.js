"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhishList = void 0;
const mongoose_1 = require("mongoose");
const whishlist_constant_1 = require("./whishlist.constant");
const WhishListSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    currentStatus: {
        type: String,
        required: true,
        enum: whishlist_constant_1.currentStatus,
        default: whishlist_constant_1.currentStatus[0],
    },
}, {
    timestamps: true,
});
exports.WhishList = (0, mongoose_1.model)("WhishList", WhishListSchema);
