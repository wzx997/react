import React from "react";
import {Card, Button, Table, Form, Select, Modal, Radio, message, notification} from 'antd';

import axios from '../../axios';

import './index.less';
import columns from './columns';

const FormItem = Form.Item;
const {Option} = Select

export default class City extends React.Component{
    state = {
        loadStatus:true,
        dataList:[],
        dataTotal:0,
        isShowOpenCity:false
    }

    params = {
        page:1
    }

    componentDidMount() {
        this.requestList();
    }

    //请求数据调用的接口
    requestList = () => {
        axios.ajax({
            url:'city/openCityList',
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
    //开通城市对应的点击事件，打开模态框
    handleOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }

    //开通城市的提交，获取开通城市的数据
    handleOpenCitySubmit = (e) => {
        e.preventDefault();
        this.openCityForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const key = 'update';
                message.loading({content: '正在开通......', key, duration: 0});
                axios.ajax({
                    url: 'city/openCity',
                    data: {
                        params: JSON.stringify(values)
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        message.success({content: res.msg, key, duration: 2});
                    } else {
                        message.error({content: res.msg, key, duration: 2});
                    }
                    this.openCityForm.props.form.resetFields();
                    this.setState({
                        isShowOpenCity: false,
                    });
                });
            } else {
                notification.error({
                        message: '发生了一些错误！！！',
                        description: '请确信息填写完成。'
                    }
                )
            }
        });
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        this.cityListForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err){
                console.log(JSON.stringify(values));
                this.cityListForm.props.form.resetFields();
            }else {
                notification.error({
                        message: '发生了一些错误！！！',
                        description: '查询错误。'
                    }
                )
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
        return (
            <div>
                <Card className='card-wrap'>
                    <FilterForm
                        wrappedComponentRef={(inst) => {this.cityListForm = inst;}}
                        handleSearchSubmit={this.handleSearchSubmit}
                    />
                </Card>

                <Card className='card-wrap'>
                    <Button type='primary' onClick={this.handleOpenCity} className='city-btn'>开通城市</Button>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataList}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                    />
                </Card>

                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onOk={this.handleOpenCitySubmit}
                    onCancel={()=>{
                        this.setState({
                            isShowOpenCity: false,
                        });
                    }}
                >
                    <OpenCityForm wrappedComponentRef={(inst) => {this.openCityForm = inst;}} />
                </Modal>
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
                        <Select style={{width:200}}>
                            <Option value=''>全部</Option>
                            <Option value='1'>北京市</Option>
                            <Option value='2'>天津市</Option>
                            <Option value='3'>贵阳市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label='用车模式'>
                    {getFieldDecorator('mode', {
                        initialValue: ''
                    })(
                        <Select style={{width:200}}>
                            <Option value=''>全部</Option>
                            <Option value='1'>指定停车点模式</Option>
                            <Option value='2'>禁停区模式</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label='运营模式'>
                    {getFieldDecorator('op_mode', {
                        initialValue: ''
                    })(
                        <Select style={{width:200}}>
                            <Option value=''>全部</Option>
                            <Option value='1'>自营</Option>
                            <Option value='2'>加盟</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label='加盟商授权状态'>
                    {getFieldDecorator('auth_status', {
                        initialValue: ''
                    })(
                        <Select style={{width:200}}>
                            <Option value=''>全部</Option>
                            <Option value='1'>已授权</Option>
                            <Option value='2'>未授权</Option>
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

class OpenCityForm extends React.Component{
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            },
        };
        return (
            <Form layout='horizontal' {...formItemLayout}>
                <FormItem label='选择城市'>
                    {getFieldDecorator('city_id', {
                        // initialValue: '',
                        rules: [{required: true, message: '请选择城市!'}],
                    })(
                        <Select placeholder="请选择城市">
                            <Option value='1'>北京市</Option>
                            <Option value='2'>天津市</Option>
                            <Option value='3'>贵阳市</Option>
                            <Option value='4'>上海市</Option>
                            <Option value='5'>深圳市</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label='营运模式'>
                    {getFieldDecorator('op_mode', {
                        initialValue: 1,
                    })(
                        <Radio.Group>
                            <Radio value={1}>自营</Radio>
                            <Radio value={2}>加盟</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem label='用车模式'>
                    {getFieldDecorator('mode', {
                        initialValue: 1,
                    })(
                        <Radio.Group>
                            <Radio value={1}>指定停车点</Radio>
                            <Radio value={2}>禁停区</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
            </Form>
        );
    }
}
OpenCityForm = Form.create({})(OpenCityForm);