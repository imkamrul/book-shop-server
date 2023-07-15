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
exports.handleRefreshToken = exports.UserLogIn = exports.updateUserPassword = exports.updateUser = exports.deleteUser = exports.getSingleUser = exports.saveUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpeer_1 = require("../../common/jwtHelpeer");
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const user_model_1 = require("./user.model");
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result ? yield user_model_1.User.findById(result._id).select("-password") : null;
});
exports.saveUser = saveUser;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ _id: id }).select("-password");
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    return result;
});
exports.getSingleUser = getSingleUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    return result;
});
exports.deleteUser = deleteUser;
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.password) {
        delete payload.password;
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    result.password = "";
    return result;
});
exports.updateUser = updateUser;
const updateUserPassword = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, oldPassword } = payload;
    const isUserExist = yield user_model_1.User.findOne({ _id: id });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    const isOldPasswordMatched = yield user_model_1.User.isPasswordMatched(oldPassword, isUserExist.password);
    if (!isOldPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Old Password is incorrect");
    }
    const hashPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bycrypt_salt_rounds));
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, { password: hashPassword }, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    result.password = "";
    return result;
});
exports.updateUserPassword = updateUserPassword;
const UserLogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_model_1.User.findOne({ email: email });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Email/Password is incorrect");
    }
    const { id, role } = isUserExist;
    const accessToken = (0, jwtHelpeer_1.createToken)({ id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = (0, jwtHelpeer_1.createToken)({ id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.UserLogIn = UserLogIn;
const handleRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtHelpeer_1.verifyToken)(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { id } = verifiedToken;
    const isUserExist = yield user_model_1.User.findById({ _id: id }, { id: 1, role: 1 });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    const newAccessToken = (0, jwtHelpeer_1.createToken)({
        id: isUserExist.id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.handleRefreshToken = handleRefreshToken;
