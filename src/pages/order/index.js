import React from "react";
import {Card,
    Button,
    Table,
    Form,
    Select,
    Modal,
    message,
    notification,
    Divider,
    DatePicker,
} from 'antd';

import axios from '../../axios';

import './index.less';

const FormItem = Form.Item;
const {Option} = Select;
const { RangePicker } = DatePicker;

export default class City extends React.Component{
    state = {
        loadStatus:true,
        dataList:[],
        dataTotal:0,
        isShowOpenCity:false,
        modalLoading:false
    }

    componentDidMount() {
        this.requestList();
    }

    formList = [
        {
            type:"SELECT",
            label:'城市',
            filed:'city',
            placeholder:'请选择城市',
            initialValue:'',
            width:200,
            list:[{'id':'','name':'全部'},{'id':'1','name':'北京市'},{'id':'2','name':'天津市'},]
        },
        {
            type:"时间按钮",
            label:'时间',
            filed:'time',
            placeholder:'请选择时间',
            initialValue:[],
            width:200,
            list:[]
        },
        {
            type:"SELECT",
            label:'订单状态',
            filed:'order_status',
            placeholder:'请选择订单状态',
            initialValue:'',
            width:200,
            list:[{'id':'','name':'全部'},{'id':'1','name':'进行中'},{'id':'2','name':'临时锁车'},{'id':'3','name':'行程结束'}]
        },
    ];

    //请求数据调用的接口
    requestList = () => {
        axios.ajax({
            url:'order/orderList',
            data:{
                params:{
                    id:10
                }
            }
        }).then((res)=>{
            if (res.code !== 0){
                message.error(res.msg,2);
            }else {
                this.setState({
                    dataList:res.data.item_list,
                    dataTotal:res.data.total_count,
                    loadStatus:false
                })
            }
        });
    }

    //搜索表单的提交事件
    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.filterForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err){
                console.log(JSON.stringify(values));
                let data = {
                    city_id : values.city_id,
                    order_status : values.order_status,
                    start_time : values.time[0] ? values.time[0].format('YYYY-MM-DD') : '',
                    end_time : values.time[1] ? values.time[1].format('YYYY-MM-DD') : ''
                };
                console.log(data);
                this.filterForm.props.form.resetFields();
            }else {
                notification.error({
                        message: '发生了一些错误！！！',
                        description: '查询错误。'
                    }
                )
            }
        });
    }

    //订单详情
    showDetails = (id) => {
        if (!id){
            Modal.error({
                title: '订单详情错误',
                content: '当前未选择一条有效的订单',
            });
            return;
        };
        window.open(`/#/common/order/detail/${id}`,'_blank');
    }

    //结束订单
    endOrder = (id) => {
        Modal.confirm({
            title: '结束订单确认',
            content: '是否要结束id为'+id+'的订单',
            onOk(){
                const key = 'update';
                message.loading({content:'结束订单中......',key,duration:0});
                setTimeout(()=>{
                    message.success({content:'结束订单成功！',key,duration:2});
                }, 1000);
            },
            onCancel(){
                console.log('点击了取消按钮')
            }
        });
    }

    render() {
        const paginationProps = {
            showQuickJumper: true,
            showTotal: () => `共${this.state.dataTotal}条数据`,
            total: this.state.dataTotal,
            size:'small',
        };

        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
            },
            {
                title: '里程',
                dataIndex: 'distance',
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: text => {
                    let config = {
                        1:'进行中',
                        2:'临时锁车',
                        3:'行程结束'
                    };
                    return config[text];
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <span
                            onClick={() => this.showDetails(record.id)}
                            style={{color: '#1890ff', cursor: 'pointer',}}
                        >订单详情</span>
                        <Divider type="vertical"/>
                        <span
                            onClick={() => this.endOrder(record.id)}
                            style={{color: '#1890ff', cursor: 'pointer'}}
                        >结束订单</span>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Card className='card-wrap'>
                    <FilterForm
                        wrappedComponentRef={(inst) => {this.filterForm = inst;}}
                        handleSearchSubmit={this.handleSearchSubmit}
                    />
                </Card>
                <Card title="订单列表" className='card-wrap'>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataList}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                    />
                </Card>
            </div>
        );
    }
}

class FilterForm extends React.Component{
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout='inline'>
                <FormItem label='城市'>
                    {getFieldDecorator('city_id', {
                        initialValue: ''
                    })(
                        <Select style={{width:250}}>
                            <Option value=''>全部</Option>
                            <Option value='1'>北京市</Option>
                            <Option value='2'>天津市</Option>
                            <Option value='3'>贵阳市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label='用车时间'>
                    {getFieldDecorator('time', {
                        initialValue: []
                    })(
                        <RangePicker
                            format="YYYY-MM-DD"
                        />
                    )}
                </FormItem>
                <FormItem label='订单状态'>
                    {getFieldDecorator('order_status', {
                        initialValue: ''
                    })(
                        <Select style={{width:250}}>
                            <Option value=''>全部</Option>
                            <Option value='1'>进行中</Option>
                            <Option value='2'>临时锁车</Option>
                            <Option value='3'>行程结束</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 30px'}} onClick={this.props.handleSearchSubmit}>查询</Button>
                    <Button onClick={() => this.props.form.resetFields()}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);