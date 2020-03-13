import React from "react";
import {
    Row, Col,
    Button, Form, Input, Select, DatePicker, Tooltip, Icon,
} from 'antd';
import moment from "moment";

const FormItem = Form.Item;
const {Option} = Select;

class BackgroundForm extends React.Component {
    state = {
        isEdit: false,
    };

    //点击编辑按钮进入到编辑状态
    backgroundEdit = () => {
        this.setState({
            isEdit: true,
        })
    }

    //基本信息取消按钮对应的事件
    backgroundCancel = () => {
        this.props.form.resetFields();
        this.setState({
            isEdit: false,
        })
    }

    /**
     * 添加表单项
     * @param len int 传入数组的长度，目的是假设表单项全部删除后有值
     */
    add = (len) => {
        const {form} = this.props;
        let keys = form.getFieldValue('keys')
        keys = keys ? keys : [0];
        const nextKeys = keys.length === 0 ? keys.concat(len) : keys.concat(keys[keys.length - 1] + 1);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    /**
     * 移除表单项
     * @param k int 需要移除的key
     */
    remove = (k) => {
        const {form} = this.props;
        const keys = form.getFieldValue('keys');
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    //提交背景调研表单
    handleSubmitBackground = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err){
                return;
            }
            delete values.keys;
            values.competitors = values.competitors ? values.competitors.filter(item => item) : [];
            values.switch_time = values.switch_time ? values.switch_time.format('YYYY-MM-DD') : ''

            values.competitors = values.competitors.map(value => {
                value.bandwidth_trend = parseInt(value.bandwidth_trend);
                return value;
            })


            console.log(values);
            this.backgroundCancel()
        })
    }

    render() {
        const {background, id, mainEdit, isOldVersion, is_exist,
            form: {getFieldDecorator, getFieldValue}} = this.props;
        const {isEdit} = this.state;
        const info = {//取出对应数据，多次使用
            bandwidth_trend: background.bandwidth_trend ? background.bandwidth_trend : '--',
            speed_vendor: background.speed_vendor ? background.speed_vendor : '--',
            bandwidth_mix: background.bandwidth_mix ? background.bandwidth_mix : '--',
            switch_time: background.switch_time ? background.switch_time : null,
            bandwidth_change_basis: background.bandwidth_change_basis ? background.bandwidth_change_basis : '--',
            is_build_cdn: background.is_build_cdn ? background.is_build_cdn : 0,
            is_invest: background.is_invest ? background.is_invest : 0,
            our_plan: background.our_plan ? background.our_plan : '--',
            competitors: background.competitors ? background.competitors : []
        };
        const temp = [];
        info.competitors.map((_, index) => temp.push(index));
        getFieldDecorator('keys', {initialValue: temp});
        const keys = getFieldValue('keys') ? getFieldValue('keys') : [];

        const dynamicCompetitorsItems = keys.map((k) => (
            <div key={k} style={{marginLeft: 50}}>
                <Row>
                    <Col span={8}>
                        <FormItem label='公司名'>
                            {getFieldDecorator(`competitors[${k}].competitor_name`, {
                                initialValue: info.competitors[k] ? info.competitors[k].competitor_name : '',
                                rules: [{required: true, message: '请填入公司名',}],
                            })(
                                <Input style={{width: 230}} size='small'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label='公司量级'>
                            {getFieldDecorator(`competitors[${k}].bandwidth_trend`, {
                                initialValue: info.competitors[k] ? info.competitors[k].bandwidth_trend : 0,
                                rules: [{
                                    pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                    message: '公司量级填入非0开头的整数!'
                                }],
                            })(
                                <Input style={{width: 170}} size='small'
                                       addonAfter={
                                           getFieldDecorator(`competitors[${k}].brandwith_unit`, {
                                               initialValue: info.competitors[k] ? info.competitors[k].bandwidth_trend_unit : 'MB',
                                           })(
                                               <Select style={{width: 70}}>
                                                   <Option value="MB">MB</Option>
                                                   <Option value="GB">GB</Option>
                                               </Select>,
                                           )
                                       }
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='公司备注'>
                            {getFieldDecorator(`competitors[${k}].remark`, {
                                initialValue: info.competitors[k] ? info.competitors[k].remark : '',
                            })(
                                <Input style={{width: 280}} size='small'/>
                            )}
                        </FormItem>
                    </Col>
                    <Tooltip title='删除此项'>
                        <Icon
                            style={{
                                cursor: 'pointer',
                                fontSize: 20,
                                color: '#999',
                                marginTop: 8,
                                marginLeft: -10
                            }}
                            type="close-circle"
                            onClick={() => this.remove(k)}
                        />
                    </Tooltip>
                </Row>
            </div>
        ));
        const staticCompetitorsItems = info.competitors.map((key,index) => (
            <div key={index} style={{marginLeft: 50}}>
                <Row>
                    <Col span={8}>
                        <FormItem label='公司名'>
                            <span>{key.competitor_name ? key.competitor_name : '--'}</span>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label='公司量级'>
                            <span>
                                {key.bandwidth_trend ? key.bandwidth_trend : '--'}&nbsp;
                                {key.bandwidth_trend_unit ? key.bandwidth_trend_unit : 'MB'}
                                </span>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label='公司备注'>
                            <span>{key.remark ? key.remark : '--'}</span>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        ));

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
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='带宽趋势预测'>
                                    {getFieldDecorator('bandwidth_trend', {
                                        initialValue: info.bandwidth_trend,
                                    })(
                                        <Input size="small" style={{width: 250}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='带宽趋势预测'>
                                    <span>{info.bandwidth_trend}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='加速厂商'>
                                    {getFieldDecorator('speed_vendor', {
                                        initialValue: info.speed_vendor,
                                    })(
                                        <Input size="small" style={{width: 250}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='加速厂商'>
                                    <span>{info.speed_vendor}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='我司带宽占比'>
                                    {getFieldDecorator('bandwidth_mix', {
                                        initialValue: info.bandwidth_mix,
                                    })(
                                        <Input size="small" style={{width: 250}} suffix="%"/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='我司带宽占比'>
                                    <span>{info.bandwidth_mix}&nbsp;%</span>
                                </FormItem>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='客户上量时间'>
                                    {getFieldDecorator('switch_time', {
                                        initialValue: info.switch_time ? moment(info.switch_time, 'YYYY-MM-DD') : moment(),
                                    })(
                                        <DatePicker
                                            size="small"
                                            format="YYYY-MM-DD"
                                            style={{width: 250}}
                                        />
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='客户上量时间'>
                                    <span>{info.switch_time ? info.switch_time : '--'}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='带宽调整依据'>
                                    {getFieldDecorator('bandwidth_change_basis', {
                                        initialValue: info.bandwidth_change_basis,
                                    })(
                                        <Input size="small" style={{width: 250}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='带宽调整依据'>
                                    <span>{info.bandwidth_change_basis}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label="客户是否自建CDN">
                                    {getFieldDecorator('is_build_cdn', {
                                        initialValue: 0,
                                    })(
                                        <Select size="small" style={{width: 250}}>
                                            <Option value={0}>否</Option>
                                            <Option value={1}>是</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='客户是否自建CDN'>
                                    <span>{info.is_build_cdn === 1 ? '是' : '否'}</span>
                                </FormItem>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label="是否友商投资">
                                    {getFieldDecorator('is_invest', {
                                        initialValue: 0,
                                    })(
                                        <Select size="small" style={{width: 250}}>
                                            <Option value={0}>否</Option>
                                            <Option value={1}>是</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='是否友商投资'>
                                    <span>{info.is_invest === 1 ? '是' : '否'}</span>
                                </FormItem>
                            )}
                        </Col>
                        <Col span={8}>
                            {(isEdit || mainEdit) ? (
                                <FormItem label='我司计划目标'>
                                    {getFieldDecorator('our_plan', {
                                        initialValue: info.our_plan,
                                    })(
                                        <Input size="small" style={{width: 250}}/>
                                    )}
                                </FormItem>
                            ) : (
                                <FormItem label='我司计划目标'>
                                    <span>{info.our_plan}</span>
                                </FormItem>
                            )}
                        </Col>
                    </Row>

                    <Row>
                        <FormItem label='竞争对手分析'>
                            {(isEdit || mainEdit) ? (
                                <Button
                                    type="primary"
                                    icon="plus"
                                    size='small'
                                    onClick={() => this.add(info.competitors.length)}
                                >添加</Button>
                            ) : ''
                            }
                        </FormItem>
                    </Row>
                    {(isEdit || mainEdit) ? dynamicCompetitorsItems : staticCompetitorsItems}
                </Form>
                <Row style={{marginTop: 15, textAlign: 'right'}}>
                    <Button
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none', marginRight: 30}}
                        onClick={this.backgroundCancel}
                    >取消</Button>
                    <Button
                        type="primary"
                        style={{display: (isEdit && !mainEdit) ? 'inline' : 'none', marginRight: 30}}
                        onClick={this.handleSubmitBackground}
                    >提交</Button>
                    <Tooltip title={is_exist === 0 ? '请先创建客户档案' : '编辑本模块信息'}>
                        <Button
                            type="primary"
                            style={{display: (mainEdit || isOldVersion) ? 'none' : 'inline', marginRight: 30}}
                            onClick={this.backgroundEdit}
                            disabled={is_exist === 0 ? true : false}
                        >编辑</Button>
                    </Tooltip>
                </Row>
            </div>
        );
    }
}

export default Form.create()(BackgroundForm);
