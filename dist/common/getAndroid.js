"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var parser = require('apkreader');
var ApkReader = require('adbkit-apkreader');
parser.parse('./jingcai.apk', function (err, info) {
    if (err) {
        return console.error(err);
    }
    var image = fs.readFileSync;
    console.log(info);
});
ApkReader.open('./jingcai.apk')
    .then(function (reader) {
    reader.readContent('res/mipmap-hdpi-v4/icon.png').then(function (image) {
        console.log(image);
        fs.writeFile("image.png", image, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('success');
            }
        });
    });
});
//# sourceMappingURL=getAndroid.js.map