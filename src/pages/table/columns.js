import {Divider} from "antd";
import React from "react";

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        width:75,
    },
    {
        title: '用户名',
        dataIndex: 'name',
        key: 'name',
        width:115
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        width:95,
        render: (text) => {
            return text === 0 ? '男' : '女'
        }
    },
    {
        title: '状态',
        dataIndex: 'state',
        key: 'state',
        width:120,
        render: (text) => {
            let config = {
                0:'初级程序员',
                1:'中级程序员',
                2:'高级程序员',
                3:'资深程序员',
            };
            return config[text];
        }
    },
    {
        title: '爱好',
        dataIndex: 'hobby',
        key: 'bobby',
        width:150,
        render: (text) => {
            let config = {
                0:'唱歌',
                1:'跑步',
                2:'篮球',
                3:'足球',
                4:'阅读',
                5:'旅游',
            }
            let res = '';

            text.forEach(item => {
                res = config[item]+ ',' + res;
            });
            return res;
        }
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        width:150,
        key: 'birthday',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        width:90,
        key: 'age'
    },
    {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
        width:200,
    },
    {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        width:160,
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