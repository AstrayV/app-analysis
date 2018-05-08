import * as fs from 'fs';

const parser = require('apkreader');
const ApkReader = require('adbkit-apkreader')


interface appInfo{
	name: string,
	version: string,
    icon: string,
    iconPath: string,
    identifier?: string
}

const rootPath = process.cwd();

export default (filePath: string) => {
    return new Promise<appInfo>((res,rej) =>{
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
            const iconPath = `${rootPath}/static/${appInfo.name}apk${appInfo.version}-icon.png`
            fs.writeFileSync(iconPath,image);
            res({
                ...appInfo,
                iconPath
            })
        });        
    })

}







