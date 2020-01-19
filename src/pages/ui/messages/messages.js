import React from "react";
import {Card, Button, message} from 'antd';
import '../ui.less';

export default class Messages extends React.Component{
    //加载普通的弹框
    handleMsg1 = (type) => {
        message[type]('欢迎学习React高级课程！',2)
    }

    //延时加载的弹框
    handleMsg2 = () => {
        message
            .loading('欢迎学习React高级课程！',2)
            .then(()=>message.success('学习成功',2))
            .then(()=>message.info('恭喜！！',2))
    }

    //异步解除的弹框
    handleMsg3 = () => {
        // setTimeout(message.loading('2.5s后自动解除....',0), 2500);
        message.loading('2.5s后自动解除....',2.5);
    }

    //通过key更新内容
    handleMsg4 = () => {
        const key = 'update';
        message.loading({content:'更新中......',key,duration:0});
        setTimeout(()=>{
            message.success({content:'更新成功！',key,duration:2});
            }, 1000);
    }

    render() {
        return (
            <div>
                <Card title="简单的全局messages弹框" className="card-wrap">
                    <Button onClick={()=>this.handleMsg1('success')}>Success</Button>
                    <Button onClick={()=>this.handleMsg1('error')}>Error</Button>
                    <Button onClick={()=>this.handleMsg1('warning')}>Warning</Button>
                </Card>

                <Card title="延时加载弹框" className="card-wrap">
                    <Button onClick={this.handleMsg2}>Success</Button>
                </Card>

                <Card title="异步解除的弹框" className="card-wrap">
                    <Button onClick={this.handleMsg3}>Success</Button>
                </Card>

                <Card title="通过状态解除加载" className="card-wrap">
                    <Button type="primary" onClick={this.handleMsg4}>Success</Button>
                </Card>
            </div>
        );
    }
}