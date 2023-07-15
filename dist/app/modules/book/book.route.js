"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../middleware/Auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const book_controller_1 = require("./book.controller");
const book_validation_1 = require("./book.validation");
const router = express_1.default.Router();
router.post("/", (0, Auth_1.auth)(...user_constant_1.role), (0, validateRequest_1.default)(book_validation_1.bookZodSchema), book_controller_1.createBook);
router.get("/", (0, Auth_1.auth)(...user_constant_1.role), book_controller_1.getBooks);
router.get("/:id", (0, Auth_1.auth)(...user_constant_1.role), book_controller_1.getBookById);
router.delete("/:id", (0, Auth_1.auth)(...user_constant_1.role), book_controller_1.deleteBookById);
router.patch("/:id", (0, Auth_1.auth)(...user_constant_1.role), (0, validateRequest_1.default)(book_validation_1.updateBookZodSchema), book_controller_1.updateBookById);
exports.BookRoutes = router;
