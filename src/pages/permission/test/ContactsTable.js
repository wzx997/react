import React from "react";
import {Table} from 'antd';

export default class ContactsTable extends React.Component{
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'contact_name',
                key: 'contact_name',
                align: 'center'
            },
            {
                title: '职位',
                dataIndex: 'contact_position',
                key: 'contact_position',
                align: 'center'
            },
            {
                title: '产品线',
                dataIndex: 'product_line',
                key: 'product_line',
                align: 'center'
            },
            {
                title: '电话',
                dataIndex: 'contact_phone',
                key: 'contact_phone',
                align: 'center'
            },
            {
                title: '座机',
                dataIndex: 'landline',
                key: 'landline',
                align: 'center'
            },
            {
                title: 'QQ',
                dataIndex: 'qq',
                key: 'qq',
                align: 'center'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
                align: 'center'
            },
        ];
        const {contacts} = this.props;
        return (
            <div>
                <Table
                    rowKey={record => record.contact_name}
                    columns={columns}
                    dataSource={contacts}
                    pagination={false}
                    bordered
                    size="small"
                />
            </div>
        );
    }
}

