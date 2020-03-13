import React from "react";
import {
    Row,
    Button, Form, Input, Select, Col, Tooltip
} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;

class RiskManageForm extends React.Component{
    state = {
        isEdit: false,
    };

    //点击编辑按钮进入到编辑状态
    riskManageEdit = () => {
        this.setState({
            isEdit:true,
        })
    }

    //基本信息取消按钮对应的事件
    riskManageCancel = () => {
        this.props.form.resetFields();
        this.setState({
            isEdit:false,
        })
    }

    //提交客户关注点表单
    handleSubmitRiskManage = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err){
                return;
            }
            console.log(values);

            //todo 调用更新基本信息的方法，同时刷新页面

            this.riskManageCancel();
        })
    }

    render() {
        const {riskManage, id , mainEdit,isOldVersion, is_exist,
            form:{getFieldDecorator}} = this.props;
        const {isEdit} = this.state;
        const info = {//取出对应数据，多次使用
            quality_risk : riskManage.quality_risk ? riskManage.quality_risk : '--',
            industry_risk : riskManage.industry_risk ? riskManage.industry_risk : '--',
            personnel_risk : riskManage.personnel_risk ? riskManage.personnel_risk : '--',
            busi_relation : riskManage.busi_relation ? riskManage.busi_relation : '--',
            other_risk : riskManage.other_risk ? riskManage.other_risk : '--',
            fault_num : riskManage.fault_num ? riskManage.fault_num : '--',
            complain_num : riskManage.complain_num ? riskManage.complain_num : '--',
        };


        return (
            <div>
                <Form layout='inline'>
                    <FormItem label='公司id' style={{display:'none'}}>
                        {getFieldDecorator('company_id', {
                            initialValue: id ? id : 0,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <Row>
                        <Col span={12}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='质量波动风险'>
                                    {getFieldDecorator('quality_risk', {
                                        initialValue: info.quality_risk,
                                    })(
                                        <Input size="small" style={{width:400}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='质量波动风险'>
                                    <span>{info.quality_risk}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={12}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='行业变化风险'>
                                    {getFieldDecorator('industry_risk', {
                                        initialValue: info.industry_risk,
                                    })(
                                        <Input size="small" style={{width:400}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='行业变化风险'>
                                    <span>{info.industry_risk}</span>
                                </FormItem>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='人员变动风险'>
                                    {getFieldDecorator('personnel_risk', {
                                        initialValue: info.personnel_risk,
                                    })(
                                        <Input size="small" style={{width:400}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='人员变动风险'>
                                    <span>{info.personnel_risk}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={12}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='其他风险'>
                                    {getFieldDecorator('other_risk', {
                                        initialValue: info.other_risk,
                                    })(
                                        <Input size="small" style={{width:400}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='其他风险'>
                                    <span>{info.other_risk}</span>
                                </FormItem>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label="商务关系">
                                    {getFieldDecorator('busi_relation', {
                                        initialValue: info.busi_relation,
                                    })(
                                        <Select size="small" style={{width:400}}>
                                            <Option value='需求分析'>需求分析</Option>
                                            <Option value='测试'>测试</Option>
                                            <Option value='商务洽谈'>商务洽谈</Option>
                                            <Option value='单方合同'>单方合同</Option>
                                            <Option value='商务客户'>商务客户</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='商务关系'>
                                    <span>{info.busi_relation}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={12}>
                            <FormItem label='故障管理'>
                                <span>累计故障{info.fault_num}条，投诉{info.complain_num}条</span>
                                <Button
                                    size='small'
                                    type='primary'
                                    style={{marginLeft: 30}}
                                >详情</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Row style={{ marginTop:15,textAlign: 'right'}}>
                    <Button
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none',marginRight: 30}}
                        onClick={this.riskManageCancel}
                    >取消</Button>
                    <Button
                        type="primary"
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none',marginRight: 30}}
                        onClick={this.handleSubmitRiskManage}
                    >提交</Button>
                    <Tooltip title={is_exist === 0 ? '请先创建客户档案' : '编辑本模块信息'}>
                        <Button
                            type="primary"
                            style={{display: (mainEdit || isOldVersion) ? 'none' : 'inline',marginRight: 30}}
                            onClick={this.riskManageEdit}
                            disabled={is_exist === 0 ? true : false}
                        >编辑</Button>
                    </Tooltip>
                </Row>
            </div>
        );
    }
}
export default Form.create()(RiskManageForm);
