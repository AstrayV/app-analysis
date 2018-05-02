
// import * as qiniu from 'qiniu';
const qiniu = require('qiniu');

const accessKey = 'QXfK7MdjkHRFe2JdC8A1bkcWz4jYEbs2KOGYN_d6';
const secretKey = 'j3WMNsCgv65pcS4ged2ounucyxc0WhfXAa-CuTZd';
qiniu.conf.ACCESS_KEY = accessKey;
qiniu.conf.SECRET_KEY = secretKey;



// const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const bucket = 'appmanage'
export const get_qiniu_token = async (ctx: any, next: any) => {
	// const bucket = ctx.request.query.bucket;
	const filename = ctx.request.query.filename;
	const options = {
		scope: bucket + ":" + filename,
	};
	const putPolicy = new qiniu.rs.PutPolicy(options);
	const uploadToken=putPolicy.uploadToken();
	
	ctx.status = 200;
	ctx.body = {
		token: uploadToken,
		bucket_url: 'p82y2n3wo.bkt.clouddn.com'
	};
}


