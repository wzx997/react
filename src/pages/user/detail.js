import React from "react";
import {Card, Descriptions} from 'antd';

import './index.less';

export default class StaffDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userId:this.props.match.params.userId
        }
    }

    render() {
        return (
            <div>
                <Card title={`id为${this.state.userId}的信息`} className="card-wrap">
                    <Descriptions title="User Info">
                        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                        <Descriptions.Item label="Address">
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        );
    }
}