"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../middleware/Auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("./user.constant");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get("/my-profile", (0, Auth_1.auth)(...user_constant_1.role), user_controller_1.getMyProfile);
router.patch("/my-profile", (0, Auth_1.auth)(...user_constant_1.role), (0, validateRequest_1.default)(user_validation_1.UpdateUserZodSchema), user_controller_1.updateMyProfile);
router.patch("/my-profile/password-change", (0, Auth_1.auth)(...user_constant_1.role), (0, validateRequest_1.default)(user_validation_1.PasswordChangeUserZodSchema), user_controller_1.updateMyPassword);
router.delete("/my-profile/:id", user_controller_1.deleteUserById);
exports.UserRoutes = router;
