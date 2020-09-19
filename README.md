# 地图瓦片下载
<br>

### 环境
> nodejs

v10.15.3
```bash
node -v
```
<br>

> npm

6.4.1
```bash
npm -v
```
<br>


### 安装

```
npm install
```


<br>

### 下载

```
npm run download
```

<br>

### 校验下载/恢复下载

```
npm run check:down
```

<br>

### 配置project.config.js

- url:String|请求URL配置
- zooms:Array<Integer>|放大层级配置
- maxs：Array<Double>|西北角经纬度
- mins:Array<Double>|东南角经纬度
- header:Map<String,Object>|请求头设置
- out:String|项目的相对位置
- imgtype:String|图片文件后缀
#### openstreetmap

```
{
    url:'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    zooms:[0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    maxs:[36.04731,119.95358],
    mins:[34.96493,118.60232],
    out:'out',
    imgtype:'png'
}

{
  url:'https://b.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38',
  zooms:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
  maxs:[36.04731,119.95358],
  mins:[34.96493,118.60232],
  out:'out',
  imgtype:'png'
}

```

<br>


#### googlemap

```
{
    url:'http://mt2.google.cn/vt/lyrs=y&scale=2&x={x}&y={y}&z={z}',
    zooms:[0,1,2,3,4,5,6,7,8,9,10,11,12,13],
    maxs:[36.04731,119.95358],
    mins:[34.96493,118.60232],
    out:'out',
    imgtype:'jpeg'
}


Google瓦片地图URL

http://mt2.google.cn/vt/lyrs=y&scale=2&hl=zh-CN&gl=cn&x=6891&y=3040&z=13 //含标注

http://mt2.google.cn/vt/lyrs=s&scale=2&hl=zh-CN&gl=cn&x=6891&y=3040&z=13 //无标注

http://mt2.google.cn/vt/lyrs=m&scale=2&hl=zh-CN&gl=cn&x={0}&y={1}&z={2}

http://mt2.google.cn/vt/lyrs=m&scale=2&hl=zh-CN&gl=cn&x=6891&y=3040&z=13

http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}

h 街道图 m 街道图 p 街道图 r 街道图 s 影像无标注 t 地形图 y 影像含标注


&hl=zh-CN&gl=cn 中国坐标地图,没有默认为无偏移地图

```

<br>

#### argis地图卫星瓦片
```
{
    url:'http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    zooms:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    maxs:[36.04731,119.95358],
    mins:[34.96493,118.60232],
    header:{
        'Host': 'services.arcgisonline.com',
        'Accept': '*/*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.152 Safari/537.22',
        'Accept-Language': 'en-us,en',
        'Accept-Charset': 'iso-8859-1,*,utf-8'
    },
    out:'out',
    imgtype:'jpeg'
}

```

<br>


#### 高德街道地图瓦片
> [参考瓦片路径](https://www.jianshu.com/p/e34f85029fd7)

```
{
    url:'http://webrd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8',
    zooms:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
    maxs:[36.04731,119.95358],
    mins:[34.96493,118.60232],
    header:{
    'accept': 'image/webp,*/*',
    'Referer': 'http://localhost:9527/#/exhibition-center/map-view',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.34 Safari/537.36 Edg/83.0.478.25'
    },
    out:'out',
    imgtype:'png'
}

```


