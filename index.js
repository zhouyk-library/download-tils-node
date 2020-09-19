const config = require("./project.config.js")
const path = require('path')
const rootdir = __dirname
const outdir = path.resolve(config.out)
const utils = require('./api/utils.js')
const context = require('./api/context.js')
const mapApi = require("./api/map.js")
const logger = require("./api/log");
const args = process.argv.splice(2)
const isDownload = args.includes('download') || args.length === 0;
const isCheckDown = args.includes('check');
utils.initContext({...config,outdir,rootdir,logger})
const zooms = utils.sortsZooms(context)
isDownload && utils.createOutDir(outdir)
const titlesParams=new Array()
zooms.forEach((zoom,index)=>{
    const tilesAnalyzeData = utils.analyzeTiles(context,zoom)
    let {xStart, xEnd, yStart, yEnd, tilesCount} = tilesAnalyzeData
    logger.info(`分析zoom:${zoom},  X轴:${xStart}~${xEnd},  Y轴:${yStart}~${yEnd},   总数:${tilesCount}`)
    isDownload && utils.createDir(outdir,zoom,xStart,xEnd)
    for(let xx = xStart;xx<= xEnd;xx++){
        for(let yy = yStart;yy<= yEnd;yy++){
            titlesParams.push(
                {
                    zoom:zoom,
                    x:xx,
                    y:yy
                }
            )
        }
    }
})
const bathDownload = async function(outdir, titlesDataParams){
    var index = 0,maxIndex = titlesDataParams.length
    logger.info(`开始下载,总次数:${maxIndex}`)
    var setIntervalFlag = setInterval(function() {
        if(index >= maxIndex){
            clearInterval(setIntervalFlag)
            logger.info(`处理总数:${index}`)
            recursionRetry(outdir, titlesDataParams)
            return;
        }
        mapApi.downloadMap(titlesDataParams[index].zoom,titlesDataParams[index].x,titlesDataParams[index].y)
        index++
    }, 333)
}
var retrycount = 0
const  recursionRetry = async function(outdir, titlesDataParams){
    logger.info(`开始校验...`)
    retrycount++
    var fieldList = utils.checkFieldImage(outdir, titlesDataParams)
    logger.info('check finish')
    let errorCOunt = fieldList.length
    if( errorCOunt === 0){
        logger.info('校验成功，无失败')
        process.exit()
    }
    if( retrycount > 100){
        logger.info('已经循环校验下载100次，依然存在失败,请分析日志，程序结束!')
        process.exit()
    }
    logger.info(`校验成功，失败Count:${errorCOunt},开始处理...`)
    bathDownload(outdir, fieldList)
}
isDownload && bathDownload(outdir, titlesParams)
isCheckDown && recursionRetry(outdir, titlesParams)
