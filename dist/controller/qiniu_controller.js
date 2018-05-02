"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('koa-router')();
var qiniu_service_1 = require("../service/qiniu_service");
Router.get('/qiniuToken', qiniu_service_1.get_qiniu_token);
exports.default = Router;
//# sourceMappingURL=qiniu_controller.js.map