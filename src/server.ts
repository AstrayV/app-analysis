import { app } from './app';
import "reflect-metadata";
import { getConnectionManager, ConnectionManager, Connection,createConnection } from "typeorm";
// import {Login} from './entity/login';
import * as path from 'path';
import local_db_config from './config/local_db_config';
import server_db_config from './config/server_db_config';

let db_config: db_config

interface db_config {
    type: string,
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    entities: any,
    synchronize: boolean
}

console.log('环境变量', process.env.NODE_ENV);
// switch(process.env.NODE_ENV){
//     case 'dev':
//         db_config = local_db_config;
//         break;
//     case 'production':
//         db_config = server_db_config;
//         break;
// }
if(process.env.NODE_ENV === 'dev'){
    db_config = local_db_config;
}else{
    db_config = server_db_config;
}
console.log(db_config);

// console.log( '../' + __dirname + "/entity/*.ts")

// (async() =>{
//     // const connection = await createConnection();
//     const connectionManager = new ConnectionManager();
//     const connection = connectionManager.create(db_config);
//     await connection.connect();
//     const server = app.listen(7890, () => {
//         console.log('Server is running at http://localhost:7890');
//         console.log('Press CTRL-C to stop \n');
//     });
// })



createConnection({
    type: "mysql",
    host: db_config.host,
    port: db_config.port,
    username: db_config.username,
    password: db_config.password,
    database: db_config.database,
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