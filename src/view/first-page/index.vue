<template>
	<div id="container" tabindex="0"></div>
</template>

<script>
export default {
  name: 'first-page',
  data () {
    return {
      tab: [],
      company_info: ''
    }
  },
  methods: {
    getData () {
      let data = {

      }
      this.$post('login', {
        username: '1142327164@qq.com',
        password: 'hlm.0427.'
      })
        .then(res => {
          console.log(res)
          localStorage.accessToken = res.data.result.access_token
          this.$post('mobile_org_info/businessEquipmentList', data).then(res => {
            console.log(res)
            this.tab = res.data.result
            // console.log(this.tab)
            this.map(this.tab)
            // this.get()
          })
        })
    },

    map (tab) {
      let me = this
      var map = new AMap.Map('container', {
        resizeEnable: true,
        mapStyle: 'amap://styles/grey',
        center: [113.38, 22.52],
        zoom: 10
      })
      // console.log(map)
      AMap.plugin('AMap.ToolBar', function () {
        var toolbar = new AMap.ToolBar()
        map.addControl(toolbar)
      })

      var cluster, markers = []
      console.log(tab)
			    // 创建一个 icon
      var red = new AMap.Icon({
        size: new AMap.Size(26, 26),
        image: 'http://data-visualization.bayou-tech.cn/images/red.png',
        imageSize: new AMap.Size(25, 25)
      })
      var yellow = new AMap.Icon({
        size: new AMap.Size(26, 26),
        image: 'http://data-visualization.bayou-tech.cn/images/yellow.png',
        imageSize: new AMap.Size(25, 25)
      })
      var green = new AMap.Icon({
        size: new AMap.Size(26, 26),
        image: 'http://data-visualization.bayou-tech.cn/images/green.png',
        imageSize: new AMap.Size(25, 25)
      })
      for (let a of tab) {
        for (let b of a.DeviceInfoList) {
          let x = b.Longitude
          let y = b.Latitude
          let name = b.DeviceName
          let id = a.OrgId
          var marker
          if (b.OnlineDesc == '离线') {
            marker = new AMap.Marker({
              icon: red,
              position: new AMap.LngLat(x, y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
              title: name,
              id: id
            })
          } else {
            if (b.RunDesc == '运行') {
              marker = new AMap.Marker({
                icon: green,
                position: new AMap.LngLat(x, y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: name,
                id: id
              })
            } else {
              marker = new AMap.Marker({
                icon: yellow,
                position: new AMap.LngLat(x, y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: name,
                id: id
              })
            }
          }

          markers.push(marker)
        }
      }
      var count = markers.length
      var _renderClusterMarker = function (context) {
        var factor = Math.pow(context.count / count, 1 / 18)
        var div = document.createElement('div')
        var Hue = 180 - factor * 180
        // var bgColor = 'red';
        var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)'
        var fontColor = 'hsla(' + Hue + ',100%,20%,1)'
        var borderColor = 'hsla(' + Hue + ',100%,40%,1)'
        var shadowColor = 'hsla(' + Hue + ',100%,50%,1)'
        div.style.backgroundColor = bgColor
        var size = Math.round(30 + Math.pow(context.count / count, 1 / 5) * 20)
        div.style.width = div.style.height = size + 'px'
        div.style.border = 'solid 1px ' + borderColor
        div.style.borderRadius = size / 2 + 'px'
        div.style.boxShadow = '0 0 1px ' + shadowColor
        div.innerHTML = context.count
        div.style.lineHeight = size + 'px'
        div.style.color = fontColor
        div.style.fontSize = '14px'
        div.style.textAlign = 'center'
        context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
        context.marker.setContent(div)
      }

      if (cluster) {
        cluster.setMap(null)
      }
		    cluster = new AMap.MarkerClusterer(map, markers, {
        gridSize: 80,
        renderClusterMarker: _renderClusterMarker
      })

      for (let a of markers) {
        // a.on('click', showInfoM);
        AMap.event.addListener(a, 'click', function () {
          console.log(a.Je.id)
          let data = {
            incId: a.Je.id
          }
          me.$post('mobile_org_info/getincorginfo', data).then(res => {
            console.log(res)

            // 实例化信息窗体
            var title = res.data.result.Name,
              content = [],
              equipment = [],
              number = []
            content.push("<div class='time'>数据更新时间：" + res.data.result.ApproveDate + '</div>')
            content.push("<div class='info'><div class='status'>" + res.data.result.status + "</div><div class='status'>" + res.data.result.deviceCount + '</div></div>')
            content.push("<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>")
            equipment.push(res.data.result.status)
            number.push(res.data.result.deviceCount)
            var infoWindow = new AMap.InfoWindow({
              isCustom: true, // 使用自定义窗体
              content: createInfoWindow(title, content.join('<br/>')),
              offset: new AMap.Pixel(16, -45)
            })
            infoWindow.open(map, a.getPosition())
          })
        })
      }

      // 构建自定义信息窗体
      function createInfoWindow (title, content) {
        var info = document.createElement('div')
        info.className = 'custom-info input-card content-window-card'

        // 可以通过下面的方式修改自定义窗体的宽高
        // info.style.width = "400px";
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
    }

  },
  mounted () {
    this.getData()
  }
}
</script>

<style>
#container{
	width: 100%;
	height: 600px;
	margin: 0px
}
.content-window-card {
	position: relative;
	box-shadow: none;
	bottom: 0;
	left: 0;
	width: auto;
	padding: 0;
}

.content-window-card p {
	height: 2rem;
}

div.info-top {
	position: relative;
	background: none repeat scroll 0 0 #F9F9F9;
	border-bottom: 1px solid #CCC;
	/* border-radius: 5px 5px 0 0; */
}

div.info-top div {
	display: inline-block;
	color: #333333;
	font-size: 14px;
	font-weight: bold;
	line-height: 31px;
	padding: 0 10px;
}

div.info-top img {
	position: absolute;
	top: 10px;
	right: 10px;
	transition-duration: 0.25s;
}

div.info-top img:hover {
	box-shadow: 0px 0px 5px #000;
}

div.info-middle {
	font-size: 12px;
	padding: 10px 20px;
	line-height: 20px;
}

div.info-bottom {
	height: 0px;
	width: 100%;
	clear: both;
	text-align: center;
}

div.info-bottom img {
	position: relative;
	z-index: 104;
}

span {
	margin-left: 5px;
	font-size: 11px;
}

.info-middle img {
	float: left;
	margin-right: 6px;
}
.info{
	display: flex;
	align-items: center;
	justify-content: space-around;
	/* margin-top:10px; */
}
.status{
	height: 50px;
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #cecece;
	border-radius: 100%;
}
.time{
	font-size:14px;
}
</style>
