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
exports.deleteReview = exports.createReview = exports.updateBookById = exports.deleteBookById = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../common/catchAsync"));
const response_1 = __importDefault(require("../../common/response"));
const book_service_1 = require("./book.service");
exports.createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookData = req.body;
    console.log("bookData :", bookData);
    const result = yield (0, book_service_1.saveBook)(bookData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book created successfully",
        data: result,
    });
}));
exports.getBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, book_service_1.getAllBook)();
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book retrieved successfully",
        data: result,
    });
}));
exports.getBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield (0, book_service_1.getSingleBook)(id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book retrieved successfully",
        data: result,
    });
}));
exports.deleteBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const result = yield (0, book_service_1.deleteBook)(id, userId);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book deleted successfully",
        data: result,
    });
}));
exports.updateBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req.params.id;
    const updatedData = req.body;
    const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    const result = yield (0, book_service_1.updateBook)(id, userId, updatedData);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Books updated successfully",
        data: result,
    });
}));
exports.createReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewData = req.body;
    const id = req.params.id;
    const result = yield (0, book_service_1.saveReview)(reviewData, id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book review added successfully",
        data: result,
    });
}));
exports.deleteReview = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    const id = req.params.id;
    const result = yield (0, book_service_1.deleteReviewByID)(userId, id);
    (0, response_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book review deleted successfully",
        data: result,
    });
}));
