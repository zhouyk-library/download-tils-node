const context = require("./context.js")
const path = require('path')
const fs = require('fs')

function lng2tile(lng, zoom)
{ 
    return (Math.floor((lng + 180) / 360 * Math.pow(2, zoom))); 
}

function lat2tile(lat, zoom)
{ 
    return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1/ Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); 
}

function initContext(contextValues){
    for(var key in contextValues){
        context.set(key,contextValues[key])
    }
}

function analyzeTiles(context,maxZoom)
{
    let tilesData = {
        xStart: lng2tile(context.get('mins')[1],  maxZoom),
        xEnd  : lng2tile(context.get('maxs')[1],  maxZoom),
        yStart: lat2tile(context.get('maxs')[0], maxZoom),
        yEnd  : lat2tile(context.get('mins')[0], maxZoom)
    }

    let xCount = Math.abs(tilesData.xEnd - tilesData.xStart) + 1,
        yCount = Math.abs(tilesData.yEnd - tilesData.yStart) + 1;

    tilesData.tilesCount = xCount * yCount;
    return tilesData;
}

function analyzeMaxZoom(context)
{
    let zooms = context.get('zooms'),maxZoom = 0
    zooms.forEach((item,index)=>{
        if(maxZoom < item){
            maxZoom = item
        }
    })
    return maxZoom;
}

function sortsZooms(context)
{
    let zooms = context.get('zooms')
    zooms.sort((item1,item2)=>{return item1-item2})
    return zooms;
}

function createDir(outdir,zoom,xStart,xEnd){
    let zPath = path.join(outdir,zoom+'')
    fs.mkdirSync(zPath);
    for(let i = xStart,j = xEnd;i<=j;i++){
        let xPath = path.join(zPath,i+'')
        fs.mkdirSync(xPath);
    }
}

function createOutDir(outdir){
    deleteFolderRecursive(outdir)
    fs.mkdirSync(outdir);
}

function deleteFolderRecursive(dirPath) {
    if( fs.existsSync(dirPath) ) {
        fs.readdirSync(dirPath).forEach(function(file) {
            var curPath = dirPath + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(dirPath);
    }
};
var imgtype

function checkFieldImage(outdir,titlesParams = []){
    const fieldList = []
    var outdirpath
    imgtype = imgtype || context.get('imgtype')
    titlesParams.forEach((item,index)=>{
        let { zoom, x, y} = item
        outdirpath = path.join(outdir,`${zoom}/${x}/${y}.${imgtype}`)
        
        if(fs.existsSync(outdirpath)){
            if(fs.statSync(outdirpath).size<=0) {
                fieldList.push(item);
            } else if(fs.readFileSync(outdirpath,'binary').indexOf('<html')>-1){
                fieldList.push(item);
            }
        } else {
            fieldList.push(item);
        }
    })
    return fieldList
}

module.exports={
    initContext,
    lng2tile,
    lat2tile,
    analyzeTiles,
    analyzeMaxZoom,
    sortsZooms,
    createDir,
    createOutDir,
    deleteFolderRecursive,
    checkFieldImage
} 