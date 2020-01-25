import {Divider} from "antd";
import React from "react";

const columns2 = [
    {
        title: '姓名',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
    },
    {
        title: '年龄',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left',
    },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: 'Column 5', dataIndex: 'address', key: '5' },
    { title: 'Column 6', dataIndex: 'address', key: '6' },
    { title: 'Column 7', dataIndex: 'address', key: '7' },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    { title: 'Column 9', dataIndex: 'address', key: '9' },
    { title: 'Column 10', dataIndex: 'address', key: '10' },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        render: (text, record) => (
            <span>
                <a href="/#/admin">邀请{record.name}</a>
                <Divider type="vertical" />
                <a href="/#/admin">删除</a>
            </span>
        ),
    },
];

export default columns2;