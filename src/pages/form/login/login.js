import React from "react";
import {Card, Form,Input, Icon, Button, Checkbox,message,notification} from 'antd';
import '../form.less';

const FormItem = Form.Item;

class Login extends React.Component{
    //提交事件
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                message.success(`${values.username}：恭喜你，学习了登录表单`)
            }else {
                notification.error({
                    message:'发生了一些错误！！！',
                    description:'请确信息填写完成。'
                    }
                )
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录内联表单" className="card-wrap">
                    <Form layout="inline">
                        <FormItem>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名"
                            />
                        </FormItem>
                        <FormItem>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入密码"
                                type="password"
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="登录水平表单" className="card-wrap">
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('username', {
                                initialValue: '',
                                rules: [{required: true, message: '请输入用户名！'}],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="请输入用户名"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password',{
                                initialValue:'',
                                rules: [{required: true, message: '请输入密码！'}]
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入密码"
                                    type="password"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>记住我</Checkbox>)}
                            <a className="login-form-forgot" href="/#/admin">
                                忘记密码
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Form.create()(Login);