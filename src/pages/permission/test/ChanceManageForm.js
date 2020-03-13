import React from "react";
import {
    Row,Collapse,
    Button, Form, Input, Col, Tooltip, Icon,
} from 'antd';

import LinkmanTable from "./LinkmanTable";

const FormItem = Form.Item;
const { Panel } = Collapse;

class ChanceManageForm extends React.Component{
    state = {
        isEdit: false,
    };

    //点击编辑按钮进入到编辑状态
    chanceManageEdit = () => {
        this.setState({
            isEdit:true,
        })
    }

    //基本信息取消按钮对应的事件
    chanceManageCancel = () => {
        this.props.form.resetFields();
        this.setState({
            isEdit:false,
        })
    }

    /**
     * 添加表单项
     * @param len int 传入数组的长度，目的是假设表单项全部删除后有值
     * @param keystype string key的类型，用于指定是company_keys还是our_keys
     */
    add = (len, keystype) => {
        const {form} = this.props;
        let keys = form.getFieldValue(keystype)
        keys = keys ? keys : [0];
        const nextKeys = keys.length === 0 ? keys.concat(len) : keys.concat(keys[keys.length - 1] + 1);
        if (keystype === 'company_keys'){
            form.setFieldsValue({
                company_keys: nextKeys,
            });
        }else {
            form.setFieldsValue({
                our_keys: nextKeys,
            });
        }
    };

    /**
     * 移除表单项
     * @param k int 需要移除的key
     * @param keystype string key的类型，用于指定是company_keys还是our_keys
     */
    remove = (k, keystype) => {
        const {form} = this.props;
        const keys = form.getFieldValue(keystype);
        if (keystype === 'company_keys'){
            form.setFieldsValue({
                company_keys: keys.filter(key => key !== k),
            });
        }else {
            form.setFieldsValue({
                our_keys: keys.filter(key => key !== k),
            });
        }

    };

    /**
     * 获取动态表单
     * @param keysType key的类型，用于指定是company_keys还是our_keys
     * @param field array 表单源数据，渲染初始值
     * @param filedType string 用于动态绑定参数值时的参数名
     * @returns {*[]}
     */
    getDynamicFormItems = (keysType, field, filedType) => {
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const keys = getFieldValue(keysType) ? getFieldValue(keysType) : [];
        return (
            keys.map((k) =>(
                <div key={k} style={{
                    border: '1px dashed #cccccc',
                    padding: 10,
                    margin: '15px 50px 0 50px'
                }}>
                    <FormItem label='联系人类型' style={{display: 'none'}}>
                        {getFieldDecorator(`${filedType}[${k}].type`, {
                            initialValue: filedType === 'company_linkman' ? 101 : 102
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Row>
                        <Col span={8}>
                            <FormItem label='姓名'>
                                {getFieldDecorator(`${filedType}[${k}].name`, {
                                    initialValue: field[k] ? field[k].name : '',
                                    rules: [{required: true, message: '请填入姓名',}],
                                })(
                                    <Input style={{width: 250}} size='small'/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='电话'>
                                {getFieldDecorator(`${filedType}[${k}].phone`, {
                                    initialValue: field[k] ? field[k].phone : '',
                                    rules: [{required: true, message: '请填入电话',}],
                                })(
                                    <Input style={{width: 250}} size='small'/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='邮箱'>
                                {getFieldDecorator(`${filedType}[${k}].email`, {
                                    initialValue: field[k] ? field[k].email : '',
                                    rules: [
                                        {type:'email', message: '请输入合法邮箱格式！'},
                                    ],
                                })(
                                    <Input style={{width: 250}} size='small'/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <FormItem label='备注信息'>
                            {getFieldDecorator(`${filedType}[${k}].remark`, {
                                initialValue: field[k] ? field[k].remark : '',
                            })(
                                <Input style={{width: 300}} size='small'/>
                            )}
                        </FormItem>
                    </Row>
                    <Tooltip title='删除此项'>
                        <Icon
                            style={{
                                cursor: 'pointer',
                                fontSize: 20,
                                color: '#999',
                                float: 'right',
                                marginTop: '-100px',
                                marginRight: '-20px',
                            }}
                            type="close-circle"
                            onClick={() => this.remove(k,keysType)}
                        />
                    </Tooltip>
                </div>
            ))
        )
    }

    /**
     * 获取静态表单字段
     * @param field array 表单源数据，渲染初始值
     * @returns {*}
     */
    getSticFormItems = (field) => {
        return (
            field.map((key, index) =>(
                <div key={index} style={{
                    border: '1px dashed #cccccc',
                    padding: 10,
                    marginTop: 10
                }}>
                    <Row>
                        <Col span={8}>
                            <FormItem label='姓名'>
                                <span title={key.name}>{key.name ? key.name : '--'}</span>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='电话'>
                                <span>{key.phone ? key.phone : '--'}</span>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='邮箱'>
                                <span>{key.email ? key.email : '--'}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <FormItem label='备注信息'>
                            <span>{key.remark ? key.remark : '--'}</span>
                        </FormItem>
                    </Row>
                </div>
            ))
        )
    }

    //提交机会管理表单
    handleSubmitChanceManage = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err){
                return;
            }
            values.company_linkman = values.company_linkman ? values.company_linkman.filter(item => item) : [];
            values.our_linkman = values.our_linkman ? values.our_linkman.filter(item => item) : [];

            const chanceManage = {
                company_id: values.company_id,
                industry_ana: values.industry_ana,
                company_ana: values.company_ana,
                contacts: [...values.company_linkman, ...values.our_linkman]
            };
            console.log(chanceManage);

            //todo 调用更新基本信息的方法，同时刷新页面

            this.chanceManageCancel()
        })
    }

    render() {
        const {chanceManage, id, mainEdit, isOldVersion, is_exist,
            form: {getFieldDecorator}} = this.props;
        const {isEdit} = this.state;
        const info = {//取出对应数据，多次使用
            industry_ana: chanceManage.industry_ana ? chanceManage.industry_ana : '--',
            company_ana: chanceManage.company_ana ? chanceManage.company_ana : '--',
            company_linkman: chanceManage.company_linkman ? chanceManage.company_linkman : [],
            our_linkman: chanceManage.our_linkman ? chanceManage.our_linkman : []
        };

        const company_temp = [];
        const our_temp = [];
        info.company_linkman.map((_, index) => company_temp.push(index));
        info.our_linkman.map((_, index) => our_temp.push(index));
        getFieldDecorator('company_keys', {initialValue: company_temp});
        getFieldDecorator('our_keys', {initialValue: our_temp});

        const companyDynamicFormItems = this.getDynamicFormItems('company_keys', info.company_linkman, 'company_linkman')
        const ourDynamicFormItems = this.getDynamicFormItems('our_keys', info.our_linkman, 'our_linkman')
        const companyStaticFormItems = this.getSticFormItems( info.company_linkman);
        const ourStaticFormItems = this.getSticFormItems(info.our_linkman);

        return (
            <div>
                <Form layout='inline'>
                    <FormItem label='公司id' style={{display: 'none'}}>
                        {getFieldDecorator('company_id', {
                            initialValue: id ? id : 0,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Row>
                        {(isEdit || mainEdit) ? (
                            <FormItem label='行业分析'>
                                {getFieldDecorator('industry_ana', {
                                    initialValue: info.industry_ana,
                                })(
                                    <Input
                                        size="small"
                                        style={{width: 500}}
                                    />
                                )}
                            </FormItem>
                        ) : (
                            <FormItem label='行业分析'>
                                <span>{info.industry_ana}</span>
                            </FormItem>
                        )}
                    </Row>

                    <Row>
                        {(isEdit || mainEdit) ? (
                            <FormItem label='企业分析'>
                                {getFieldDecorator('company_ana', {
                                    initialValue: info.company_ana,
                                })(
                                    <Input
                                        size="small"
                                        style={{width: 500}}
                                    />
                                )}
                            </FormItem>
                        ) : (
                            <FormItem label='企业分析'>
                                <span>{info.company_ana}</span>
                            </FormItem>
                        )}
                    </Row>
                    <Row>
                        <FormItem label='客户相关人员变更'>
                            <Button
                                type="primary"
                                size='small'
                                style={{marginRight:30}}
                                onClick={() => this.linkmanTable.getLinkmanData(id,'companyLinkman')}
                            >详情</Button>
                            {(isEdit || mainEdit) ? (
                                <Button
                                    type="primary"
                                    icon="plus"
                                    size='small'
                                    onClick={() => this.add(info.company_linkman.length,'company_keys')}
                                >添加</Button>
                            ) : ''
                            }
                        </FormItem>
                    </Row>
                    {(isEdit || mainEdit) ? companyDynamicFormItems :
                        <Collapse accordion style={{marginTop:10,marginBottom:10}}>
                            <Panel header="点击查看详情" key="1" >
                                {companyStaticFormItems}
                            </Panel>
                        </Collapse>
                    }
                    <Row>
                        <FormItem label='我司相关人员变更'>
                            <Button
                                type="primary"
                                size='small'
                                style={{marginRight:30}}
                                onClick={() => this.linkmanTable.getLinkmanData(id,'ourlinkman')}
                            >详情</Button>
                            {(isEdit || mainEdit) ? (
                                <Button
                                    type="primary"
                                    icon="plus"
                                    size='small'
                                    onClick={() => this.add(info.our_linkman.length, 'our_keys')}
                                >添加</Button>
                            ) : ''
                            }
                        </FormItem>
                    </Row>
                    {(isEdit || mainEdit) ? ourDynamicFormItems :
                        <Collapse accordion style={{marginTop:10,marginBottom:10}}>
                            <Panel header="点击查看详情" key="1" >
                                {ourStaticFormItems}
                            </Panel>
                        </Collapse>
                    }
                </Form>
                <Row style={{marginTop: 15, textAlign: 'right'}}>
                    <Button
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none', marginRight: 30}}
                        onClick={this.chanceManageCancel}
                    >取消</Button>
                    <Button
                        type="primary"
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none', marginRight: 30}}
                        onClick={this.handleSubmitChanceManage}
                    >提交</Button>
                    <Tooltip title={is_exist === 0 ? '请先创建客户档案' : '编辑本模块信息'}>
                        <Button
                            type="primary"
                            style={{display: (mainEdit || isOldVersion) ? 'none' : 'inline', marginRight: 30}}
                            onClick={this.chanceManageEdit}
                            disabled={is_exist === 0 ? true : false}
                        >编辑</Button>
                    </Tooltip>
                </Row>
                <LinkmanTable ref={v => this.linkmanTable = v}/>
            </div>
        );
    }
}
export default Form.create()(ChanceManageForm);
