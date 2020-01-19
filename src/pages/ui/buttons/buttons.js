import React from "react";
import {Card, Button, Radio} from 'antd';
import '../ui.less'


export default class Buttons extends React.Component{
    state = {
        loading: false,
        iconLoading: false,
        size:'default'
    };

    enterLoading = () => {
        this.setState({ loading: true });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };

    handleChange = (e) => {
        this.setState({
            size:e.target.value
        })
    }

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>

                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete" type="danger">删除</Button>
                    <Button shape="circle" icon="search"></Button>
                    <Button icon="search">搜索</Button>
                    <Button icon="download">下载</Button>
                </Card>

                <Card title="Loading按钮" className="card-wrap">
                    <Button loading >加载中</Button>
                    <Button loading={this.state.loading} onClick={this.enterLoading}>
                        点击加载
                    </Button>
                    <Button icon="poweroff" loading={this.state.iconLoading}onClick={this.enterIconLoading}>
                        点击加载!
                    </Button>
                    <Button shape="circle" loading></Button>
                </Card>

                <Card title="按钮组">
                    <Button.Group >
                        <Button type="primary" icon="left">前进</Button>
                        <Button type="primary" icon="right" >后退</Button>
                    </Button.Group>
                </Card>

                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>Imooc</Button>
                    <Button disabled size={this.state.size}>Imooc</Button>
                </Card>
            </div>
        );
    }
}