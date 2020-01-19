import React from "react";
import {Card, Button, notification, Divider, Icon } from 'antd';
import '../ui.less';

export default class Notices extends React.Component{

    //普通弹框调用的方法
    openNotificationWithIcon = (type) => {
        notification[type]({
            message: '右侧通知框',
            description: '欢迎学习React高级课程！',
            duration:3,
            onClick: () => {
                console.log('点击了通知体!');
            },
            onClose: () => {//即使不点击，时间到后也会自定触发
                console.log('点击了关闭按钮!');
            },
        });
    };

    //自定义关闭按钮
    closeBtn = () => {
        const key = '1';
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                关闭
            </Button>
        );
        const icon = <Icon type="exclamation-circle" style={{color:'#E99629'}}/>
        notification.open({
            message: '手动关闭的通知框',
            description: '欢迎学习React高级课程！',
            duration:0,
            btn,
            key,
            icon
        });
    }

    //自定义方向
    openNotification = (placement) => {
        notification.success({
            message: `通知框 ${placement}`,
            description:
                '欢迎学习React高级课程',
            placement,
        });
    };

    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
                    <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
                    <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
                    <Button onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
                </Card>

                <Card title="自定义关闭按钮" className="card-wrap">
                    <Button onClick={this.closeBtn}>手动关闭</Button>
                </Card>

                <Card title="自定义方向按钮" className="card-wrap">
                    <Button icon="radius-upleft" type="primary" onClick={() => this.openNotification('topLeft')}>
                        左上
                    </Button>
                    <Button icon="radius-upright" type="primary" onClick={() => this.openNotification('topRight')}>
                        右上
                    </Button>
                    <Divider />{/*分割线*/}
                    <Button icon="radius-bottomleft" type="primary" onClick={() => this.openNotification('bottomLeft')}>
                        左下
                    </Button>
                    <Button icon="radius-bottomright" type="primary" onClick={() => this.openNotification('bottomRight')}>
                        右下
                    </Button>
                </Card>
            </div>
        );
    }
}