"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhishListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = require("../../middleware/Auth");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const whishlist_controller_1 = require("./whishlist.controller");
const whishlist_validation_1 = require("./whishlist.validation");
const router = express_1.default.Router();
router.post("/", (0, Auth_1.auth)(...user_constant_1.role), (0, validateRequest_1.default)(whishlist_validation_1.WhishListZodSchema), whishlist_controller_1.createWhishList);
router.patch("/:id", (0, Auth_1.auth)(...user_constant_1.role), (0, validateRequest_1.default)(whishlist_validation_1.WhishListUpdateZodSchema), whishlist_controller_1.updateSingleWhishList);
router.get("/:id", (0, Auth_1.auth)(...user_constant_1.role), whishlist_controller_1.getSingleWhishList);
router.delete("/:id", (0, Auth_1.auth)(...user_constant_1.role), whishlist_controller_1.deleteSingleWhishList);
exports.WhishListRoutes = router;
