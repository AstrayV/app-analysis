export default {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "110",
    database: "app_manage",
    entities: [
        __dirname + "/entity/*.js"

    ],
    synchronize: true
}


