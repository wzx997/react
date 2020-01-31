import React from "react";
import {Card} from 'antd';

//按需加载

//导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from "echarts-for-react";

import '../index.less';

export default class Bar extends React.Component{

    //导入图的关键点
    getOption = () => {
        let option = {
            title:{
                text:'用户骑行订单'
            },
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '订单数',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                }
            ]
        }
        return option;
    }


    getOption2 = () => {
        let option = {
            title:{
                text:'用户骑行订单2'
            },
            legend: {
                data: ['OFO','摩拜','小蓝']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [3000, 600, 2000, 2010, 1600, 600, 3000]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [700, 1200, 1000, 900, 1700, 900, 1000]
                },
            ]
        };
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图标1">
                    <ReactEcharts option={this.getOption()} style={{height:500}}/>
                </Card>
                <Card title="柱形图标2">
                    <ReactEcharts option={this.getOption2()} style={{height:500}}/>
                </Card>
            </div>
        );
    }
}