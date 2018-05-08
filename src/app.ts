import * as Koa from 'koa';
const app = new Koa();
import * as cors from 'koa2-cors';
import userRouter from './controller/user_controller';
import qiniuRouter from './controller/qiniu_controller';
import UploadAppRouter from './controller/upload_app_controller';
import * as bodyParser from 'koa-bodyparser';
import * as jwtKoa from 'koa-jwt';
import * as util from 'util';

// var log4js = require('log4js');
import * as fs from 'fs';

// import * as jwt from 'jsonwebtoken';
// import Router from 'koa-router';
// const verify = util.promisify(jwt.verify);

const rootPath = process.cwd();



// read a zip file

// console.log(process.cwd());

const secret = 'diary secret';
app.use(cors());
app.use(require('koa-static')(rootPath + '/plist'));
app.use(async(ctx, next) => {
	try {
	  ctx.error = (code: any, message: any) => {
		if (typeof code === 'string') {
		  message = code;
		  code = 500;
		}
		ctx.throw(code || 500, message || '服务器错误');
	  };
	  await next();
	} catch (e) {
	  let status = e.status || 500;
	  let message = e.message || '服务器错误';
	  ctx.response.body = { status, message };
   
	}
  });
app.use(bodyParser());



app.use(jwtKoa({ secret }).unless({
	path: ['/login', '/signup',/^\/downloadcount/,/^\/info/,/^\/plist/]
}))

app.use(userRouter.routes());
app.use(qiniuRouter.routes());
app.use(UploadAppRouter.routes());
export { app };
