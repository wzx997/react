import React from "react";
import moment from "moment";
import {
    Card,
    Form,
    Input,
    Icon,
    Button,
    Checkbox,
    message,
    notification,
    Select,
    Switch,
    DatePicker,
    Tooltip,
    AutoComplete,
    Row,
    Col,
    Cascader,
    Radio,
    InputNumber
} from 'antd';
import '../form.less';
import ProvinceList from '../../../config/provinceConfig';

const {Option} = Select
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
const TextArea = Input.TextArea;

class Reg extends React.Component{
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    //提交表单
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const key = 'update';
                message.loading({content:'正在注册......',key,duration:0});
                setTimeout(()=>{
                    message.success({content:'注册成功！',key,duration:2});
                    this.props.form.resetFields();
                    console.log(JSON.stringify(values));
                }, 2000);
            }else {
                notification.error({
                        message:'发生了一些错误！！！',
                        description:'请确信息填写完成。'
                    }
                )
            }
        });
    };

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    //确认密码失去焦点的事件
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    //比较两次密码是否一致
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    };

    //处理自动获取网站的事件
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net', '.cn'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        //定义文字与表格宽度
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 4,
                },
            },
        };

        //定义自动录入选项
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));

        //定义电话号码前缀
        const prefixSelector = getFieldDecorator('phone_prefix', {
            initialValue: ['86'],
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );

        return (
            <div>
                <Card title="注册组件" className="card-wrap">
                    <Form  {...formItemLayout} onSubmit={this.handleSubmit}>
                        <FormItem label="姓名" hasFeedback>
                            {getFieldDecorator('name', {
                                initialValue: '',
                                rules: [{required: true, message: '请输入用户名！'},
                                    {max: 20, min: 2, message: '长度必须为2-10个字符！'},
                                ],
                            })(
                                <Input
                                    placeholder="请输入用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            label={
                                <span>
                                    昵称&nbsp;
                                    <Tooltip title="请输入你的昵称。">
                                        <Icon type="question-circle-o" style={{color:'#1890ff'}}/>
                                    </Tooltip>
                                </span>
                            }
                            hasFeedback
                        >
                            {getFieldDecorator('nickname', {
                                initialValue: ''
                            })(
                                <Input
                                    placeholder="请输入昵称"
                                />
                            )}
                        </FormItem>
                        <FormItem label="密码" hasFeedback>
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{required: true, message: '请输入密码！'},
                                    {max: 16, min: 7, message: '请确认长度在7-16之间！'}
                                    ],
                            })(
                                <Input.Password
                                    placeholder="请输入密码，7-16个字符"
                                />
                            )}
                        </FormItem>
                        <FormItem label="确认密码" hasFeedback>
                            {getFieldDecorator('confirm', {
                                initialValue: '',
                                rules: [{required: true, message: '请再次输入密码！'},
                                    {validator: this.compareToFirstPassword},
                                ],
                            })(
                                <Input.Password
                                    placeholder="请再次输入密码"
                                    onBlur={this.handleConfirmBlur}
                                />
                            )}
                        </FormItem>
                        <FormItem label="邮箱" hasFeedback>
                            {getFieldDecorator('e_mail', {
                                initialValue: '',
                                rules: [{required: true, message: '请输入邮箱！'},
                                    {type:'email', message: '请输入合法邮箱格式！'},
                                ],
                            })(
                                <Input
                                    placeholder="请输入邮箱地址"
                                />
                            )}
                        </FormItem>
                        <FormItem label="博客主页地址" hasFeedback>
                            {getFieldDecorator('website', {
                                initialValue: '',
                            })(
                                <AutoComplete
                                    dataSource={websiteOptions}
                                    onChange={this.handleWebsiteChange}
                                >
                                    <Input
                                        placeholder="请输入博客主页地址"
                                    />
                                </AutoComplete>,
                            )}
                        </FormItem>
                        <Form.Item label="电话">
                            <Row gutter={10}>
                                <Col span={16}>
                                    {getFieldDecorator('phone', {
                                        initialValue: '',
                                        rules: [{required: true, message: '请输入电话号码!'}],
                                    })(
                                        <Input
                                            addonBefore={prefixSelector}
                                            style={{width: '100%'}}
                                            placeholder="请输入电话号码"
                                        />
                                    )}
                                </Col>
                                <Col span={6}>
                                    <Button>获取验证码</Button>
                                </Col>
                            </Row>
                        </Form.Item>
                        <FormItem label="验证码" hasFeedback>
                            {getFieldDecorator('captcha', {
                                initialValue: '',
                                rules: [{required: true, message: '请输入验证码!'}],
                            })(
                                <Input
                                    placeholder="请输入验证码"
                                />
                            )}
                        </FormItem>
                        <Form.Item label="城市">
                            {getFieldDecorator('city', {
                                initialValue:[],
                            })(
                                <Cascader
                                    options={ProvinceList}
                                    placeholder="请选择城市"
                                />
                            )}
                        </Form.Item>
                        <FormItem label="地址" hasFeedback>
                            {getFieldDecorator('address', {
                                initialValue: '',
                            })(
                                <Input
                                    placeholder="请输入地址"
                                />
                            )}
                        </FormItem>
                        <FormItem label="性别">
                            {getFieldDecorator('sex', {
                                initialValue: 0,
                            })(
                                <Radio.Group>
                                    <Radio value={0}>男</Radio>
                                    <Radio value={1}>女</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                        <FormItem label="年龄">
                            {getFieldDecorator('age', {
                                initialValue: 18,
                            })(
                                <InputNumber min={1} max={100}/>
                            )}
                        </FormItem>
                        <FormItem label="级别">
                            {getFieldDecorator('staus', {
                                initialValue: 0,
                            })(
                                <Select>
                                    <Option value={0}>初级程序员</Option>
                                    <Option value={1}>中级程序员</Option>
                                    <Option value={2}>高级程序员</Option>
                                    <Option value={3}>资深程序员</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="爱好">
                            {getFieldDecorator('hobby', {
                                initialValue: [],
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
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
                        <FormItem label="是否已婚">
                            {getFieldDecorator('isMarried', {
                                valuePropName:'checked',
                                initialValue: true
                            })(
                                <Switch checkedChildren="是" unCheckedChildren="否"/>
                            )}
                        </FormItem>
                        <FormItem label="生日">
                            {getFieldDecorator('birthday', {
                                initialValue: moment(),
                            })(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD"
                                />
                            )}
                        </FormItem>
                        <FormItem label="描述">
                            {getFieldDecorator('desc', {
                                initialValue: '',
                            })(
                                <TextArea
                                    rows={4}
                                    allowClear
                                    placeholder="输入一些描述信息......"
                                />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                initialValue:false,
                                rules: [{required: true, message: '请勾选同意按钮!'}],
                            })(
                                <Checkbox>
                                    我已经详细阅读并 <a href="/#/admin">客户注册协议</a>
                                </Checkbox>,
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">登录</Button>
                            <Button onClick={this.handleReset} className="reset-btn">重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(Reg);