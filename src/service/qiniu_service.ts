
import {getQiniuToken} from '../common/qiniu';



// const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);


export const get_qiniu_token = async (ctx: any, next: any) => {
	// const bucket = ctx.request.query.bucket;
	const filename = ctx.request.query.filename;
	const bucket = ctx.request.query.bucket;
	const uploadToken = getQiniuToken(filename,bucket);
	ctx.status = 200;
	ctx.body = {
		token: uploadToken,
		bucket_url: 'p82y2n3wo.bkt.clouddn.com'
	};
}


