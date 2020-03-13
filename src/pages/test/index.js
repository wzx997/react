import React from "react";
import { Card,Descriptions } from 'antd';

import './index.less';

export default class Test extends React.Component{
    render() {
        return (
            <div>
                <Card>
                    <Descriptions title="User Info">
                        <Descriptions.Item label="UserName"  >Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Address" span={1}>
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                    </Descriptions>
                </Card>

            </div>
        );
    }
}