const request = require('request');
const context = require("./context.js")
const path = require('path')
const fs = require('fs')
const logger = require("./log");
const zlib = require('zlib');
var imgtype,header,ziptype

const getmap = function(url){
    const options = {
        'method': 'GET',
        'url': url,
        'headers': {
          'origin': 'null',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.100 Safari/537.36 Edg/80.0.361.53',
          'sec-fetch-dest': 'empty',
          'accept': '*/*',
          'sec-fetch-site': 'cross-site',
          'sec-fetch-mode': 'cors',
          'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
          ...header
        }
    };
    return request(options, function (error, response) {
        if(!response || !response.body || response.body.indexOf('<html')>-1){
            logger.error(`ERROR: ${url}`)
        }
        if (error) logger.error(`ERROR: ${url}`);
    });
}


const gunGzip = function(writeStream){
    switch (ziptype) {
        case 'none':
            return writeStream
        case 'gzip':
            return writeStream && writeStream.pipe(zlib.createGunzip())
        case 'deflate':
            return writeStream && writeStream.pipe(zlib.createInflate())
        default:
            return writeStream
    }
    
}


const downloadMap = function(Z,X,Y){
    var url = context.get('url')
    imgtype = imgtype || context.get('imgtype')
    ziptype = ziptype || context.get('ziptype')
    header = header || context.get('header')
    url = url && url.replace('{z}',Z)
    url = url && url.replace('{x}',X)
    url = url && url.replace('{y}',Y)
    const outdirpath = path.join(context.get('outdir'),`${Z}/${X}/${Y}.${imgtype}`)
    var writeStream = fs.createWriteStream(outdirpath);
    try {
        const readStream = url && getmap(url)
        writeStream = readStream && gunGzip(readStream).pipe(writeStream)
        writeStream && writeStream.on("close", function() {
            logger.info(`SUCCESS: ${Z}/${X}/${Y}.${imgtype}`);
            writeStream.end();
        });
        writeStream && writeStream.on('error', function() {
            logger.error(`ERROR: ${Z}/${X}/${Y}.${imgtype}`);
        }) 
    } catch (error) {
        logger.error(`ERROR: ${Z}/${X}/${Y}.${imgtype}`);
    }
}


module.exports={
    downloadMap
}