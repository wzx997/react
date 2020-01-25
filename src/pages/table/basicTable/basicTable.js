import React from "react";
import {Card, Table, Divider, Modal, Button} from 'antd';
import axios from '../../../axios/index';

import '../tables.less';
import dataSource from './basicDataSource';

export default class BasicTable extends React.Component{
    state = {
        loadStatus:true,
        dataSource:[],
        dataSource2:[],
        ids:[],
        selectedRows:[],
    }

    componentDidMount() {
        this.setState({dataSource});
        this.getBasicTableData();
    }

    //获取数据，利用axios获取
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

    //onRow对应的点击事件
    onRowClick = (record) => {
        Modal.info({
            title: `用户${record.name}的信息`,
            content:(
                <div>
                    <p>姓名：{record.name}</p>
                    <p>性别：{record.sex}</p>
                    <p>生日：{record.birthday}</p>
                    <p>地址：{record.address}</p>
                </div>
            )
        })
        let selectKey = [record.id];
        this.setState({
            selectedRowKeys:selectKey,
            selectedItem:record
        })
    }

    //删除事件
    handleDel = () => {
        let ids = this.state.ids;
        Modal.confirm({
            title: '删除确认',
            content: `确认删除这些数据吗，id分别为${ids}`,
            okText: '确认',
            cancelText: '取消',
            onOk(){
                console.log(`成功删除了下列数据，id分别为${ids}`);
            },
            onCancel(){
                console.log('点击了取消删除数据的按钮');
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

        const {selectedRowKeys} = this.state;
        //单选
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        //复选
        const rowSelection2 = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                let ids = [];
                selectedRows.forEach(item=>{
                    ids.push(item.id)
                })
                this.setState({
                    ids,
                    selectedRows
                })
            },
        }

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
                <Card title="Mock-单选">
                    <Table
                        rowKey={record => record.id}
                        rowSelection={rowSelection}
                        onRow={(record) => {
                            return {
                                onClick: () => {// 点击行
                                    this.onRowClick(record);
                                },
                            };
                        }}
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
                <Card title="Mock-复选">
                    <Button type="danger" onClick={this.handleDel}>删除</Button>
                    <Table
                        rowKey={record => record.id}
                        rowSelection={rowSelection2}
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