"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewByID = exports.saveReview = exports.updateBook = exports.deleteBook = exports.getAllBook = exports.getSingleBook = exports.saveBook = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_model_1 = require("../user/user.model");
const book_model_1 = require("./book.model");
const saveBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield user_model_1.User.findOne({ _id: book.seller });
    if (!getUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    // else if (getUser.role !== role[1]) {
    //   throw new ApiError(httpStatus.NOT_FOUND, "User is not a seller !");
    // }
    const result = yield book_model_1.Book.create(book);
    return result;
});
exports.saveBook = saveBook;
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOne({ _id: id }).populate("seller", "-password");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    return result;
});
exports.getSingleBook = getSingleBook;
const getAllBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find().populate("seller", "fullName");
    return result;
});
exports.getAllBook = getAllBook;
const deleteBook = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookFind = yield book_model_1.Book.findOne({ _id: id });
    if (!bookFind) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    if (bookFind.seller.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access");
    }
    const result = yield book_model_1.Book.findById({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    return result;
});
exports.deleteBook = deleteBook;
const updateBook = (id, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bookFind = yield book_model_1.Book.findOne({ _id: id });
    if (!bookFind) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found !");
    }
    if (bookFind.seller.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden Access");
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.updateBook = updateBook;
const saveReview = (reviewData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { $push: { reviews: reviewData } }, { new: true });
    return result;
});
exports.saveReview = saveReview;
const deleteReviewByID = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const findReviews = yield book_model_1.Book.findOne({
        "reviews._id": id,
        "reviews.user": userId,
    });
    if (!findReviews) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Review not found !");
    }
    const result = yield book_model_1.Book.findOneAndUpdate({ "reviews._id": id }, { $pull: { reviews: { _id: id, user: userId } } }, { new: true });
    return result;
});
exports.deleteReviewByID = deleteReviewByID;
