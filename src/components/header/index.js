import React from "react";
import { Row, Col } from 'antd';
import './index.less'
import Utils from '../../utils/utils.js'

export default class Header extends React.Component{
    state = {};
    componentWillMount() {
        this.setState({
            userName:'测试用户'
        });
        setInterval(()=>{
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000)
    }

    render() {
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType ? (
                            <Col span={4}>
                                <span style={{fontSize:24}}>IMooc 通用管理系统！</span>
                            </Col>
                        ) : ''
                    }
                    <Col span={menuType ? 20 : 24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="/#/admin">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' : (
                        <Row className="breadcrumb">
                            <Col span={4} className="breadcrumb-title">
                                首页
                            </Col>
                            <Col span={20} className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-detail">晴转多云</span>
                            </Col>
                        </Row>
                    )
                }
            </div>
        )
    }

}