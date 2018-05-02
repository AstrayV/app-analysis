import { app } from './app';
import "reflect-metadata";
import { createConnection } from "typeorm";
// import {Login} from './entity/login';
import * as path from 'path';
import local_db_config from './config/local_db_config';
import server_db_config from './config/server_db_config';

let db_config;


switch(process.env.NODE_ENV){
    case 'dev':
        db_config = local_db_config;
        break;
    case 'production':
        db_config = server_db_config;
        break;
    default:
        db_config = local_db_config;
}
console.log('环境变量', process.env.NODE_ENV);
// console.log( '../' + __dirname + "/entity/*.ts")
createConnection({
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
}).then(async(connection) => {
    const server = app.listen(7890, () => {
        console.log('Server is running at http://localhost:7890');
        console.log('Press CTRL-C to stop \n');
    });
}).catch((error) => console.log(error));



// export { server };