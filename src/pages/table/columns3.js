import {Divider} from "antd";
import React from "react";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) =>{
            return a.id - b.id;
        }
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
            return text === 0 ? '男' : '女'
        }
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) =>{
            return a.age - b.age;
        }
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