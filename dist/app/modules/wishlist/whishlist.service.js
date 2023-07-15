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
exports.updateWhishListById = exports.getWhishListById = exports.deleteWhishListById = exports.saveWhishList = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const book_model_1 = require("../book/book.model");
const book_service_1 = require("../book/book.service");
const user_service_1 = require("../user/user.service");
const whishlist_model_1 = require("./whishlist.model");
const saveWhishList = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { book, buyer } = data;
    const findBookInWhishList = yield whishlist_model_1.WhishList.findOne({
        book: book,
        buyer: buyer,
    });
    if (findBookInWhishList) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book already in your WhishList");
    }
    const findBook = yield (0, book_service_1.getSingleBook)(book);
    if (!findBook) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book not found");
    }
    const findBuyer = yield (0, user_service_1.getSingleUser)(buyer);
    if (!findBuyer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Buyer not found");
    }
    let newOder;
    if (findBook && findBuyer) {
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            const options = { new: true, session: session };
            yield book_model_1.Book.findOneAndUpdate({ _id: book }, { $inc: { totalDownload: 1 } }, options);
            newOder = yield whishlist_model_1.WhishList.create([data], { session });
            if (!newOder) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create New Order");
            }
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
    }
    return newOder;
});
exports.saveWhishList = saveWhishList;
const deleteWhishListById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const findBookInWhishList = yield whishlist_model_1.WhishList.findById(id).populate("book");
    let deletedWhishList;
    if (!findBookInWhishList) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book not available in whishlist");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const options = { new: true, session: session };
        deletedWhishList = yield whishlist_model_1.WhishList.findByIdAndDelete(id, options);
        const result = yield book_model_1.Book.findOneAndUpdate({ _id: (_a = findBookInWhishList === null || findBookInWhishList === void 0 ? void 0 : findBookInWhishList.book) === null || _a === void 0 ? void 0 : _a._id }, { $inc: { totalDownload: -1 } }, options);
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return deletedWhishList;
});
exports.deleteWhishListById = deleteWhishListById;
const getWhishListById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield whishlist_model_1.WhishList.find({ buyer: id }).populate("book");
    return result;
});
exports.getWhishListById = getWhishListById;
const updateWhishListById = (id, currentStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield whishlist_model_1.WhishList.findOneAndUpdate({ _id: id }, { currentStatus }, {
        new: true,
    });
    return result;
});
exports.updateWhishListById = updateWhishListById;
