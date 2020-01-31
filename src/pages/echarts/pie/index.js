import React from "react";
import {Card} from 'antd';

//按需加载
//导入柱形图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from "echarts-for-react";

import '../index.less';

export default class Pie extends React.Component{
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        {value: 335, name: '周一'},
                        {value: 310, name: '周二'},
                        {value: 234, name: '周三'},
                        {value: 135, name: '周四'},
                        {value: 250, name: '周五'},
                        {value: 600, name: '周六'},
                        {value: 300, name: '周日'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.2)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    // center: ['50%', '60%'],
                    data: [
                        {value: 335, name: '周一'},
                        {value: 310, name: '周二'},
                        {value: 234, name: '周三'},
                        {value: 135, name: '周四'},
                        {value: 250, name: '周五'},
                        {value: 600, name: '周六'},
                        {value: 300, name: '周日'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.2)'
                        }
                    }
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {value: 335, name: '周一'},
                        {value: 310, name: '周二'},
                        {value: 234, name: '周三'},
                        {value: 135, name: '周四'},
                        {value: 250, name: '周五'},
                        {value: 600, name: '周六'},
                        {value: 300, name: '周日'}
                    ].sort((a, b) => {
                        return a.value - b.value
                    }),
                    roseType:'radius'
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="饼图1">
                    <ReactEcharts option={this.getOption()} style={{height:500}}/>
                </Card>
                <Card title="饼图2">
                    <ReactEcharts option={this.getOption2()} style={{height:500}}/>
                </Card>
                <Card title="饼图3">
                    <ReactEcharts option={this.getOption3()} style={{height:500}}/>
                </Card>
            </div>
        );
    }
}