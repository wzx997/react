import React from "react";
import {
    Button,
    Card,
    Divider,
    Form,
    Input,
    message,
    Modal,
    notification,
    Select,
    Table,
    Tree,
    Transfer
} from 'antd';
import './index.less';

import axios from '../../axios';
import menu from '../../config/menuConfig';

import TestModal from "./test/index";

const FormItem = Form.Item;
const {Option} = Select;
const { TreeNode } = Tree;

export default class PermissionUser extends React.Component{
    state = {
        loadStatus:true,
        dataList:[],
        dataTotal:0,
        isShowCreateRole:false,
        isPermVisible:false,
        isUserVisible:false,
        currentData:{},
        menuInfo:[],
        mockData:[],
        targetKeys:[]
    }

    componentDidMount() {
        this.requestList();
    }

    params = {
        page:1
    }

    //请求数据调用的接口
    requestList = () => {
        axios.ajax({
            url:'auth/roleList',
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

    //创建角色的模态框
    createRole = () => {
        this.setState({
            isShowCreateRole:true
        })
    }

    //处理创建角色的提交
    handleCreateRoleSubmit = (e) => {
        e.preventDefault();
        this.createRoleForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = {
                    role_name: values.role_name,
                    status:values.status,
                };
                const key = 'update';
                message.loading({content: '正在创建角色......', key, duration: 0});
                axios.ajax({
                    url: 'auth/createRole',
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
                    this.createRoleForm.props.form.resetFields();
                    this.setState({
                        isShowCreateRole: false,
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

    //设置权限的模态框
    handlePermission = (record) => {
        this.setState({
            isPermVisible:true,
            currentData:record,
            menuInfo:record.menu
        })
    }

    //设置权限的提交
    handlePermEditSubmit = (e) => {
        e.preventDefault();
        this.perEditForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = {
                    role_name: values.role_name,
                    role_id:values.role_id,
                    status:values.status,
                    menu:this.state.menuInfo
                };
                console.log(JSON.stringify(params));
                const key = 'update';
                message.loading({content: '正在设置权限......', key, duration: 0});
                axios.ajax({
                    url: 'auth/setAuth',
                    data: {
                        params: params
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        message.success({content: res.msg, key, duration: 2});
                    } else {
                        message.error({content: res.msg, key, duration: 2});
                    }
                    this.perEditForm.props.form.resetFields();
                    this.setState({
                        isPermVisible: false,
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

    //用户授权的模态框
    handleUserAuth = (record) => {
        this.setState({
            isUserVisible:true,
            currentData:record,
        })
        this.getAllUserList(record.id);
    }

    //用户授权的提交
    handleRoleAuthSubmit = (e) => {
        e.preventDefault();
        this.roleAuthForm.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = {
                    role_name: values.role_name,
                    role_id:values.role_id,
                    user_id:this.state.targetKeys
                };
                console.log(JSON.stringify(params));
                const key = 'update';
                message.loading({content: '正在授权......', key, duration: 0});
                axios.ajax({
                    url: 'auth/setAuth',
                    data: {
                        params: params
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        message.success({content: res.msg, key, duration: 2});
                    } else {
                        message.error({content: res.msg, key, duration: 2});
                    }
                    this.roleAuthForm.props.form.resetFields();
                    this.setState({
                        isUserVisible: false,
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

    //获取用户列表
    getAllUserList = (id) => {
        axios.ajax({
            url:'auth/getUserList',
            data:{
                params:{
                    id:id
                }
            }
        }).then((res)=>{
            if (res.code !== 0){
                message.error(res.msg,2);
            }else {
                this.getAuthUserList(res.data.item_list);
            }
        });
    }

    //筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0){
            for (let i = 0; i < dataSource.length; i++){
                const data = {
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status
                }
                if (data.status === 1){
                    targetKeys.push(data.key);
                }
                mockData.push(data);
            }
            this.setState({
                mockData:mockData,
                targetKeys:targetKeys
            })
        }
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
                title: '角色ID',
                dataIndex: 'id',
            },
            {
                title: '角色名',
                dataIndex: 'role_name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                render: text => {
                    return text === 1 ? '启用' : '停用';
                }
            },
            {
                title: '授权时间',
                dataIndex: 'authorize_time',
            },
            {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <span
                            onClick={() => this.handlePermission(record)}
                            style={{color: '#1890ff', cursor: 'pointer',}}
                        >设置权限</span>
                        <Divider type="vertical"/>
                        <span
                            onClick={() => this.handleUserAuth(record)}
                            style={{color: '#1890ff', cursor: 'pointer'}}
                        >用户授权</span>
                        <Divider type="vertical"/>
                        <span
                            onClick={() => this.testModal.init(record.id)}
                            style={{color: '#1890ff', cursor: 'pointer'}}
                        >客户档案</span>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Card className='card-wrap'>
                    <Button type='primary' icon="plus" onClick={this.createRole} className='staff-btn'>创建角色</Button>
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={this.state.dataList}
                        loading={this.state.loadStatus}
                        pagination={paginationProps}
                    />
                </Card>
                <Modal
                    title = '创建角色'
                    visible = {this.state.isShowCreateRole}
                    onOk = {this.handleCreateRoleSubmit}
                    onCancel={()=>{
                        this.setState({
                            isShowCreateRole: false,
                        });
                    }}
                >
                    <CreateRole
                        wrappedComponentRef={(inst) => {this.createRoleForm = inst;}}
                    />
                </Modal>
                <Modal
                    title = '设置权限'
                    visible = {this.state.isPermVisible}
                    onOk = {this.handlePermEditSubmit}
                    onCancel={()=>{
                        this.setState({
                            isPermVisible: false,
                        });
                    }}
                >
                    <PerEditForm
                        wrappedComponentRef={(inst) => {this.perEditForm = inst;}}
                        currentData = {this.state.currentData}
                        menuInfo = {this.state.menuInfo}
                        patchMenuInfo = {(checkedKeys) => {
                            this.setState({
                                menuInfo:checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal
                    title = '用户授权'
                    visible = {this.state.isUserVisible}
                    onOk = {this.handleRoleAuthSubmit}
                    onCancel={()=>{
                        this.setState({
                            isUserVisible: false,
                        });
                    }}
                    width={600}
                >
                    <RoleAuthForm
                        wrappedComponentRef={(inst) => {this.roleAuthForm = inst;}}
                        currentData = {this.state.currentData}
                        targetKeys = {this.state.targetKeys}
                        mockData = {this.state.mockData}
                        patchUserInfo = {(targetKeys) => {
                            this.setState({
                                targetKeys:targetKeys
                            })
                        }}
                    />
                </Modal>

                <TestModal ref={v => this.testModal = v}/>
            </div>
        );
    }
}

class CreateRole extends React.Component{
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
                <FormItem label='角色名'>
                    {getFieldDecorator('role_name', {
                        rules: [{required: true, message: '请输入角色名称!'}],
                    })(
                        <Input placeholder='请输入角色名称'/>
                    )}
                </FormItem>
                <FormItem label="状态">
                    {getFieldDecorator('status', {
                        rules: [{required: true, message: '请选择状态!'}],
                    })(
                        <Select placeholder="请选择状态">
                            <Option value={0}>停用</Option>
                            <Option value={1}>启用</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        );
    }
}
CreateRole = Form.create({})(CreateRole);

class PerEditForm extends React.Component{
    //渲染节点使用
    renderTreeNodes = (data) => {
        return  data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.title} key={item.key} />;
        });
    }

    //处理菜单的点击事件用
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const currentData = this.props.currentData;
        const menuInfo = this.props.menuInfo;
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
                <FormItem label='角色id' style={{display:'none'}}>
                    {getFieldDecorator('role_id', {
                        initialValue: currentData.id,
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem label='角色名'>
                    {getFieldDecorator('role_name', {
                        initialValue:currentData.role_name
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem label="状态">
                    {getFieldDecorator('status', {
                        initialValue:currentData.status,
                        rules: [{required: true, message: '请选择状态!'}],
                    })(
                        <Select placeholder="请选择状态">
                            <Option value={0}>停用</Option>
                            <Option value={1}>启用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys);
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title='平台权限' key='platform_all'>
                        {this.renderTreeNodes(menu)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}
PerEditForm = Form.create({})(PerEditForm);

class RoleAuthForm extends React.Component{
    filterOption = (inputValue, option) => {
        return  option.title.indexOf(inputValue) > -1;
    }

    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const currentData = this.props.currentData;
        const targetKeys = this.props.targetKeys;
        const mockData = this.props.mockData;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        return (
            <Form layout='horizontal' {...formItemLayout}>
                <FormItem label='角色id' style={{display:'none'}}>
                    {getFieldDecorator('role_id', {
                        initialValue: currentData.id,
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem label='角色名'>
                    {getFieldDecorator('role_name', {
                        initialValue:currentData.role_name
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                <FormItem label='选择用户'>
                    <Transfer
                        dataSource={mockData}
                        titles={['待选用户','已选用户']}
                        showSearch
                        filterOption={this.filterOption}
                        targetKeys={targetKeys}
                        render={item => item.title}
                        onChange={this.handleChange}
                    />
                </FormItem>
            </Form>
        );
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);