import React from "react";
import {
    Row,
    Button, Form, Input, Rate, Tooltip, InputNumber
} from 'antd';

const FormItem = Form.Item;

class CustomerFocusForm extends React.Component{
    state = {
        isEdit: false,
    };

    //点击编辑按钮进入到编辑状态
    customerFocusEdit = () => {
        this.setState({
            isEdit:true,
        })
    }

    //基本信息取消按钮对应的事件
    customerFocusCancel = () => {
        this.props.form.resetFields();
        this.setState({
            isEdit:false,
        })
    }

    //提交客户关注点表单
    handleSubmitCustomerFocus = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err){
                return;
            }
            console.log(values);

            //todo 调用更新基本信息的方法，同时刷新页面

            this.customerFocusCancel();
        })
    }

    render() {
        const {customerFocus, id, mainEdit, isOldVersion, is_exist,
            form:{getFieldDecorator , getFieldValue}} = this.props;
        const {isEdit} = this.state;
        const info = {//取出对应数据，多次使用
            focus_quality : customerFocus.focus_quality ? customerFocus.focus_quality : 0,
            focus_price : customerFocus.focus_price ? customerFocus.focus_price : 0,
            focus_business : customerFocus.focus_business ? customerFocus.focus_business : 0,
            focus_product : customerFocus.focus_product ? customerFocus.focus_product : 0,
            focus_service : customerFocus.focus_service ? customerFocus.focus_service : 0,
            strategy : customerFocus.strategy ? customerFocus.strategy : '--',
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
                        <FormItem label='质量关注点'>
                            {getFieldDecorator('focus_quality', {
                                initialValue: info.focus_quality,
                            })(
                                <Rate count={10} disabled={!(isEdit || mainEdit)} style={{lineHeight:0}}/>
                            )}
                        </FormItem>
                        <InputNumber
                            disabled={true}
                            size='small'
                            value={getFieldValue('focus_quality')}
                            style={{marginTop: 10,width: 33,color: "black"}}
                        />
                    </Row>
                    <Row>
                        <FormItem label='价格关注点'>
                            {getFieldDecorator('focus_price', {
                                initialValue: info.focus_price,
                            })(
                                <Rate count={10} disabled={!(isEdit || mainEdit)} style={{lineHeight:0}}/>
                            )}
                        </FormItem>
                        <InputNumber
                            disabled={true}
                            size='small'
                            value={getFieldValue('focus_price')}
                            style={{marginTop: 10,width: 33,color: "black"}}
                        />
                    </Row>
                    <Row>
                        <FormItem label='商务关注点'>
                            {getFieldDecorator('focus_business', {
                                initialValue: info.focus_business,
                            })(
                                <Rate count={10} disabled={!(isEdit || mainEdit)} style={{lineHeight:0}}/>
                            )}
                        </FormItem>
                        <InputNumber
                            disabled={true}
                            size='small'
                            value={getFieldValue('focus_business')}
                            style={{marginTop: 10,width: 33,color: "black"}}
                        />
                    </Row>
                    <Row>
                        <FormItem label='产品关注点'>
                            {getFieldDecorator('focus_product', {
                                initialValue: info.focus_product,
                            })(
                                <Rate count={10} disabled={!(isEdit || mainEdit)} style={{lineHeight:0}}/>
                            )}
                        </FormItem>
                        <InputNumber
                            disabled={true}
                            size='small'
                            value={getFieldValue('focus_product')}
                            style={{marginTop: 10,width: 33,color: "black"}}
                        />
                    </Row>
                    <Row>
                        <FormItem label='服务关注点'>
                            {getFieldDecorator('focus_service', {
                                initialValue: info.focus_service,
                            })(
                                <Rate count={10} disabled={!(isEdit || mainEdit)} style={{lineHeight:0}}/>
                            )}
                        </FormItem>
                        <InputNumber
                            disabled={true}
                            size='small'
                            value={getFieldValue('focus_service')}
                            style={{marginTop: 10,width: 33,color: "black"}}
                        />
                    </Row>

                    <Row>
                        {(isEdit || mainEdit) ? (
                            <FormItem label='对应策略'>
                                {getFieldDecorator('strategy', {
                                    initialValue: info.strategy,
                                })(
                                    <Input
                                        size="small"
                                        style={{width:500}}
                                    />
                                )}
                            </FormItem>
                        ) : (
                            <FormItem label='对应策略'>
                                <span>{info.strategy}</span>
                            </FormItem>
                        )}
                    </Row>
                </Form>
                <Row style={{ marginTop:15,textAlign: 'right'}}>
                    <Button
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none',marginRight: 30}}
                        onClick={this.customerFocusCancel}
                    >取消</Button>
                    <Button
                        type="primary"
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none',marginRight: 30}}
                        onClick={this.handleSubmitCustomerFocus}
                    >提交</Button>
                    <Tooltip title={is_exist === 0 ? '请先创建客户档案' : '编辑本模块信息'}>
                        <Button
                            type="primary"
                            style={{display: (mainEdit || isOldVersion) ? 'none' : 'inline',marginRight: 30}}
                            onClick={this.customerFocusEdit}
                            disabled={is_exist === 0 ? true : false}
                        >编辑</Button>
                    </Tooltip>
                </Row>
            </div>
        );
    }
}
export default Form.create()(CustomerFocusForm);
