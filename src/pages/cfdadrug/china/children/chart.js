import echarts from 'echarts'
import Vue from 'vue'

/**
  * 折线图
 * @param {HTMLDivElement} el echart容器
*
 export const initLine = (el,yAxisData,seriesData,openDialog,Vc)=>{
 let chart = echarts.init(el , 'yaozh_t heme')    
    chart.setOption({
      toolbox: {
          right: '20',
            show: true,
            feature: {
              saveAsImage: {
                  title: "保存",
                    name: Vc.getImgName(),
                    icon: "image:///static/imgs/echarts/download.png"
              },    
                myToggleLine:{
                 show: true, 
                    title: "柱状图",
                    icon: "image:///static/imgs/echarts/bar.png",
                    onclick() {
                      Vc.changeType('bars')
               }       
          },        
                 myMagnify: !Vc.isOpen?{
                 show: true,  
                    title: "全屏",
                    icon: "image:///static/imgs/echarts/fullscreen.png",
                    onclick() {
                      openDialog(Vc.eIndex)
          }            
                }:  {}
               }  
       },   
        dataZoom: Vc.title==='上市趋势' ? {
             type: 'inside ', 
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
      } :   '',
      l egend: {
          show: true,
            bottom: 0,
            data: ['进口','国产','上市数量',]
     },        
        tooltip: {
          trigger: 'axis',
            position: "right"
       },   
        grid: {
          containLabel: true
      },    
        xAxis: {
          data: yAxisData
      },    
        yAxis: {
         type: 'value'
      }     ,
        series: [
         {{
                type: "line",
                connectNulls: true,
                data: seriesData[2]
    },          
            {
              name: "国产",
                type: "line",
                connectNulls: true,
                data: seriesData[1]
              },
             {
              name: "上市数量",
                type: "line",
                connectNulls: true,
                data: seriesData[0]
        }      
        ]  
     }) ;
    return chart
 }  

/**
  * 多柱状图
 * @param {HTMLDivElement} el echart容器
*
 export const initBars = (el,yAxisData,seriesData,changeType,openDialog,Vc)=>{
  let chart = echarts.init(e l, 'yaozh_ theme')     
    chart.setOption({
      tooltip: {
          position: (point, params, dom, rect, size) => {
              return Vue.prototype.echartsTooltipPositionX(point, params, dom, rect, size)
              },
            trigger: "axis"
         }, 
        legend: {
          show: true,
            bottom: 0,
            data: ['进口','国产','上市数量',]
     },        
        dataZoom: Vc.title==='上市趋势' ? {
          type: 'inside',  
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: 100,
    } :     '',
          toolbox: {
          right: '20',
            feature: {
              saveAsImage: {
                  title: "保存",
                    name: Vc.getImgName(),
                    icon: "image:///static/imgs/echarts/download.png"
        },          
                myToggleLine:{
                  show: true, 
                    title: "线状图",
                    icon: "image:///static/imgs/echarts/check.png",
                    onclick() {
                      changeType('line')
          }            
        },          
                myMagnify: !Vc.isOpen?{
                  show: true,  
                    title: "全屏",
                    icon: "image:///static/imgs/echarts/fullscreen.png",
                    onclick() {
                      openDialog(Vc.eIndex)
          }            
        }:          {}
      }          
    },      
        grid: {
          containLabel: true
    },      
        yAxis: [
          {{
            
    ],  ],
          type: 'category',
            data: yAxisData,
            axisLabel:{
              show:tru e,
                inter val:0
      },         
            axisTick:{
              show:tr ue,
                inter val:0
      }         
    },      
        series: [
          {{
                type: "bar",
                stack: '总量',
                z:10,
                la bel: {
                 show: true,
                    position: 'inside',
                    distance: 0,
                    fontSize: 12,
                    padding: [0, 0, 0, 0],
                    borderRadius: 100
                  },
                 data: seriesData[2]
              },
            {
             name: "国产",
                type: "bar",
                stack: '总量',
                z:9,
                la bel: {
                  show: true,
                    position: 'inside',
                    distance: 0,
                    fontSize: 12,
                    padding: [10, 0, 50, 0],
                    borderRadius: 100
                  },
                data: seriesData[1]
              },
             {
             name: "上市数量",
                type: "bar",
                stack: '总量',
                label: {
                  show: true,
                    position: 'inside',
                    distance: 0,
                    fontSize: 12,
                    padding: [0, 0, 70, 0],
                    borderRadius: 100
             },     
                z:8,
                da ta: seriesData[0]
           },   
            ]
  })    ;
    return chart
 }  

/**
 * 实心圆
 * @param {HTMLDivElement} el echart容器
 */
export const initPie = (el, legendData, seriesData, changeType, openDialog, Vc) => {
        if (seriesData.length > 10) {
            seriesData = windo w._.cloneDeep(seriesData).reverse()
            let seriesDataContainer = seriesData.slice(0, 10)
            let other = 0
            seriesData.forEach((item, i) => {
                if (i > 9) {
                    ot h er += Number(item.value)
                }
            })
            seriesDataContainer.push({ name: '其他', value: other })
            seriesData = seriesDataConta iner.sort((a, b) = > a.va lue - b.value)
            legendData = []
            seriesData.forEach(item => {
                legendData.push(item.na me)
            })
        }
        let chart = echarts.init(el, 'yaozh_theme')
        chart.setOption({
            legend: {
                type: "scroll",
                bottom: 0,
                data: legendData
            },
            toolbox: {
                right: '20',
                feature: {
                    myToggleMapt: !Vc.mapCheckLock && Vc.type === 'map' ? {
                        show: true,
                        title: "切换",
                        icon: "image:///static/imgs/echarts/check.png",
                        onclick() {
                            Vc.changeMapType()
                        }
                    } : {},
                    s a veAsImage: {
                        title: "保存",
                        name: Vc.getImgName(),
                        icon: "image:///static/imgs/echarts/download.png"
                    },
                    myToggleBar: {
                        show: true,
                        title: "柱形图",
                        icon: "image:///static/imgs/echarts/bar.png",
                        onclick() {
                            changeType('bar')
                        }
                    },
                    myToggleMap: Vc.type === 'map' ? {
                        show: true,
                        title: "地图",
                        icon: "image:///static/imgs/echarts/map.png",
                        onclick() {
                            changeType('map')
                        }
                    } : {},
                    m y Magnify: !Vc.isOpen ? {
                        show: true,
                        title: "全屏",
                        icon: "image:///static/imgs/echarts/fullscreen.png",
                        onclick() {
                            openDialog(Vc.eIndex)
                        }
                    } : {}
                }
            },
            tooltip: {
                trigger: "item",
                formatter: "{b}<br/>数量：{c}<br/>占比：{d}%"
            },
            series: [{
            {
                startAngle: 180,
                label: {
                    normal: {
                        show: true,
                        position: "outside",
                        formatter: "{b}{d}%"
                    }
                },
                data: seriesData
            }]]
        }) return chart
    }
    /**
     * 空心图
     * @param {HTMLDivElement} el echart容器
     */
export const initCircle = (el, legendData, seriesData, changeType, openDialog, Vc) => {
        if (seriesData.length > 10) {
            seriesData = windo w._.cloneDeep(seriesData).reverse()
            let seriesDataContainer = seriesData.slice(0, 10)
            let other = 0
            seriesData.forEach((item, i) => {
                if (i > 9) {
                    ot h er += Number(item.value)
                }
            })
            seriesDataContainer.push({ name: '其他', value: other })
            seriesData = seriesDataConta iner.sort((a, b) = > a.va lue - b.value)
            legendData = []
            seriesData.forEach(item => {
                legendData.push(item.na me)
            })
        }
        let chart = echarts.init(el, 'yaozh_theme')
        chart.setOption({
                    legend: {
                        type: "scroll",
                        bottom: 0,
                        data: legendData
                    },
                    toolbox: {
                        right: '20',
                        feature: {
                            saveAsImage: {
                                title: "保存",
                                name: Vc.getImgName(),
                                icon: "image:///static/imgs/echarts/download.png"
                            },
                            myToggleBar: {
                                show: true,
                                title: "柱形图",
                                icon: "image:///static/imgs/echarts/bar.png",
                                onclick() {
                                    changeType('bar')
                                }
                            },
                            myToggleMap: Vc.type === 'map' ? {
                                show: true,
                                title: "地图",
                                icon: "image:///static/imgs/echarts/map.png",
                                onclick() {
                                    changeType('map')
                                }
                            } : {},
                            m y Magnify: !Vc.isOpen ? {
                                show: true,
                                title: "全屏",
                                icon: "image:///static/imgs/echarts/fullscreen.png",
                                onclick() {
                                    openDialog(Vc.eIndex)
                                }
                            } : {}
                        }
                    },
                    tooltip: {
                        trigger: "item",
                        formatter: "{b}<br/>数量：{c}<br/>占比：{d}%"
                    },
                    series: [{
                        {
                            radius: ["40%", "75%"],
                            label: {
                                normal: {
                                    show: true,
                                    position: "outside",
                                    formatter: "{b}{d}%"
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: seriesData
                        }]
                    };
                    return chart
                }

                /**
                  * 柱状图
                 * @param {HTMLDivElement} el echart容器
                *
                 export const initBar = (el,yAxisData,seriesData,changeType,openDialog,Vc)=>{
                  let chart = echarts.init( el, 'yaozh _theme')     
                    chart.setOption({
                      tooltip: {
                          position: (point, params, dom, rect, size) => {
                              return Vue.prototype.echartsTooltipPositionX(point, params, dom, rect, size)
                      },        
                            trigger: "item",
                            formatter: "{b}<br />数量: {c}"
                    },      
                        toolbox: {
                          right: '20',
                            feature: {
                              myToggleMapt: !Vc.mapCheckLock&&Vc.type==='map'?{
                                  show: true,      
                                    title: "切换",
                                    icon: "image:///static/imgs/echarts/check.png",
                                    onclick() {
                                      Vc.changeMapType()
                          }            
                        }:          {},
                                s a veAsImage: {
                                  title: "保存",
                                    name: Vc.getImgName(),
                                    icon: "image:///static/imgs/echarts/download.png"
                        },          
                                myTogglePie: Vc.seriesDataMap.length>0 ?{
                                  show: true,   
                                    title: "饼形图",
                                    icon: "image:///static/imgs/echarts/pie.png",
                                    onclick() {
                                      changeType('pie')
                          }            
                        }:          {},
                                m y ToggleMap: Vc.type==='map' ?{
                                  show: true,   
                                    title: "地图",
                                    icon: "image:///static/imgs/echarts/map.png",
                                    onclick() {
                                      changeType('map')
                          }            
                        }:          {},
                                m y Magnify: !Vc.isOpen?{
                                  show: true,  
                                    title: "全屏",
                                    icon: "image:///static/imgs/echarts/fullscreen.png",
                                    onclick() {
                                      openDialog(Vc.eIndex)
                          }            
                        }:          {}
                      }          
                    },      
                        grid: {
                          containLabel: true
                    },      
                        yAxis: {
                          type: "category",
                            axisLabel: {
                              formatter: function(value) {
                                  if (value.length > 12) {
                                      return value.substring(0, 12) + "...";
                          }             else {
                                      return value;
                          }            
                        }          
                      },        
                            data: yAxisData.length>11?yAxisData.slice(-11):yAxisData
                    },            
                        xAxis: {
                          type: "value",
                            name: "数量"
                    },      
                        series: [
                          {{
                            type: "bar",      
                            label: {
                              show: true,
                                position: 'right'
                        }      
                      }    
                  })    };
                    return chart
                 }  

                /**
                  * 地图
                 * @param {HTMLDivElement} el echart容器
                 * @param {Object} Vc chart组件
                *
                 export const initMap = (el,seriesData,changeType,openDialog,Vc)=>{
                  let chart = echarts.init( el, 'yaozh_ theme')    
                    chart.setOption({
                      toolbox: {
                          right: '20',
                            feature: {
                              myToggleMapt: !Vc.mapCheckLock?{
                                  show: true,  
                                    title: "切换",
                                    icon: "image:///static/imgs/echarts/check.png",
                                    onclick() {
                                      Vc.changeMapType()
                          }            
                        }:          {},
                                s a veAsImage: {
                                  title: "保存",
                                    name: Vc.getImgName(),
                                    icon: "image:///static/imgs/echarts/download.png"
                        },          
                                myToggleBar: {
                                  show: true,
                                    title: "柱形图",
                                    icon: "image:///static/imgs/echarts/bar.png",
                                    onclick() {
                                      changeType('bar')
                          }            
                        },          
                                myTogglePie: {
                                  show: true,
                                    title: "饼形图",
                                    icon: "image:///static/imgs/echarts/pie.png",
                                    onclick() {
                                      changeType('pie')
                          }            
                        },          
                                myMagnify: !Vc.isOpen?{
                                  show: true,  
                                    title: "全屏",
                                    icon: "image:///static/imgs/echarts/fullscreen.png",
                                    onclick() {
                                      openDialog(Vc.eIndex)
                          }            
                        }:          {}
                      }          
                    },      
                        tooltip: {
                          trigger: "item",
                            formatter(param){
                              if(Vc.mapType= =='world'){
                                   return `   
                                    国家：${param.name}<br/>
                          类型：${param.name==='中国'?'国产':'进口'}<br/>
                          数量：${param.value?param.value:0}
                          `
                        }else{
                                   ret urn `
                                      ${param.name}<br/>
                            数量：${param.value?param.value:0}
                          `
                        }
                      }        
                    },      
                        visualMap: {
                          min: 0,
                            max: seriesData[seriesData.length-1].value,
                            left: "left",  
                            top: "bottom",
                            text: ["高", "低"], // 文本，默认为数值文本
                            inRange:{
                              color: ['rgba(204,231,255,1)','rgba(58,161,255,1)'],
                      },          
                            calculable: true,
                    },      
                        series: [
                          {{
                            type: "map",
                            mapType: Vc.mapType,
                            label: {
                              normal: {
                                  show: false
                          },        
                                emphasis: {
                                  show: true
                          }        
                        },      
                            nameMap:{
                              'Singa pore Rep.':'新加坡',
                                'Dominican Rep.': '多米尼加',
                                'Palestine':'巴勒斯坦 ',
                                'Bahamas':'巴 哈马',
                                'Timor-Les te':'东帝汶',
                         '      Afghanistan':' 阿富汗',
                                'Guinea-Bissau ':'几内亚比绍',
                                "Côte d'Ivoire": '科特迪瓦',
                                'Siachen Glacier ':'锡亚琴冰川',
                                "Br. Indian Ocean  Ter.":'英属印度洋领土',
                                'Angola':'安哥拉', 
                                'Albania' :'阿尔巴尼亚',
                                'United Ar ab Emirates':'阿联酋',
                                'Argentina':'阿根廷', 
                                'Armenia':'亚 美尼亚',
                                'French So uthern and Antarctic Lands':'法属南半球和南极领地',
                                'Australia':'澳大利亚', 
                                'Austria':'奥 地利',
                                'Azerbaija n':'阿塞拜疆',
                                'Burundi':'布隆 迪',
                                'Belgium': '比利时',
                                'Benin':'贝 宁',
                                'Burkina  Faso':'布基纳法索',
                                'Bangladesh':'孟 加拉国',
                                'Bulgaria':'保 加利亚',
                                'The Bahama s':'巴哈马',
                                'Bosnia and He rz.':'波斯尼亚和黑塞哥维那',
                                'Belarus':'白俄罗斯', 
                                'Belize':' 伯利兹',
                                'Bermuda' :'百慕大',
                                'Bolivia': '玻利维亚',
                                'Brazil':' 巴西',
                                'Brunei': '文莱',
                                'Bhutan': '不丹',
                                'Botswana ':'博茨瓦纳',
                                'Central Af rican Rep.':'中非',
                                'Canada':'加拿大', 
                                'Switzerl and':'瑞士',
                                'Chile':'智利', 
                                'China': '中国',
                                'Ivory C oast':'象牙海岸',
                                'Cameroon':'喀麦 隆',
                                'Dem. Rep.  Congo':'刚果民主共和国',
                                'Congo':'刚果', 
                                'Colombi a':'哥伦比亚',
                                'Costa Rica ':'哥斯达黎加',
                                'Cuba':'古巴', 
                                'N. Cyp rus':'北塞浦路斯',
                                'Cyprus':'塞浦 路斯',
                                'Czech Re p.':'捷克',
                                'Germany':'德国 ',
                                'Djibouti' :'吉布提',
                                'Denmark':' 丹麦',
                                'Algeria': '阿尔及利亚',
                                'Ecuador': '厄瓜多尔',
                                'Egypt':'埃 及',
                                'Eritrea ':'厄立特里亚',
                                'Spain':'西 班牙',
                                'Estonia ':'爱沙尼亚',
                                'Ethiopia' :'埃塞俄比亚',
                                'Finland':' 芬兰',
                                'Fiji':'斐' ,
                                'Falkla nd Islands':'福克兰群岛',
                                'France':'法国', 
                                'Gabon':' 加蓬',
                                'United  Kingdom':'英国',
                                'Georgia':'格鲁吉亚', 
                                'Ghana':'加 纳',
                                'Guinea' :'几内亚',
                                'Gambia': '冈比亚',
                                'Guinea B issau':'几内亚比绍',
                                'Eq. Guinea':'赤道 几内亚',
                                'Greece':'希腊' ,
                                'Greenlan d':'格陵兰',
                                'Guatemala': '危地马拉',
                                'French Guia na':'法属圭亚那',
                                'Guyana':'圭亚那', 
                                'Honduras ':'洪都拉斯',
                                'Croatia':' 克罗地亚',
                                'Haiti':'海 地',
                                'Hungary ':'匈牙利',
                                'Indonesia ':'印度尼西亚',
                                'India':'印度' ,
                                'Ireland ':'爱尔兰',
                                'Iran':'伊朗 ',
                                'Iraq': '伊拉克',
                                'Icelan d':'冰岛',
                                'Israel':' 以色列',
                                'Italy':' 意大利',
                                'Jamaica ':'牙买加',
                                'Jordan':' 约旦',
                                'Japan':' 日本',
                                'Kazakhs tan':'哈萨克斯坦',
                                'Kenya':'肯尼亚' ,
                                'Kyrgyzs tan':'吉尔吉斯斯坦',
                                'Cambodia':'柬 埔寨',
                                'Korea':'韩国 ',
                                'Kosovo' :'科索沃',
                                'Kuwait': '科威特',
                                'Lao PDR' :'老挝',
                                'Lebanon': '黎巴嫩',
                                'Liberia': '利比里亚',
                                'Libya':'利 比亚',
                                'Sri Lan ka':'斯里兰卡',
                                'Lesotho':'莱 索托',
                                'Lithuania ':'立陶宛',
                                'Luxembourg' :'卢森堡',
                                'Latvia':'拉脱维 亚',
                                'Morocco' :'摩洛哥',
                                'Moldova': '摩尔多瓦',
                                'Madagasca r':'马达加斯加',
                                'Mexico':'墨西哥 ',
                                'Macedoni a':'马其顿',
                                'Mali':'马里', 
                                'Myanma r':'缅甸',
                                'Montenegr o':'黑山',
                                'Mongolia':'蒙 古',
                                'Mozambique ':'莫桑比克',
                                'Mauritania': '毛里塔尼亚',
                                'Malawi':'马拉维 ',
                                'Malaysia ':'马来西亚',
                                'Namibia':' 纳米比亚',
                                'New Caled onia':'新喀里多尼亚',
                                'Niger':'尼日尔', 
                                'Nigeria ':'尼日利亚',
                                'Nicaragua ':'尼加拉瓜',
                                'Netherlands ':'荷兰',
                                'Norway':'挪威', 
                                'Nepal':' 尼泊尔',
                                'New Zea land':'新西兰',
                                'Oman':'阿曼', 
                                'Pakist an':'巴基斯坦',
                                'Panama':'巴 拿马',
                                'Peru':'秘 鲁',
                                'Philip pines':'菲律宾',
                                'Papua New Gui nea':'巴布亚新几内亚',
                                'Poland':'波兰', 
                                'Puerto R ico':'波多黎各',
                                'Dem. Rep. Kor ea':'朝鲜',
                                'Portugal':'葡萄牙', 
                                'Paraguay': '巴拉圭',
                                'Qatar':'卡塔 尔',
                                'Romania ':'罗马尼亚',
                                'Russia':' 俄罗斯',
                                'Rwanda': '卢旺达',
                                'W. Sahar a':'西撒哈拉',
                                'Saudi Arabi a':'沙特阿拉伯',
                                'Sudan':'苏丹', 
                                'S. Suda n':'南苏丹',
                                'Senegal':' 塞内加尔',
                                'Solomon I s.':'所罗门群岛',
                                'Sierra Leone' :'塞拉利昂',
                                'El Salvador':' 萨尔瓦多',
                                'Somaliland':' 索马里兰',
                                'Somalia':'索马 里',
                                'Serbia':' 塞尔维亚',
                                'Suriname ':'苏里南',
                                'Slovakia': '斯洛伐克',
                                'Slovenia': '斯洛文尼亚',
                                'Sweden':'瑞 典',
                                'Swazilan d':'斯威士兰',
                                'Syria':'叙利亚 ',
                                'Chad':' 乍得',
                                'Togo': '多哥',
                                'Thaila nd':'泰国',
                                'Tajikistan ':'塔吉克斯坦',
                                'Turkmenistan ':'土库曼斯坦',
                                'East Timor':'东 帝汶',
                                'Trinidad and  Tobago':'特里尼达和多巴哥',
                                'Tunisia':'突尼斯', 
                                'Turkey':' 土耳其',
                                'Tanzania ':'坦桑尼亚',
                                'Uganda':'乌 干达',
                                'Ukraine' :'乌克兰',
                                'Uruguay': '乌拉圭',
                                'United St ates':'美国',
                                'Uzbekistan':'乌兹 别克斯坦',
                                'Venezuela':' 委内瑞拉',
                                'Vietnam':'越 南',
                                'Vanuatu': '瓦努阿图',
                                'West Bank ':'西岸',
                                'Yemen':'也门' ,
                                'South A frica':'南非',
                                'Zambia':'赞比亚', 
                                'Zimbabwe ':'津巴布韦'
                             }, 
                              data: seriesData
                          }
                      ]]
                })  chart.on('click', function(params){
                      if(params.name==='中国'){ 
                           Vc.changeMap Typ e() 
                          }
                      })
                    return chart
                   }