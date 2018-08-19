

$(function(){
//echarts 左
var myChart = echarts.init(document.getElementById('echarts_l'));
// console.log(mychart);
var option = {
  title: {
    text: '2017年注册人数'
  },
  legend: {
    data : ['人数']
  },
  tooltip : {},
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      name: '人数',
      data: [1000, 1500, 1800, 1200, 1000, 500],
      type: 'bar'
  }]
  }
  myChart.setOption(option);

//echarts 右
var myChart2 = echarts.init(document.getElementById('echarts_r'));
// console.log(mychart);
var option2 = {
  title : {
    text: '热门品牌销售',
    subtext: '2017年6月',
    x:'center'
},
tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
},
legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克','阿迪','新百伦','李宁','阿迪王']
},
series : [
    {
        name: '品牌',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
            {value:335, name:'耐克'},
            {value:310, name:'阿迪'},
            {value:234, name:'新百伦'},
            {value:135, name:'李宁'},
            {value:1548, name:'阿迪王'}
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }
]
  }
  myChart2.setOption(option2);
});