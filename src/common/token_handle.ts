const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)


export const token_handle = async(token: string)=>{

    const tokenInfo = await verify(token.split(' ')[1], 'diary secret');
    return tokenInfo;
}



