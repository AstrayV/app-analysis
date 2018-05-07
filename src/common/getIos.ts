const extract = require('ipa-extract-info');
import * as fs from 'fs';
// import * as pngdefry from 'pngdefry'
const pngdefry = require('pngdefry');
const JSZip = require("jszip");

interface ios_read_params{
	name: string,
	version: string,
	icon: string,
}

interface appInfo {
	name: string,
	version: string,
	icon: string,
	iconPath: string,
}
const rootPath = process.cwd();


const exchangePng = (input:string,output: string)=>{
	return new Promise((res,rej) =>{
		pngdefry(input,output,function(err:any){
			if(err){

				return
			}
			res(output)
		})
	})
}

const readIos = async (filePath: string) => {
	return new Promise<appInfo>(async(resolve,reject) =>{
		const readIpaInfo = (() => {
			return new Promise<ios_read_params>((res, rej) => {
				const fd = fs.openSync(filePath, 'r');
				extract(fd, (err: any, info: any, raw: any) => {
					if (err) throw err;
					console.log(info)
					// icon = info[0].CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles[0];
					console.log(info[0].CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles);
					// console.log(icon);
					const iconArr = info[0].CFBundleIcons.CFBundlePrimaryIcon.CFBundleIconFiles;
					const appInfo = {
						name: info[0].CFBundleDisplayName,
						version: info[0].CFBundleShortVersionString,
						icon: iconArr[iconArr.length - 1],
					}
					res(appInfo)
				});
			})
		});

		const appInfo = await readIpaInfo();
		fs.readFile(filePath,async (err: any, data: any) => {
			if (err) throw err;
			const zip = new JSZip();
			const content = await zip.loadAsync(data,{createFolders: true});
			const files = content.files;
			const fileArr = Object.keys(files);
			const { icon } = appInfo;
			const iconArr = fileArr.filter((value) => {
				return value.indexOf(icon) > -1
			});
			const d = await zip.file(`${iconArr[0]}`).async('nodebuffer');
			const iconPath = `${rootPath}/static/${appInfo.name}ipa${appInfo.version}-icon.png`;
			// const newPath = `${rootPath}/static/${appInfo.name}ipa${appInfo.version}-icon-new.png`;
			fs.writeFileSync(iconPath, d);
			await exchangePng(iconPath,iconPath);
			// console.log('getios',`${rootPath}/static/${appInfo.name}ipa${appInfo.version}-icon.png`)
			resolve({
				name: appInfo.name,
				version: appInfo.version,
				icon: appInfo.icon,
				iconPath: iconPath
			})
			// zip.loadAsync(data, { createFolders: true }).then((content: any) => {
			// 	const files = content.files;
			// 	const fileArr = Object.keys(files);
			// 	const { icon } = appInfo;
			// 	const iconArr = fileArr.filter((value) => {
			// 		return value.indexOf(icon) > -1
			// 	})
			// 	zip.file(`${iconArr[iconArr.length - 1]}`).async('nodebuffer').then((d: any) => {
			// 		fs.writeFileSync(`${rootPath}/static/${appInfo.name}ipa${appInfo.version}-icon.png`, d);
			// 	})
			// })
		});
	})

}




export default readIos;