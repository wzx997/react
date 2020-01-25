import React from "react";
import {Card, Button, Modal,Popconfirm,message } from 'antd';
import '../ui.less';

export default class Modals extends React.Component{
    state = {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false,
        confirmLoading: false,
    };

    //展示model框
    showModal = (type) => {
        this.setState({
            [type]: true,
        });
    };

    showConfirm = (type) => {
        //使用Modal[type],例如Modal[confirm]和Modal.confirm等价
        Modal[type]({
            title: '请确认信息'+type,
            content: '是否学会了react',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                console.log('点击了确认')
            },
            //取消按钮不可点击
            cancelButtonProps:{ disabled: true }
        });
    };


    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button  type="primary" onClick={()=>this.showModal('visible1')}>Open</Button>
                    <Button  type="primary" onClick={()=>this.showModal('visible2')}>自定义页脚</Button>
                    <Button  type="primary" onClick={()=>this.showModal('visible3')}>顶部20px弹框</Button>
                    <Button  type="primary" onClick={()=>this.showModal('visible4')}>异步关闭</Button>
                </Card>

                <Card title="信息确认框" className="card-wrap">
                    <Button onClick={()=>this.showConfirm('confirm')}>Confirm</Button>
                    <Button onClick={()=>this.showConfirm('error')}>Error</Button>
                    <Button onClick={()=>this.showConfirm('info')}>Info</Button>
                    <Button onClick={()=>this.showConfirm('success')}>Success</Button>
                    <Button onClick={()=>this.showConfirm('warning')}>Warning</Button>
                </Card>

                <Card title="气泡确认框" className="card-wrap">
                    <Popconfirm
                        title="确定删除本条数据数据吗?"
                        onConfirm={() => {
                            message.success('点击了确认')
                        }}
                        onCancel={() => {
                            message.error('点击了取消')
                        }}
                    >
                        <Button type='danger'>删除</Button>
                    </Popconfirm>
                </Card>

                {/*普通open弹框*/}
                <Modal
                    title="基础模态框"
                    visible={this.state.visible1}
                    onOk={()=>{
                        this.setState({
                            visible1: false,
                        });
                    }}
                    onCancel={()=>{
                        this.setState({
                            visible1: false,
                        });
                    }}
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                    <p>普通open弹框</p>
                </Modal>

                {/*自定义页脚弹框*/}
                <Modal
                    title="基础模态框"
                    visible={this.state.visible2}
                    onOk={()=>{
                        this.setState({
                            visible2: false,
                        });
                    }}
                    onCancel={()=>{
                        this.setState({
                            visible2: false,
                        });
                    }}
                    okText="好的"
                    cancelText="算了"
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                    <p>自定义页脚弹框</p>
                </Modal>

                {/*顶部20px*/}
                <Modal
                    style={{top:20}}// 顶部20px
                    title="基础模态框"
                    visible={this.state.visible3}
                    onOk={()=>{
                        this.setState({
                            visible3: false,
                        });
                    }}
                    onCancel={()=>{
                        this.setState({
                            visible3: false,
                        });
                    }}
                    okText="好的"
                    cancelText="算了"
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                    <p>顶部20px</p>
                </Modal>

                {/*异步关闭*/}
                <Modal
                    style={{top:20}}// 顶部20px
                    title="基础模态框"
                    visible={this.state.visible4}
                    confirmLoading={this.state.confirmLoading}
                    onOk={()=>{
                        this.setState({
                            confirmLoading: true,
                        });
                        setTimeout(() => {
                            this.setState({
                                visible4: false,
                                confirmLoading: false,
                            });
                        }, 2000);
                    }}
                    onCancel={()=>{
                        this.setState({
                            visible4: false,
                        });
                    }}
                    okText="好的"
                    cancelText="算了"
                    //不可点击的取消按钮
                    cancelButtonProps={{ disabled: true }}
                >
                    <p>欢迎学习慕课新推出的React高级课程</p>
                    <p>异步关闭，两秒后关闭</p>
                </Modal>

            </div>
        );
    }

}