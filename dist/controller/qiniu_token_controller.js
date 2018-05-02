"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('koa-router')();
var get_qiniu_token_1 = require("../service/get_qiniu_token");
Router.get('/qiniuToken', get_qiniu_token_1.get_qiniu_token);
exports.default = Router;
//# sourceMappingURL=qiniu_token_controller.js.map