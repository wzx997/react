const columns = [
    {
        title: '城市id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '城市名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '用车模式',
        dataIndex: 'mode',
        key: 'mode',
        render: text => {
            return text === 1 ? '指定停车点模式' : '禁停区模式';
        }
    },
    {
        title: '运营模式',
        dataIndex: 'op_mode',
        key: 'op_mode',
        render: text => {
            return text === 1 ? '自营' : '加盟';
        }
    },
    {
        title: '授权加盟商',
        dataIndex: 'franchisee_name',
        key: 'franchisee_name',
    },
    {
        title: '城市管理员',
        dataIndex: 'city_admins',
        key: 'city_admins',
        render:(text) => {
            return text.map((item) => {
                return item.user_name
            }).join(',')
        }
    },
    {
        title: '城市开通时间',
        dataIndex: 'open_time',
        key: 'open_time',
    },
    {
        title: '操作时间',
        dataIndex: 'update_time',
        key: 'update_time',
    },
    {
        title: '操作人',
        dataIndex: 'sys_user_name',
        key: 'sys_user_name',
    }
];

export default columns;