const extract = require('ipa-extract-info');
import * as fs from 'fs';
const JSZip = require("jszip");


const readIos = async()=>{
    const readIpaInfo = (() => {
        return new Promise((res, rej) => {
            const fd = fs.openSync('./jj.ipa', 'r');
            extract(fd, (err: any, info: any, raw: any) => {
                if (err) throw err;
                console.log(info)
                // icon = info[0].CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles[0];
                console.log(info[0].CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles);
                // console.log(icon);
                const iconArr = info[0].CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles;
                res({
                    name: info[0].CFBundleDisplayName,
                    version: info[0].CFBundleShortVersionString,
                    icon: iconArr[iconArr.length - 1],
                })
            });
        })
    });

	const appInfo = await readIpaInfo();
	console.log(appInfo)
	fs.readFile("./jj.ipa", (err: any, data: any) => {
		if (err) throw err;
		const zip = new JSZip();
		zip.loadAsync(data, { createFolders: true }).then((content: any) => {
			
			const files = content.files;
			const fileArr = Object.keys(files);
			const icon = appInfo.icon;
			console.log(icon);
			const iconArr = fileArr.filter((value)=>{
				return value.indexOf(icon) > -1
			})
			console.log(iconArr);
			console.log(`${iconArr[iconArr.length - 1]}`)
			zip.file(`${iconArr[iconArr.length - 1]}`).async('nodebuffer').then((d: any) => {
				console.log(d);
				fs.writeFileSync('./asd.png', d);
			})
			// zip.file('Payload/ZHSign.app/AppIcon60x60@2x.png').async('nodebuffer').then((d: any) => {
			// 	console.log(d);
			// 	fs.writeFileSync('./asd.png', d);
			// })
		})
	});
}




export default readIos;