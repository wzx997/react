import React from "react";
import {
    Card,
    Button,
    Table,
    Form,
    Select,
    Modal,
    Radio,
    message,
    notification,
    Input,
    Divider,
    Badge,
    DatePicker
} from 'antd';
import './index.less';

import axios from '../../axios';
import moment from "moment";

const FormItem = Form.Item;
const {Option} = Select;

export default class User extends React.Component{
    state = {
        loadStatus:true,
        dataList:[],
        dataTotal:0,
        isShowEditInfo:false,
        currentData:{},
        title:'',
        type:''
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
            url:'staff/staffList',
            data:{
                params:{
                    page:this.params.page
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

    //处理新增和编辑的方法
    editInfo = (type, record) => {
        if (type === 'create'){
            this.setState({
                isShowEditInfo:true,
                currentData:record,
                title:'创建员工',
                type:type
            });
        }else {
            this.setState({
                isShowEditInfo:true,
                currentData:record,
                title:'编辑员工',
                type:type
            });
        }
    }

    //编辑用户信息的提交，获取用户信息的数据
    handleOpenCitySubmit = (e) => {
        e.preventDefault();
        this.editInfoForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = {
                    type:this.state.type,
                    id: values.id ? values.id : 0,
                    name:values.name,
                    phone:values.phone,
                    sex:values.sex,
                    state:values.state,
                    hobby:values.hobby,
                    birthday:values.birthday ? values.birthday.format('YYYY-MM-DD') : '',
                    isMarried:values.isMarried,
                    address:values.address
                };
                const key = 'update';
                message.loading({content: '正在操作......', key, duration: 0});
                axios.ajax({
                    url: 'staff/editCity',
                    data: {
                        params: JSON.stringify(params)
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        // this.requestList();
                        message.success({content: res.msg, key, duration: 2});
                    } else {
                        message.error({content: res.msg, key, duration: 2});
                    }
                    this.editInfoForm.props.form.resetFields();
                    this.setState({
                        isShowEditInfo: false,
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

    //详情
    showDetails = (record) => {
        window.open(`/#/common/staff/detail/${record.id}`,'_blank');
    }

    //
    delStaff = (id) => {
        Modal.confirm({
            title: '删除员工确认',
            content: '是否要删除id为'+id+'的员工',
            onOk(){
                const key = 'update';
                message.loading({content: '正在删除......', key, duration: 0});
                axios.ajax({
                    url: 'staff/delStaff',
                    data: {
                        params:{
                            id:1
                        }
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        message.success({content: res.msg, key, duration: 2});
                    } else {
                        message.error({content: res.msg, key, duration: 2});
                    }
                });
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
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '电话',
                dataIndex: 'phone',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: text => {
                    return text === 0 ? <Badge color='blue' text='男'/> : <Badge color='green' text='女'/>;
                }
            },
            {
                title: '职称',
                dataIndex: 'state',
                render: text => {
                    let config = {
                        0:'初级程序员',
                        1:'中级程序员',
                        2:'高级程序员',
                        3:'资深程序员'
                    };
                    return config[text];
                }
            },
            {
                title: '爱好',
                dataIndex: 'hobby',
                render: text => {
                    let config = {
                        0:'唱歌',
                        1:'跑步',
                        2:'篮球',
                        3:'足球',
                        4:'阅读',
                        5:'旅游',
                    };
                    return config[text];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '是否结婚',
                dataIndex: 'isMarried',
                render: text => {
                    return text === 0 ? '未婚' : '已婚';
                }
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <span
                            onClick={() => this.showDetails(record)}
                            style={{color: '#1890ff', cursor: 'pointer',}}
                        >详情</span>
                        <Divider type="vertical"/>
                        <span
                            onClick={() => this.editInfo('edit',record)}
                            style={{color: '#1890ff', cursor: 'pointer'}}
                        >编辑</span>
                        <Divider type="vertical"/>
                        <span
                            onClick={() => this.delStaff(record.id)}
                            style={{color: '#FF232A', cursor: 'pointer'}}
                        >删除</span>
                    </span>
                ),
            },
        ];

        return (
            <div>
                <Card className='card-wrap'>
                    <FilterForm
                        wrappedComponentRef={(inst) => {this.cityListForm = inst;}}
                        handleSearchSubmit={this.handleSearchSubmit}
                    />
                </Card>
                <Card className='card-wrap'>
                    <Button type='primary' icon="plus" onClick={() => this.editInfo('create',null)} className='staff-btn'>创建员工</Button>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataList}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                    />
                </Card>
                <Modal
                    title={this.state.title}
                    visible={this.state.isShowEditInfo}
                    onOk={this.handleOpenCitySubmit}
                    onCancel={()=>{
                        this.setState({
                            isShowEditInfo: false,
                        });
                    }}
                >
                    <EditInfoForm
                        wrappedComponentRef={(inst) => {this.editInfoForm = inst;}}
                        currentData = {this.state.currentData}
                    />
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
                <FormItem label='姓名'>
                    {getFieldDecorator('name', {
                        initialValue: ''
                    })(
                        <Input
                            style={{width:200}}
                            placeholder='请输入姓名'
                        />
                    )}
                </FormItem>
                <FormItem label='电话'>
                    {getFieldDecorator('phone', {
                        initialValue: ''
                    })(
                        <Input
                            style={{width:200}}
                            placeholder='请输入电话'
                        />
                    )}
                </FormItem>
                <FormItem label='职称'>
                    {getFieldDecorator('state', {
                        initialValue: ''
                    })(
                        <Select style={{width:200}}>
                            <Option value=''>全部</Option>
                            <Option value='0'>初级程序员</Option>
                            <Option value='1'>中级程序员</Option>
                            <Option value='2'>高级程序员</Option>
                            <Option value='3'>资深程序员</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label='是否结婚'>
                    {getFieldDecorator('isMarried', {
                        initialValue: ''
                    })(
                        <Select style={{width:200}}>
                            <Option value=''>全部</Option>
                            <Option value='0'>未婚</Option>
                            <Option value='1'>结婚</Option>
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

class EditInfoForm extends React.Component{
    render() {
        const { getFieldDecorator } = this.props.form;
        let currentData = this.props.currentData || {};
        console.log(currentData);
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
                <FormItem label='用户id' style={{display:'none'}}>
                    {getFieldDecorator('id', {
                        initialValue: currentData.id,
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem label='姓名'>
                    {getFieldDecorator('name', {
                        initialValue: currentData.name,
                        rules: [{required: true, message: '请输入姓名!'}],
                    })(
                        <Input
                            placeholder="请输入姓名"
                        />
                    )}
                </FormItem>
                <FormItem label='电话'>
                    {getFieldDecorator('phone', {
                        initialValue: currentData.phone,
                        rules: [{required: true, message: '请输入电话!'}],
                    })(
                        <Input
                            placeholder="请输入电话"
                        />
                    )}
                </FormItem>
                <FormItem label="性别">
                    {getFieldDecorator('sex', {
                        initialValue: currentData.sex ? currentData.sex :0,
                        rules: [{required: true, message: '请选择性别!'}],
                    })(
                        <Radio.Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem label="级别">
                    {getFieldDecorator('state', {
                        initialValue: currentData.state ? currentData.state :0,
                    })(
                        <Select placeholder="请选择级别">
                            <Option value={0}>初级程序员</Option>
                            <Option value={1}>中级程序员</Option>
                            <Option value={2}>高级程序员</Option>
                            <Option value={3}>资深程序员</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="爱好">
                    {getFieldDecorator('hobby', {
                        initialValue: currentData.hobby ? currentData.hobby : 0,
                    })(
                        <Select
                            placeholder="请选择爱好"
                        >
                            <Option value={0}>唱歌</Option>
                            <Option value={1}>跑步</Option>
                            <Option value={2}>篮球</Option>
                            <Option value={3}>足球</Option>
                            <Option value={4}>阅读</Option>
                            <Option value={5}>旅游</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="生日">
                    {getFieldDecorator('birthday', {
                        initialValue: moment(currentData.birthday)
                    })(
                        <DatePicker
                            format="YYYY-MM-DD"
                        />
                    )}
                </FormItem>
                <FormItem label="是否已婚">
                    {getFieldDecorator('isMarried', {
                        initialValue: currentData.isMarried ? currentData.isMarried : 0,
                    })(
                        <Radio.Group>
                            <Radio value={0}>未婚</Radio>
                            <Radio value={1}>已婚</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                <FormItem label="城市">
                    {getFieldDecorator('address', {
                        initialValue: currentData.address,
                    })(
                        <Input
                            placeholder="请输入城市"
                        />
                    )}
                </FormItem>
            </Form>
        );
    }
}
EditInfoForm = Form.create({})(EditInfoForm);