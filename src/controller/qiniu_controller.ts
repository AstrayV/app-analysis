const Router = require('koa-router')();
import {get_qiniu_token} from '../service/qiniu_service';



Router.get('/qiniuToken',get_qiniu_token);


export default Router;