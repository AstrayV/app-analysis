const Router = require('koa-router')();
import user_service from '../service/user_service';
Router.post('/login',user_service.userLoginService);
// app.use(Router.routes());

Router.post('/signup',user_service.add_new_user);

Router.delete('/user/:id',user_service.delete_user);

Router.put('/password',user_service.change_user_password)

// Router.get('/user',user_service.find_users);
export default Router;