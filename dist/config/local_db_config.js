"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "nong",
    password: "hzx123",
    database: "app_manage",
    entities: [
        __dirname + "/entity/*.js"
    ],
    synchronize: true
};
//# sourceMappingURL=local_db_config.js.map