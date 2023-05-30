<template>
  <div class="map-wrap">
    <div id="container"></div>
    <div class="total-info">共<count-to :start-val="0" :end-val="mapData.length" :duration="5000" class="card-panel-num" />台</div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
import CountTo from 'vue-count-to'

const points = [{
  icon: 'http://deapi.yaoant.com/images/temp/qichediao_3.png',
  lnglat: ['116.205467', '39.907761'],
  lable: '吊机-ZX260LCH',
  driver: '黎香桃',
  phone: '15727078961'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/wajueji_3.png',
  lnglat: ['116.368904', '39.913423'],
  lable: '挖掘机-SY19068632767',
  driver: '段柯拉',
  phone: '15704745649'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/wajueji_3.png',
  lnglat: ['116.368806', '39.913425'],
  lable: '挖掘机-SY19068637321',
  driver: '史梦桐',
  phone: '15723001334'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/zhuangzaiji_3.png',
  lnglat: ['116.305467', '39.807761'],
  lable: '装载机-SEM65316895',
  driver: '孔玮琪',
  phone: '15756672099'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/wajueji_3.png',
  lnglat: ['116.57852365004', '39.86439249713'],
  lable: '挖掘机-SY19068632767',
  driver: '萧婉容',
  phone: '13492408978'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/zhuangzaiji_3.png',
  lnglat: ['116.693105656835', '39.897603701752'],
  lable: '装载机-SEM65316326',
  driver: '苏洋洋',
  phone: '13403708193'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/zhuangzaiji_3.png',
  lnglat: ['114.271942', '30.601031'],
  lable: '装载机-SEM65316010',
  driver: '晏千城',
  phone: '13416821267'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/wajueji_3.png',
  lnglat: ['114.28767', '30.595712'],
  lable: '挖掘机-SY1906866432',
  driver: '谢伶伶',
  phone: '13418951033'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/zhuangzaiji_3.png',
  lnglat: ['114.274409', '30.588083'],
  lable: '装载机-SEM65316523',
  driver: '张回响',
  phone: '13477525555'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/zhuangzaiji_3.png',
  lnglat: ['114.474785', '22.611424'],
  lable: '装载机-SEM65316325',
  driver: '王怀亦',
  phone: '13423413277'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/wajueji_3.png',
  lnglat: ['114.206306', '22.579093'],
  lable: '挖掘机-SY19068632486',
  driver: '温思义',
  phone: '13407384610'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/zhuangzaiji_3.png',
  lnglat: ['92.419044', '30.471117'],
  lable: '装载机-SEM6531606332',
  driver: '林栋',
  phone: '15771393316'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/wajueji_3.png',
  lnglat: ['87.497169', '38.568525'],
  lable: '挖掘机-SY19068636273',
  driver: '张三',
  phone: '13437176281'
}, {
  icon: 'http://deapi.yaoant.com/images/temp/zhuangzaiji_3.png',
  lnglat: ['89.826271', '43.5037'],
  lable: '装载机-SEM653160383',
  driver: '胡恬雅',
  phone: '15739673631'
}]

window._AMapSecurityConfig = {
  securityJsCode: '您的安全密钥'
}

export default {
  name: 'MapContainer',
  components: {
    CountTo
  },
  data () {
    return {
      mapData: []
    }
  },
  mounted () {
    // DOM初始化完成进行地图初始化
    this.initMap()
  },
  methods: {
    initMap () {
      AMapLoader.load({
        key: '开发者的key', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [
          'AMap.ToolBar', // 地图工具条
          'AMap.MoveAnimation',
          'AMap.InfoWindow',
          'AMap.MarkerClusterer'
        ] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        var map = new AMap.Map('container', // 设置地图容器id
          {
            resizeEnable: true,
            viewMode: '3D', // 是否为3D地图模式
            pitch: 30,
            zoom: 5, // 初始化地图级别
            showIndoorMap: true,
            zoomEnable: true
            // center: [116.397428, 39.90923] // 初始化地图中心点位置
          }
        )
        // 在图面添加工具条控件, 工具条控件只有缩放功能
        map.addControl(new AMap.ToolBar())
        this.mapData = points

        var cluster = null
        const gridSize = 60

        // 构建自定义信息窗体
        function createInfoWindow (title, content) {
          var info = document.createElement('div')
          info.className = 'custom-content-window-card'

          // 可以通过下面的方式修改自定义窗体的宽高
          info.style.width = '200px'
          // 定义顶部标题
          var top = document.createElement('div')
          var titleD = document.createElement('div')
          var closeX = document.createElement('img')
          top.className = 'info-top'
          titleD.innerHTML = title
          closeX.src = 'https://webapi.amap.com/images/close2.gif'
          closeX.onclick = closeInfoWindow

          top.appendChild(titleD)
          top.appendChild(closeX)
          info.appendChild(top)

          // 定义中部内容
          var middle = document.createElement('div')
          middle.className = 'info-middle'
          middle.style.backgroundColor = 'white'
          middle.innerHTML = content
          info.appendChild(middle)

          // 定义底部内容
          var bottom = document.createElement('div')
          bottom.className = 'info-bottom'
          bottom.style.position = 'relative'
          bottom.style.top = '0px'
          bottom.style.margin = '0 auto'
          var sharp = document.createElement('img')
          sharp.src = 'https://webapi.amap.com/images/sharp.png'
          bottom.appendChild(sharp)
          info.appendChild(bottom)
          return info
        }

        // 关闭信息窗体
        function closeInfoWindow () {
          map.clearInfoWindow()
        }

        var _renderClusterMarker = function (context) {
          const count = points.length
          var factor = Math.pow(context.count / count, 1 / 18)
          var div = document.createElement('div')
          var Hue = 180 - factor * 180
          var bgColor = 'hsla(' + Hue + ',100%,40%,0.7)'
          var fontColor = 'hsla(' + Hue + ',100%,90%,1)'
          var borderColor = 'hsla(' + Hue + ',100%,40%,1)'
          var shadowColor = 'hsla(' + Hue + ',100%,90%,1)'
          div.style.backgroundColor = bgColor
          var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
          div.style.width = div.style.height = size + 'px'
          div.style.border = 'solid 1px ' + borderColor
          div.style.borderRadius = size / 2 + 'px'
          div.style.boxShadow = '0 0 5px ' + shadowColor
          div.innerHTML = context.count
          div.style.lineHeight = size + 'px'
          div.style.color = fontColor
          div.style.fontSize = '14px'
          div.style.textAlign = 'center'
          context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
          context.marker.setContent(div)
        }
        var _renderMarker = function (context) {
          const dataItem = context.data && context.data[0]
          var offset = new AMap.Pixel(-9, -9)
          const tempIconObj = new AMap.Icon({
            image: dataItem.icon,
            size: new AMap.Size(36, 36), // 图标大小
            imageSize: new AMap.Size(36, 36)
          })

          context.marker.setIcon(tempIconObj)
          context.marker.setOffset(offset)
          var content = []
          content.push(`司机：${dataItem.driver}`)
          const tempPhone = dataItem.phone ? `<a href="tel:${dataItem.phone}">${dataItem.phone}</a>` : ''
          content.push(`电话：${tempPhone}`)
          content.push(`状态：离线`)
          // content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>")
          var infoWindow = new AMap.InfoWindow({
            isCustom: true, // 使用自定义窗体
            content: createInfoWindow(dataItem.lable, content.join('<br/>')),
            offset: new AMap.Pixel(16, -45)
          })
          context.marker.on('click', function () {
            infoWindow.open(map, context.marker.getPosition())
          })
        }
        var addCluster = function () {
          if (cluster) {
            cluster.setMap(null)
          }
          // 完全自定义
          cluster = new AMap.MarkerCluster(map, points, {
            gridSize: gridSize, // 设置网格像素大小
            renderClusterMarker: _renderClusterMarker, // 自定义聚合点样式
            renderMarker: _renderMarker // 自定义非聚合点样式
          })
          cluster.on('click', (item) => {
            let alllng = 0
            let alllat = 0
            for (const mo of item.clusterData) {
              alllng += mo.lnglat.lng
              alllat += mo.lnglat.lat
            }
            const lat = alllat / item.clusterData.length
            const lng = alllng / item.clusterData.length
            // 这里是放大地图，此处写死了每次点击放大的级别，可以根据点的数量和当前大小适应放大，体验更佳
            map.setZoomAndCenter(map.getZoom() + 2, [lng, lat])
          })
        }

        addCluster(2)

        map.setFitView()
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: auto;
  bottom: auto;
  display: block;
}
.total-info {
  position: fixed;
  padding: 0.2rem 0.3rem;
  border-radius: 4px;
  bottom: 20px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 3px rgba(0,0,0,.5);
  font-size: 0.8rem;
  font-weight: 300;
  line-height: normal;
}
</style>
<style>
.custom-content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  width: auto;
  padding: 0;
  font-size: 0.5rem;
  text-align: left;
  border: solid 1px silver;
}

.custom-content-window-card .info-top {
  position: relative;
  background: none repeat scroll 0 0 #F9F9F9;
  border-bottom: 1px solid #CCC;
  border-radius: 5px 5px 0 0;
}

.custom-content-window-card .info-top div {
  display: inline-block;
  color: #333333;
  font-size: .6rem;
  font-weight: bold;
  line-height: 31px;
  padding: 0 5px;
}

.custom-content-window-card .info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

.custom-content-window-card .info-middle {
  padding: 3px 5px;
  line-height: 15px;
  font-size: .6rem;
}

.custom-content-window-card .info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

.custom-content-window-card .info-bottom img {
  position: relative;
  z-index: 104;
}
</style>
