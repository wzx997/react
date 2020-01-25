import {Divider,Badge} from "antd";
import React from "react";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        sorter: true
    },
    {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (text) => {
            return text === 0 ? <Badge color='blue' text='男'/> : <Badge color='green' text='女'/>;
        }
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: true
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <a href="/#/admin">邀请{record.name}</a>
                <Divider type="vertical" />
                <a href="/#/admin">删除</a>
            </span>
        ),
    },
];

export default columns;