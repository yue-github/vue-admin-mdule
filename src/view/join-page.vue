<template>
  <div>
    吴同岳
    <div class="svg">
      <div id="mountNode1" style="width:40%;background:blue;margin-top:-15px"></div>
      <div id="mountNode2" style="width:40%;background:red;margin-left:-35px;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "join_page",
  data() {
    return {};
  },
  mounted() {
    var Shape = G2.Shape;
    // 自定义Shape 部分
    Shape.registerShape("point", "pointer", {
      drawShape: function drawShape(cfg, group) {
        var center = this.parsePoint({
          // 获取极坐标系下画布中心点
          x: 0,
          y: 0
        });
        // 绘制指针
        group.addShape("line", {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 5,
            lineCap: "round"
          }
        });
        return group.addShape("circle", {
          attrs: {
            x: center.x,
            y: center.y,
            r: 9.75,
            stroke: cfg.color,
            lineWidth: 4.5,
            fill: "#000"
          }
        });
      }
    });

    var data = [
      {
        value: 5.5
      }
    ];
    var chart = new G2.Chart({
      container: "mountNode1",
      forceFit: true,
      height: window.innerHeight * 0.3,
      padding: [0, 0, 30, 0]
    });
    chart.source(data);

    chart.coord("polar", {
      startAngle: (-9 / 8) * Math.PI,
      endAngle: (1 / 8) * Math.PI,
      radius: 0.75
    });
    chart.scale("value", {
      min: 0,
      max: 9,
      nice: false,
      ticks: [2.25, 3.75, 5.25, 6.75]
    });

    chart.axis("1", false);
    chart.axis("value", {
      zIndex: 2,
      line: null,
      label: {
        offset: -20,
        formatter: function formatter(val) {
          if (val === "2.25") {
            return "差";
          } else if (val === "3.75") {
            return "中";
          } else if (val === "5.25") {
            return "良";
          }

          return "优";
        },
        textStyle: {
          fontSize: 18,
          textAlign: "center"
        }
      },
      tickLine: null,
      grid: null
    });
    chart.legend(false);
    chart
      .point()
      .position("value*1")
      .shape("pointer")
      .color("#000")
      .active(true);

    // 绘制仪表盘刻度线
    chart.guide().line({
      start: [3, 0.905],
      end: [3.0035, 0.85],
      lineStyle: {
        stroke: "#000", // 线的颜色
        lineDash: null, // 虚线的设置
        lineWidth: 3
      }
    });
    chart.guide().line({
      start: [4.5, 0.905],
      end: [4.5, 0.85],
      lineStyle: {
        stroke: "#000", // 线的颜色
        lineDash: null, // 虚线的设置
        lineWidth: 3
      }
    });

    chart.guide().line({
      start: [6, 0.905],
      end: [6.0035, 0.85],
      lineStyle: {
        stroke: "green", // 线的颜色
        lineDash: null, // 虚线的设置
        lineWidth: 3
      }
    });

    // 绘制仪表盘背景
    chart.guide().arc({
      zIndex: 0,
      top: false,
      start: [0, 0.965],
      end: [9, 0.965],
      style: {
        // 底灰色
        stroke: "red",
        lineWidth: 18
      }
    });
    // 绘制指标
    chart.guide().arc({
      zIndex: 1,
      start: [0, 0.965],
      end: [data[0].value, 0.965],
      style: {
        stroke: "green",
        lineWidth: 20
      }
    });
    // 绘制指标数字
    chart.guide().html({
      position: ["50%", "95%"],
      html:
        '<div style="width: 300px;margin-top:20px;text-align:center">' +
        '<p style="font-size: 20px; color: #fff;margin: 0;">合格率</p>' +
        '<p style="font-size: 36px;color: #fff;margin: 0;">' +
        data[0].value * 10 +
        "%</p>" +
        "</div>"
    });

    chart.render();
    var Shape = G2.Shape;
    // 自定义Shape 部分
    Shape.registerShape("point", "pointer", {
      drawShape: function drawShape(cfg, group) {
        var center = this.parsePoint({
          // 获取极坐标系下画布中心点
          x: 0,
          y: 0
        });
        // 绘制指针
        group.addShape("line", {
          attrs: {
            x1: center.x,
            y1: center.y,
            x2: cfg.x,
            y2: cfg.y,
            stroke: cfg.color,
            lineWidth: 5,
            lineCap: "round"
          }
        });
        return group.addShape("circle", {
          attrs: {
            x: center.x,
            y: center.y,
            r: 9.75,
            stroke: cfg.color,
            lineWidth: 4.5,
            fill: "#fff"
          }
        });
      }
    });

    var data = [
      {
        value: 8
      }
    ];
    var chart = new G2.Chart({
      container: "mountNode2",
      forceFit: true,
      height: window.innerHeight * 0.3,
      width: window.innerWidth,
      padding: [0, 0, 30, 0]
    });
    chart.source(data);

    chart.coord("polar", {
      startAngle: (-9 / 8) * Math.PI,
      endAngle: (1 / 8) * Math.PI,
      radius: 0.75
    });
    chart.scale("value", {
      min: 0,
      max: 9,
      nice: false,
      ticks: [2.25, 3.75, 5.25, 6.75]
    });
    chart.axis("1", false);
    chart.axis("value", {
      zIndex: 2,
      line: null,
      label: {
        offset: -20,
        formatter: function formatter(val) {
          if (val === "2.25") {
            return "差";
          } else if (val === "3.75") {
            return "中";
          } else if (val === "5.25") {
            return "良";
          }

          return "优";
        },
        textStyle: function(val) {
          if (val === "2.25") {
            return {
              fontSize: 18,
              textAlign: "center",
              fill: "#fff"
            };
          } else if (val === "3.75") {
            return {
              fontSize: 18,
              textAlign: "center",
              fill: "blue"
            };
          } else if (val === "5.25") {
            return {
              fontSize: 18,
              textAlign: "center",
              fill: "black"
            };
          }

          return {
            fontSize: 18,
            textAlign: "center",
            fill: "green"
          };
        }
      },
      tickLine: null,
      grid: null
    });
    chart.legend(false);
    chart
      .point()
      .position("value*1")
      .shape("pointer")
      .color("#fff")
      .active(true);

    // 绘制仪表盘刻度线
    chart.guide().line({
      start: [3, 0.905],
      end: [3.0035, 0.85],
      lineStyle: {
        stroke: "#19AFFA", // 线的颜色
        lineDash: null, // 虚线的设置
        lineWidth: 3
      }
    });
    chart.guide().line({
      start: [4.5, 0.905],
      end: [4.5, 0.85],
      lineStyle: {
        stroke: "#19AFFA", // 线的颜色
        lineDash: null, // 虚线的设置
        lineWidth: 3
      }
    });

    chart.guide().line({
      start: [6, 0.905],
      end: [6.0035, 0.85],
      lineStyle: {
        stroke: "#19AFFA", // 线的颜色
        lineDash: null, // 虚线的设置
        lineWidth: 3
      }
    });

    // 绘制仪表盘背景
    chart.guide().arc({
      zIndex: 0,
      top: false,
      start: [0, 0.965],
      end: [9, 0.965],
      style: {
        // 底灰色
        stroke: "#CBCBCB",
        lineWidth: 18
      }
    });
    // 绘制指标
    chart.guide().arc({
      zIndex: 1,
      start: [0, 0.965],
      end: [data[0].value, 0.965],
      style: {
        stroke: "#1890FF",
        lineWidth: 20
      }
    });
    // 绘制指标数字
    chart.guide().html({
      position: ["50%", "95%"],
      html:function(val){
        console.log(val)
        if (val.value.values[0] == 6){
        return '<div style="width: 300px;margin-top:20px;text-align:center">' +
        '<p style="font-size: 20px; color: #545454;margin: 0;">合格率</p>' +
        '<p style="font-size: 36px;color: blue;margin: 0;">' +
        data[0].value * 10 +
        "%</p>" +
        "</div>"}
        else {
        return '<div style="width: 300px;margin-top:20px;text-align:center">' +
        '<p style="font-size: 20px; color: #545454;margin: 0;">合格率</p>' +
        '<p style="font-size: 36px;color: green;margin: 0;">' +
        data[0].value * 10 +
        "%</p>" +
        "</div>"
        }
      }
        
    });
    chart.render();
  }
};
</script>
<style>
.svg {
  width: 800px;
  background: #28ff28;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 200px;
  overflow:hidden;
}
.g2-guide-html {
  width: 80px;
  height: 80px;
  vertical-align: middle;
  text-align: center;
  line-height: 0.4;
}

.g2-guide-html .title {
  font-size: 14px;
  color: #fff;
  font-weight: 300;
}

.g2-guide-html .value {
  font-size: 24px;
  color: #000;
  font-weight: bold;
}
</style>
