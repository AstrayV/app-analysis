import * as fs from 'fs';

const parser = require('apkreader');
const ApkReader = require('adbkit-apkreader')



export default (filePath: string) => {
    return new Promise((res,rej) =>{
        parser.parse(filePath, async(err: any, info: any) => {
            if (err) {
                return console.error(err);
            }
            console.log(info);
            const appInfo = {
                name: info.applicationLabel,
                version: info.packageVersionName,
                icon: info.applicationIcon
            };
            const reader = await ApkReader.open(filePath);
            const image =  await reader.readContent(appInfo.icon);
            const iconPath = `../android-icon/${appInfo.name}android${appInfo.version}-icon.png`
            fs.writeFileSync(iconPath,image);
            // ApkReader.open('./jingcai.apk')
            //     .then((reader: any) => {
            //         reader.readContent('res/mipmap-hdpi-v4/icon.png').then((image: any) => {
            //             console.log(image)
            //             fs.writeFile("image.png", image, (err: any) => {
            //                 if (err) {
            //                     console.log(err)
            //                 } else {
            //                     console.log('success')
            //                 }
            //             });
            //         })
            //     })
            // return {
            //     ...appInfo,
            //     iconPath
            // }
            res({
                ...appInfo,
                iconPath
            })
        });        
    })

}







