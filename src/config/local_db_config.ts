export default {
    type: "mysql",
    host: "120.78.131.37",
    port: 3306,
    username: "nong",
    password: "hzx123",
    database: "app_manage",
    entities: [
        __dirname + "/entity/*.js"

    ],
    synchronize: true
}