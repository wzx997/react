import React from "react";
import {Table, message, Modal} from 'antd';
import axios from '../../../axios/index';

export default class LinkmanTable extends React.Component{
    state = {
        loadStatus:true,
        company_id: -1,
        type: '',
        tableData: [],
        visible: false,
    }

    /**
     * 获取联系人历史信息
     * @param company_id int 公司id信息
     * @param  string 联系人类型，我司联系人还是客户联系人
     */
    getLinkmanData = (company_id,type) => {
        let url = '';
        if (type === 'companyLinkman'){
            url = 'pss_test/companyLinkMan';
        }else {
            url = 'pss_test/ourLinkMan';
        }
        axios.ajax({
            url: url,
            data: {
                params: {
                    id: company_id
                }
            }
        }).then((res) => {
            if (res.code !== 0) {
                message.error(res.msg, 2);
            } else {
                this.setState({
                    tableData: res.data,
                    type: type,
                    company_id: company_id,
                    loadStatus: false,
                    visible: true
                })
            }
        });
    }

    render() {
        const {type, tableData, visible} = this.state;
        const columns = [
            {
                title: '版本ID',
                dataIndex: 'version_id',
                align: 'center'
            },
            {
                title: '姓名',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                align: 'center'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                align: 'center'
            },
            {
                title: '备注',
                dataIndex: 'remark',
                align: 'center'
            },
        ];
        return (
            <div>
                <Modal
                    title={type === 'companyLinkman' ? '客户历史联系人' : '我司历史联系人' }
                    visible={visible}
                    footer={null}
                    width={1000}
                    onCancel={() => this.setState({visible:false})}
                >
                    <Table
                        rowKey={record => record.id}
                        columns={columns}
                        dataSource={tableData}
                    />
                </Modal>
            </div>
        );
    }
}