import React from "react";
import {Form, Input, Icon, Button, Tooltip, Row, Col, Select} from 'antd';
import '../form.less'
import background from './data'

const FormItem = Form.Item;
const {Option} = Select


class DynamicForm extends React.Component{
    add = (len) => {
        console.log('长度',len);
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.length === 0 ? keys.concat(len) : keys.concat(keys[keys.length - 1] + 1);
        // const nextKeys = keys.concat(keys[keys.length - 1] + 1);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    remove = (k) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        console.log('remove',keys);
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                console.log(values.competitors);
                values.competitors = values.competitors ? values.competitors.filter(item => item) : [];
                console.log(values.competitors);
            }
        });
    };
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const temp = [];
        const competitors = background.competitors ? background.competitors : []
        competitors.map((_,index)=> temp.push(index));
        getFieldDecorator('keys', { initialValue: temp});
        const keys = getFieldValue('keys') ? getFieldValue('keys') : [];
        console.log('keys',keys);
        const paramFormItems = keys.map((k) => (
            <div key={k}>
                <Row>
                    <Col span={8}>
                        <FormItem label='公司名'>
                            {getFieldDecorator(`competitors[${k}].competitor_name`, {
                                initialValue: competitors[k] ? competitors[k].competitor_name : '',
                                // rules: [{required: true, message: '请填入公司名',}],
                            })(
                                <Input style={{width:300}} size='small'/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem label='公司量级'>
                            {getFieldDecorator(`competitors[${k}].bandwidth_trend`, {
                                initialValue: competitors[k] ? competitors[k].bandwidth_trend : '',
                            })(
                                <Input style={{width:250}} size='small'
                                       addonAfter={
                                           getFieldDecorator(`competitors[${k}].brandwith_unit`, {
                                               initialValue: competitors[k] ? competitors[k].bandwidth_trend_unit : 'MB',
                                           })(
                                               <Select style={{ width: 70 }}>
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
                                initialValue: competitors[k] ? competitors[k].remark : '',
                            })(
                                <Input style={{width:400}} size='small'/>
                            )}
                        </FormItem>
                    </Col>
                    <Tooltip title='删除此项'>
                        <Icon
                            style={{
                                cursor: 'pointer',
                                fontSize: 20,
                                color: '#999',
                                marginTop:8,
                                marginLeft:-10
                            }}
                            type="close-circle"
                            onClick={() => this.remove(k)}
                        />
                    </Tooltip>
                </Row>
            </div>
        ));
        return (
            <div>
                <Form layout="inline">
                    {paramFormItems}
                </Form>
                <Button onClick={() => this.add(competitors.length)} >
                    <Icon type="plus" /> Add field
                </Button>
                <Button onClick={this.handleSubmit}>
                    提交
                </Button>
            </div>
        );
    }
}
export default Form.create()(DynamicForm);