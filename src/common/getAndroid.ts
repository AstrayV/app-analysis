import * as fs from 'fs';

const parser = require('apkreader');
const ApkReader = require('adbkit-apkreader')
parser.parse('./jingcai.apk',  (err:any, info:any) =>{

   if(err){
       return console.error(err);
   }
   const image = fs.readFileSync
   console.log(info);
});




ApkReader.open('./jingcai.apk')
    .then(function (reader: any) {
        reader.readContent('res/mipmap-hdpi-v4/icon.png').then((image: any) => {
            console.log(image)
            fs.writeFile("image.png", image, (err: any) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success')
                }
            });
        })
    })