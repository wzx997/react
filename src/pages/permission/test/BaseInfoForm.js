import React from "react";
import {
    Row, Col,
    Button, Form, Input, Select, Tooltip,Collapse
} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;
const { Panel } = Collapse;

class BaseInfoForm extends React.Component{
    state = {
        isEdit: false,
    };

    //数组转为字符串
    arrToStr = (data) => {
        return data.map((item) => {
            return item
        }).join(',')
    }

    //点击编辑按钮进入到编辑状态
    baseInfoEdit = () => {
        this.setState({
            isEdit:true,
        })
    }

    //基本信息取消按钮对应的事件
    baseInfoCancel = () => {
        this.props.form.resetFields();
        this.setState({
            isEdit:false,
        });
    }

    //提交基础概况部分的表单
    handleSubmitBaseInfo = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err){
                return;
            }
            console.log(values);
            //todo 调用更新基本信息的方法，刷新页面
            this.props.getCurrentVersion2(values.company_id);
            this.baseInfoCancel()
        })
    }

    render() {
        const {baseinfo, id, mainEdit, isOldVersion, is_exist,
            form:{getFieldDecorator}} = this.props;
        const {isEdit} = this.state;
        const info = {//取出对应数据，多次使用
            company_name : baseinfo.company_name ? baseinfo.company_name : '--',
            address : baseinfo.address ? baseinfo.address : '--',
            industry : baseinfo.industry ? baseinfo.industry : '--',
            level: baseinfo.level ? baseinfo.level : '--',
            predict_bandwidth : baseinfo.predict_bandwidth ? baseinfo.predict_bandwidth : 0,
            predict_bandwidth_unit : baseinfo.predict_bandwidth_unit ? baseinfo.predict_bandwidth_unit : 'MB',
            main_products : baseinfo.main_products ? baseinfo.main_products : '--',
            remark : baseinfo.remark ? baseinfo.remark : '--',
            // 合同生效时间
            contract_valid_date: baseinfo.contract && baseinfo.contract[0] && baseinfo.contract[0].contract_valid_date ?
                baseinfo.contract[0].contract_valid_date : '0000-00-00',
            // 合同失效时间
            contract_invalid_date: baseinfo.contract && baseinfo.contract[0] && baseinfo.contract[0].contract_invalid_date ?
                baseinfo.contract[0].contract_invalid_date : '0000-00-00',
            // CRM预测带宽
            paln_bandwidth: (baseinfo.contract && baseinfo.contract[0]
                && baseinfo.contract[0].customer_ana && baseinfo.contract[0].customer_ana[0]
                && baseinfo.contract[0].customer_ana[0].paln_bandwidth) ?
                baseinfo.contract[0].customer_ana[0].paln_bandwidth : '--',
            // CRM预测带宽单位
            unit: (baseinfo.contract && baseinfo.contract[0]
                && baseinfo.contract[0].customer_ana && baseinfo.contract[0].customer_ana[0]
                && baseinfo.contract[0].customer_ana[0].unit) ?
                baseinfo.contract[0].customer_ana[0].unit : 'Mpbs',
            //获取产品信息
            products: baseinfo.contract && baseinfo.contract[0] && baseinfo.contract[0].products ?
                baseinfo.contract[0].products : []
        };
        //平台预测带宽的单位
        const predict_bandwidth_unit = getFieldDecorator('predict_bandwidth_unit', {
            initialValue: info.predict_bandwidth_unit,
        })(
            <Select style={{ width: 70 }}>
                <Option value="MB">MB</Option>
                <Option value="GB">GB</Option>
            </Select>,
        );

        //产品列表
        const product_list = info.products.map((key,index) => (
            <div key={index} style={{
                border: '1px dashed #cccccc',
                padding: 10,
                marginTop: 10
            }}>
                <Row>
                    <Col span={8}>
                        <FormItem label='主要加速产品'>
                            <span>{key.main_accelerate_type ? key.main_accelerate_type : '--'}</span>
                        </FormItem>
                    </Col>

                    <Col span={16}>
                        <FormItem label='产品计费区域'>
                            <span>{key.charge_area ? key.charge_area : '--'}</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label='产品计费模式'>
                            <span>{key.charge_mode_name ? key.charge_mode_name : '--'}</span>
                        </FormItem>
                    </Col>
                    <Col span={16}>
                        <FormItem label='详细加速产品'>
                            <span>{key.product_list ? key.product_list : '--'}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        ));

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
                        <Col span={8}>
                            <FormItem label='客户名称'>
                                <span>{info.company_name}</span>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='公司地址'>
                                <span>{info.address}</span>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='所属行业'>
                                <span>{info.industry}</span>
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8}>
                            <FormItem label='客户等级'>
                                <span>{info.level}</span>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='合同有效期'>
                                <span>{info.contract_valid_date}~{info.contract_invalid_date}</span>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label='CRM预测带宽'>
                                <span>{info.paln_bandwidth}&nbsp;{info.unit}</span>
                            </FormItem>
                        </Col>
                    </Row>
                    <Collapse accordion style={{marginTop:10,marginBottom:10}}>
                        <Panel header="点击查看产品信息" key="1" >
                            {product_list}
                        </Panel>
                    </Collapse>
                    <Row>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='平台预测带宽'>
                                    {getFieldDecorator('predict_bandwidth', {
                                        initialValue: info.predict_bandwidth,
                                        rules:[{
                                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                            message: '带宽填入非0开头的整数!'
                                        }],
                                    })(
                                        <Input
                                            addonAfter={predict_bandwidth_unit}
                                            size="small"
                                            style={{width:250}}
                                        />
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='平台预测带宽'>
                                    <span>{info.predict_bandwidth}&nbsp;{info.predict_bandwidth_unit}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='主要产品'>
                                    {getFieldDecorator('main_products', {
                                        initialValue: info.main_products,
                                    })(
                                        <Input size="small" style={{width:250}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='主要产品'>
                                    <span>{info.main_products}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='备注信息'>
                                    {getFieldDecorator('remark', {
                                        initialValue: info.remark,
                                    })(
                                        <Input size="small" style={{width:250}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='备注信息'>
                                    <span>{info.remark}</span>
                                </FormItem>
                            )}
                        </Col>
                    </Row>
                </Form>
                <Row style={{ marginTop:15,textAlign: 'right'}}>
                    <Button
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none',marginRight: 30}}
                        onClick={this.baseInfoCancel}
                    >取消</Button>
                    <Button
                        type="primary"
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none',marginRight: 30}}
                        onClick={this.handleSubmitBaseInfo}
                    >提交</Button>
                    <Tooltip title={is_exist === 0 ? '请先创建客户档案' : '编辑本模块信息'}>
                        <Button
                            type="primary"
                            style={{display: (mainEdit || isOldVersion) ? 'none' : 'inline',marginRight: 30}}
                            onClick={this.baseInfoEdit}
                            disabled={is_exist === 0 ? true : false}
                        >编辑</Button>
                    </Tooltip>

                </Row>
            </div>
        );
    }
}
export default Form.create()(BaseInfoForm);
