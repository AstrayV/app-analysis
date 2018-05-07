const qiniu = require('qiniu');

const accessKey = 'QXfK7MdjkHRFe2JdC8A1bkcWz4jYEbs2KOGYN_d6';
const secretKey = 'j3WMNsCgv65pcS4ged2ounucyxc0WhfXAa-CuTZd';
qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;

// const bucket = 'appmanage'
/**
 * 
 * @param filename 
 * @param bucket appmanage or appicon
 */
export const getQiniuToken = (filename: string, bucket: string) => {
    const options = {
        scope: bucket + ":" + filename,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken();
    return uploadToken;
}
interface qiniuRes {
    hash: string,
    key: string
}
/**
 * 
 * @param file 文件路径
 * @param uploadToken token
 * @param key 文件名
 */
export const upload_file = async(uploadToken: string, key: string, file: string, ) => {
    const result = await new Promise<qiniuRes>((res, rej) => {
        const config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z2;
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        formUploader.putFile(uploadToken, key, file, putExtra, (respErr: any,
            respBody: any, respInfo: any) => {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode === 200) {
                res(respBody)
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });
    })
    return result;
}