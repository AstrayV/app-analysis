"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var app = new Koa();
exports.app = app;
var cors = require("koa2-cors");
var user_controller_1 = require("./controller/user_controller");
var qiniu_controller_1 = require("./controller/qiniu_controller");
var bodyParser = require("koa-bodyparser");
var jwtKoa = require("koa-jwt");
// import * as jwt from 'jsonwebtoken';
// import Router from 'koa-router';
// const verify = util.promisify(jwt.verify);
// read a zip file
var secret = 'diary secret';
app.use(cors());
app.use(bodyParser());
app.use(jwtKoa({ secret: secret }).unless({
    path: ['/login', '/signup', '/qiniutoken']
}));
app.use(user_controller_1.default.routes());
app.use(qiniu_controller_1.default.routes());
//# sourceMappingURL=app.js.map