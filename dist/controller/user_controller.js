"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = require('koa-router')();
var user_service_1 = require("../service/user_service");
Router.post('/login', user_service_1.default.userLoginService);
// app.use(Router.routes());
Router.post('/signup', user_service_1.default.add_new_user);
Router.delete('/user/:id', user_service_1.default.delete_user);
// Router.get('/user',user_service.find_users);
exports.default = Router;
//# sourceMappingURL=user_controller.js.map