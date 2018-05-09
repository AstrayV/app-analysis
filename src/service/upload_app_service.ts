

import * as fs from 'fs';

import * as shortid from 'shortid'
import * as formidable from 'formidable'
import getAndroid from '../common/getAndroid';
import getIos from '../common/getIos';
import { getQiniuToken, upload_file } from '../common/qiniu';
import qiniu_config from '../config/qiniu_config';
import Version_Dao from '../dao/upload_app_dao';
import * as _ from 'lodash';
import makePlist from '../common/makeplist';

const qiniu = require('qiniu');


const rootPath = process.cwd();

interface info {
    name: string,
    version: string,
    icon: string,
    iconPath: string,
    identifier?: string,
}

/**
 * 上传 解析apk
 * @param ctx 
 * @param next 
 */
const upload_apk = async (ctx: any, next: any) => {
    console.log(rootPath);
    const id = shortid.generate();
    // const file = `${id}.png`;
    let filePath: string;

    // ctx.status = 200;
    const form = new formidable.IncomingForm();
    const data: any = await new Promise((res, rej) => {
        form.parse(ctx.req, async (err, fields, files) => {
            console.log(files.file.path);
            res({
                uploadDir: files.file.path,
                sufix: fields.suffix
            })
        })
    });
    console.log(data);
    const uploadDir = data.uploadDir;
    let appType: number;
    const sufix = data.sufix;
    switch (data.sufix) {
        case 'apk':
            appType = 2;
            break;
        case 'ipa':
            appType = 1;
            break;
    };
    if (!uploadDir) {
        ctx.status = 400;
    } else {
        filePath = `${rootPath}/static/${id}.${sufix}`;
        const fileData = fs.readFileSync(uploadDir);
        fs.writeFileSync(filePath, fileData);
        let info;
        switch (appType) {
            case 1:
                info = await getIos(filePath);
                break;
            case 2:
                info = await getAndroid(filePath);
                break;
        }
        const { name, version } = info;
        let code: string;
        let introdution:string;
        const result = await Version_Dao.find_app_version({ name: info.name, version: info.version, type: appType});
        if (result) {
            code = result.code;
            introdution = result.introdution
        } else {
            code = shortid.generate();
            introdution = '';
        };
        const avatarName = `${info.name}${sufix}${info.version}-icon`;
        const avatarPath = `${rootPath}/static/${info.name}${sufix}${info.version}-icon.png`;
        const uploadToken = getQiniuToken(avatarName, 'appicon');
        console.log('avatarPath',avatarPath);
        const qiniuRes =
            await upload_file(uploadToken,
                avatarName,
                avatarPath
            );
        console.log(qiniuRes);

        let plist:string;
        
        // if(appType === 1){
        //     const plistData = await makePlist({
        //         name: info.name,
        //         version: info.version,
        //         icon: imageUrl,

        //     })
        // }
        const bucket_url = qiniu_config.icon_bucket_url;
        const imageUrl = bucket_url + '/' + qiniuRes.key;
        console.log(imageUrl)
        fs.unlinkSync(filePath);
        fs.unlinkSync(avatarPath);
        ctx.status = 200;
        ctx.body = {
            name: info.name,
            code: code,
            version: info.version,
            imageUrl:' http://' + imageUrl,
            type: appType,
            introdution: introdution,
            identifier: appType === 1 ? info.identifier : '', 
        };
    }
}
/**
 * 上传中间件
 * 
 */
const upload_file_service = async (ctx: any, next: any) => {
    const { uploadToken, avatarName, avatarPath, name, code, version } = ctx.state.props;
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    formUploader.putFile(uploadToken, avatarName, avatarPath, putExtra, (respErr: any,
        respBody: any, respInfo: any) => {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode === 200) {
            const bucket_url = qiniu_config.icon_bucket_url;
            const imageUrl = bucket_url + '/' + respBody.key;
            console.log(imageUrl);
            ctx.status = 200;
            ctx.body = {
                name: name,
                code: code,
                version: version,
                imageUrl: imageUrl
            };

        } else {
            ctx.status = 400;
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });


}
/**
 * 保存 apk信息
 * @param ctx 
 * @param next 
 */
interface insert_params {
    app_url: string,
    name: string,
    code: string,
    introdution: string,
    icon_url: string,
    type: number,
    version: string,
    identifier?: string
}
const inset_apk_info = async (ctx: any, next: any) => {
    const params: insert_params = ctx.request.body;

    const result = await Version_Dao.upload_version(params);
    if (result) {
        
        ctx.status = 200;
    } else {
        ctx.status = 400;
    }
}


const find_app_list = async (ctx: any, next: any) => {
    const query = ctx.request.query;
    const result = await Version_Dao.find_app_list(query);
    if(result){
        ctx.status = 200;
        ctx.body = result
    }else{
        ctx.status = 400;
    }
}

const download_count_add = async(ctx:any,next: any) =>{
    const code = ctx.params.code;
    const result = await Version_Dao.download_count_add(code);
    if(result.affectedRows > 0 ){
        ctx.status = 200;
    }else{
        ctx.status = 400;
    }
}

const get_download_info = async (ctx: any, next: any)=>{
    const code = ctx.request.query.code;
    const result:any = await Version_Dao.get_download_info(code);
    console.log(result);
    if(result){
        ctx.status = 200;
        ctx.body = result[0];
    }else{
        ctx.status = 400;
    }

}

export default {
    upload_apk,
    inset_apk_info,
    upload_file_service,
    find_app_list,
    download_count_add,
    get_download_info
}