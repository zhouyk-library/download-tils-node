module.exports={
  url:'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
  zooms:[1],
  maxs:[85,180],
  mins:[-85,-180],
  header:{
  'accept': 'image/webp,*/*',
  'Referer': 'http://localhost:9527/#/exhibition-center/map-view',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.34 Safari/537.36 Edg/83.0.478.25'
  },
  out:'out',
  imgtype:'jpeg'
}