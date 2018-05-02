"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var secret = 'diary secret';
var user_dao_1 = require("../dao/user_dao");
var crypto = require("crypto");
var userLoginService = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var playload, user, hash, md5Pwd, userToken, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                playload = ctx.request.body;
                return [4 /*yield*/, user_dao_1.default.find_user_by_username(playload)];
            case 1:
                user = _a.sent();
                if (user) {
                    hash = crypto.createHash('md5');
                    md5Pwd = hash.update(playload.password).digest('hex');
                    console.log(md5Pwd);
                    if (md5Pwd !== user.password) {
                        ctx.status = 400;
                        ctx.body = {
                            error: 'password error',
                        };
                        return [2 /*return*/];
                    }
                    userToken = {
                        username: user.username,
                        id: user.id,
                        date: new Date()
                    };
                    token = jwt.sign(userToken, secret, { expiresIn: '24h' });
                    ctx.staus = 200;
                    ctx.body = {
                        id: user.id,
                        token: token
                    };
                }
                else {
                    ctx.status = 400;
                    ctx.body = {
                        error: 'user not found'
                    };
                }
                return [2 /*return*/];
        }
    });
}); };
var add_new_user = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var playload, hash, md5Pwd, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                playload = ctx.request.body;
                hash = crypto.createHash('md5');
                md5Pwd = hash.update(playload.password).digest('hex');
                playload.password = md5Pwd;
                return [4 /*yield*/, user_dao_1.default.add_new_user(playload)];
            case 1:
                result = _a.sent();
                if (result.affectedRows > 0) {
                    ctx.status = 200;
                }
                else {
                    ctx.status = 400;
                }
                return [2 /*return*/];
        }
    });
}); };
var delete_user = function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
    var id, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = ctx.params.id;
                return [4 /*yield*/, user_dao_1.default.delete_user(id)];
            case 1:
                result = _a.sent();
                if (result.affectedRows > 0) {
                    ctx.status = 200;
                }
                else {
                    ctx.status = 400;
                }
                return [2 /*return*/];
        }
    });
}); };
exports.default = {
    userLoginService: userLoginService,
    add_new_user: add_new_user,
    delete_user: delete_user,
};
//# sourceMappingURL=user_service.js.map