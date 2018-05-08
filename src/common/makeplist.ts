interface plistParams {
	url: string,
	icon: string,
	name: string,
	identifier: string,
	version: string,
	
}

import * as fs from 'fs';
const rootPath = process.cwd();
const makePlist = (plistParams: plistParams) =>{
	return new Promise<string>(async(res,rej) =>{
		const str = `<?xml version="1.0" encoding="UTF-8"?>  
		<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">  
		<plist version="1.0">  
		<dict>  
		<key>items</key>  
		<array>  
		<dict>  
		<key>assets</key>  
		<array>  
		<dict>  
		<key>kind</key>  
		<string>software-package</string>  
		<key>url</key>  
		<string>${plistParams.url}</string>  
		</dict>  
		<dict>
			<key>kind</key>
			<string>display-image</string>
			<key>url</key>
			<string>${plistParams.icon}</string>
		</dict>
		<dict>
			<key>kind</key>
			<string>full-size-image</string>
			<key>url</key>
			<string>${plistParams.icon}</string>
		</dict>
		</array>  
		<key>metadata</key>  
		<dict>  
		<key>bundle-identifier</key>  
		<string>${plistParams.identifier}</string>  
		<key>bundle-version</key>  
		<string>${plistParams.version}</string>  
		<key>kind</key>  
		<string>software</string>  
		<key>title</key>  
		<string>${plistParams.name}</string>  
		</dict>  
		</dict>  
		</array>  
		</dict>  
		</plist>`
		const plistPath = `${plistParams.name}-${plistParams.version}.plist`;
		fs.writeFileSync(rootPath+ '/plist/' + plistPath,str);
		res(plistPath);
	});
}


export default makePlist;