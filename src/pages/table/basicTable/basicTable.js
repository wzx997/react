import React from "react";
import {Card, Table, Divider} from 'antd';
// import axios from 'axios';
import axios from '../../../axios/index';

import '../tables.less';
import dataSource from './basicDataSource';

export default class BasicTable extends React.Component{
    state = {
        loadStatus:true,
        dataSource:[],
        dataSource2:[]
    }

    componentDidMount() {
        this.setState({dataSource});
        this.getBasicTableData();
    }

    getBasicTableData = () => {
        axios.ajax({
            url:'table/basic-list',
        }).then((res)=>{
            if (res.code === 0){
                this.setState({
                    dataSource2: res.data.res,
                    loadStatus:false
                })
            }
        });
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (text) => {
                    return text === 0 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render: (text) => {
                    let config = {
                        0:'初级程序员',
                        1:'中级程序员',
                        2:'高级程序员',
                        3:'资深程序员',
                    };
                    return config[text];
                }
            },
            {
                title: '爱好',
                dataIndex: 'hobby',
                key: 'bobby',
                render: (text,record) => {
                    let config = {
                        0:'唱歌',
                        1:'跑步',
                        2:'篮球',
                        3:'足球',
                        4:'阅读',
                        5:'旅游',
                    }
                    let res = '';

                    text.forEach(item => {
                        res = config[item]+ ',' + res;
                    });
                    return res;
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '城市',
                dataIndex: 'city',
                key: 'city',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href="/#/admin">邀请{record.name}</a>
                        <Divider type="vertical" />
                        <a href="/#/admin">删除</a>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        locale={
                            {
                                emptyText: '暂无数据'
                            }
                        }
                    />
                </Card>
                <Card title="动态数据表格">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        loading={this.state.loadStatus}
                        locale={
                            {
                                emptyText: '暂无数据'
                            }
                        }
                    />
                </Card>
            </div>
        );
    }
}