import React from "react";
import {Card} from 'antd';

//按需加载
//导入柱形图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from "echarts-for-react";

import '../index.less';

export default class Line extends React.Component{
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '订单数',
                    type: 'line',
                    radius: '55%',
                    data: [335,310,234,135,250,600,300],
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['OFO订单数', '摩拜订单数']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'OFO订单数',
                    type: 'line',
                    radius: '55%',
                    data: [335,310,234,135,250,600,300],
                },
                {
                    name: '摩拜订单数',
                    type: 'line',
                    radius: '55%',
                    data: [100,250,400,400,100,360,310],
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '订单数',
                    type: 'line',
                    data: [335,310,234,135,250,600,300],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="折线图1">
                    <ReactEcharts option={this.getOption()} style={{height:500}}/>
                </Card>
                <Card title="折线图2">
                    <ReactEcharts option={this.getOption2()} style={{height:500}}/>
                </Card>
                <Card title="折线图3">
                    <ReactEcharts option={this.getOption3()} style={{height:500}}/>
                </Card>
            </div>
        );
    }
}