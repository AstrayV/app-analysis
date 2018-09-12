##keyword:
koa2、 typescript、 typeorm、 mysql 、qiniu、 jwt 、aapt.


##modules 
用户模块、 app版本管理模块、 上传模块. (还有其他什么模块我忘了)


##主要功能

* 解析apk ipa 文件获取 app名称、 app图标、 app版本 ,etc.
* 登录注册
* 一系列增删改查
* 生成ios 需要的 plist 在手机直接安装 ipa 文件
* 解析安卓的apk，需要在机器上配置aapt路径咯， ipa文件本质就是 zip，解压出来找到plist，就可以拿到 app信息了












#dev 启动

npm install 

npm run build-ts

npm run dev

#production 启动

npm install 

npm run build-ts

npm run production