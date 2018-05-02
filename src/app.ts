import * as Koa from 'koa';
const app = new Koa();
import * as cors from 'koa2-cors';
import userRouter from './controller/user_controller';
import qiniuRouter from './controller/qiniu_controller';
import * as bodyParser from 'koa-bodyparser';
import * as jwtKoa from 'koa-jwt';
import * as util from 'util';
// var log4js = require('log4js');
import * as fs from 'fs';

// import * as jwt from 'jsonwebtoken';
// import Router from 'koa-router';
// const verify = util.promisify(jwt.verify);

// const ApkReader = require('adbkit-apkreader');


// ApkReader.open('./jingcai.apk')
//     .then((reader: any) => reader.readManifest())
//     .then((manifest: any) => console.log(util.inspect(manifest, { depth: null })))






// read a zip file



const secret = 'diary secret';
app.use(cors());
app.use(bodyParser());
app.use(jwtKoa({ secret }).unless({
	path: ['/login', '/signup', '/qiniutoken']
}))

app.use(userRouter.routes());
app.use(qiniuRouter.routes());

export { app };
