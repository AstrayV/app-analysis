import * as jwt from 'jsonwebtoken';
const secret = 'diary secret';
import user_dao from '../dao/user_dao';
import * as crypto from 'crypto';
import * as moment from 'moment';
const userLoginService = async(ctx: any,next: object) =>{
    const playload = ctx.request.body;
    const user = await user_dao.find_user_by_username(playload);
    if(user){
        // const md5Pwd = crypto.createHash('md5').digest('hex');
        const hash = crypto.createHash('md5');
        const md5Pwd = hash.update(playload.password).digest('hex');
        console.log(md5Pwd);
        if(md5Pwd !== user.password){
            ctx.status = 400;
            ctx.body = {
                error: 'password error',
            };
            return
        }
        let userToken = {
            username: user.username,
            id: user.id,
            date: new Date()
        };
        const token = jwt.sign(userToken, secret, {expiresIn: '24h'})
        ctx.staus = 200;
        ctx.body = {
            id: user.id,
            token: token
        }
    }else{
        ctx.status = 400;
        ctx.body = {
            error: 'user not found'
        };
    }
}

const add_new_user = async(ctx: any, next: object) =>{
    let playload = ctx.request.body;
    const hash = crypto.createHash('md5');
    const md5Pwd = hash.update(playload.password).digest('hex');
    playload.password = md5Pwd;
    const result = await user_dao.add_new_user(playload);
    if(result.affectedRows > 0 ){
        ctx.status = 200;
    }else{
        ctx.status = 400;
    }
}

const delete_user = async(ctx: any,next: object) =>{
    const id = ctx.params.id;
    const result = await user_dao.delete_user(id);
    if(result.affectedRows > 0){
        ctx.status = 200;
    }else{
        ctx.status = 400;
    }
}


export default {
    userLoginService,
    add_new_user,
    delete_user,

}