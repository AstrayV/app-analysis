

import * as fs from 'fs';

import * as shortid from 'shortid'

import getAndroid from '../common/getAndroid';
import {getQiniuToken, upload_file} from '../common/qiniu';
import qiniu_config from '../config/qiniu_config';
const qiniu = require('qiniu');



const upload_apk = async(ctx:any,next: any)=>{
    const id = shortid.generate();

    const data = ctx.request.body;

    const file = `../android_app/${id}.apk`
    fs.writeFileSync(file,data);

    const info = await getAndroid(file);

    const uploadToken = getQiniuToken(`${info.name}android${info.version}-icon.png`,'appicon');

    const qiniuRes = await upload_file(file,uploadToken,`${info.name}android${info.version}-icon.png`);

    const bucket_url = qiniu_config.icon_bucket_url;

    const imageUrl = bucket_url + '/' + qiniuRes.key;
    ctx.status = 200;
    ctx.body = {
        name: info.name,
        key: id,
        version: info.version,
        imageUrl: imageUrl
    };
}

const inset_apk_info = async(ctx: any, next:any) =>{
    
}