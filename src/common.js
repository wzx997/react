import React from "react";
import { Row, } from 'antd';

import Header from './components/header';//默认会加载index.js文件
import './style/common.less';//导入样式

export default class Common extends React.Component{
    render() {
        return (
            <div className="container">
                <Row className="simple-page">
                    <Header menuType="second"/>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        );
    }
}