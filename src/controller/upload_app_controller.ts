const Router = require('koa-router')();
import upload_app_service from '../service/upload_app_service';



Router.post('/uploadApp',upload_app_service.upload_apk);

Router.post('/app',upload_app_service.inset_apk_info);

Router.get('/app',upload_app_service.find_app_list);

Router.patch('/downloadcount/:code',upload_app_service.download_count_add);

Router.get('/info',upload_app_service.get_download_info);
export default Router;