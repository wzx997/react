import React from "react";
import { Result, Button } from 'antd';
import './index.less';

export default class NoMatch extends React.Component{
    render() {
        return (
            <div>
                <Result
                    status="404"
                    title="404"
                    subTitle="访问出了一些问题，当前访问的页面不存在。"
                    extra={<a href="/#/admin/home"><Button type="primary">Back Home</Button></a>}
                />,
            </div>
        );
    }
}
