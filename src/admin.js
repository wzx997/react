import React from "react";
import { Row, Col } from 'antd';

import Header from './components/header';//默认会加载index.js文件
import Footer from './components/footer';
import NavLeft from "./components/navLeft";
// import Home from './pages/home'
import './style/common.less';//导入样式

export default class Admin extends React.Component{
    render() {
        return (
            <div>
                <Row className="container">
                    {/*左侧区域*/}
                    <Col span={4} className="nav-left">
                        <NavLeft></NavLeft>
                    </Col>
                    {/*右侧区域*/}
                    <Col span={20} className="main">
                        <Header></Header>
                        <Row className="content">
                            {/*这里是内容部分*/}
                            {/*<Home/>*/}
                            {this.props.children}
                        </Row>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        );
    }
}