import React from "react";
import {Card, Table, Modal, Button} from 'antd';
import axios from '../../../axios/index';

import '../tables.less';
import dataSource from './basicDataSource';
import columns from '../columns';

export default class BasicTable extends React.Component{
    state = {
        loadStatus:true,
        dataSource:[],
        dataSource2:[],
        dataTotal:0,
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
                    dataTotal:res.data.total,
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
        let _this = this;
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

    onChange = (page, pageSize) => {
        console.log(page);
        console.log(pageSize);
    }

    render() {
        const {selectedRowKeys} = this.state;
        //单选
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        };
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
        };
        const paginationProps = {
            showQuickJumper: true,
            showTotal: () => `共${this.state.dataTotal}条数据`,
            total: this.state.dataTotal,
            size:'small',
            onChange:this.onChange,
        };
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="动态数据表格">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        loading={this.state.loadStatus}
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
                    />
                </Card>
                <Card title="Mock-分页">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                    />
                </Card>
            </div>
        );
    }
}