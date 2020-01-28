import React from "react";
import {Card, Table} from 'antd';
import axios from '../../../axios/index';

import '../tables.less';
import columns from "../columns";
import columns2 from "../columns2";
import columns3 from "../columns3";
import columns4 from "../columns4";


export default class HighTable extends React.Component{
    state = {
        loadStatus:true,
        dataSource1:[],
        dataTotal1:0,
        dataSource2:[],
        dataTotal2:0,
    }

    componentDidMount() {
        this.getBasicTableData();
        this.getHighTableData();
    }

    //获取数据，利用axios获取
    getBasicTableData = () => {
        axios.ajax({
            url:'table/basic-list',
        }).then((res)=>{
            if (res.code === 0){
                this.setState({
                    dataSource1: res.data.res,
                    dataTotal1:res.data.total,
                    loadStatus:false
                })
            }
        });
    }

    getHighTableData = () => {
        axios.ajax({
            url:'table/high-list',
        }).then((res)=>{
            if (res.code === 0){
                this.setState({
                    dataSource2: res.data.res,
                    dataTota2:res.data.total,
                    loadStatus:false
                })
            }
        });
    }

    handleOnChange = (pagination, _, sorter) => {
        let page = pagination.current ? pagination.current : 1;
        let pageSize = pagination.pageSize ? pagination.pageSize : 10;
        let sortedKey = sorter.field ? sorter.field : 'time';
        let sortedOrder = sorter.order ? sorter.order : 'descend';

        let data = {
            page,
            pageSize,
            sortedKey,
            sortedOrder
        };

        console.log('page',pagination);
        console.log('sorter',sorter);
        console.log(data);
    }

    render() {
        const paginationProps = {
            showQuickJumper: true,
            showTotal: () => `共${this.state.dataTotal1}条数据`,
            total: this.state.dataTotal1,
            size:'small',
        };

        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 40,
                address: 'London Park',
            },
        ];

        return (
            <div>
                <Card title="高级表格:表头固定">
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataSource1}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                        scroll={{ y: 300 }}
                    />
                </Card>

                <Card title="高级表格--表头固定">
                    <Table
                        columns={columns2}
                        dataSource={data}
                        pagination={paginationProps}
                        scroll={{ x: 1900,y:300}}
                    />
                </Card>

                <Card title="高级表格--排序功能1,前端">
                    <Table
                        rowKey={record => record.id}
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                    />
                </Card>

                <Card title="高级表格--排序功能2,后端">
                    <Table
                        rowKey={record => record.id}
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                        onChange={this.handleOnChange}
                    />
                </Card>

                <Card title="高级表格--状态徽标">
                    <Table
                        rowKey={record => record.id}
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                    />
                </Card>
            </div>
        );
    }

}