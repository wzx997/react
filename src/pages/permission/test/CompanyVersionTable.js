import React from "react";
import {Table, message} from 'antd';
import axios from '../../../axios/index';
import TestModal from "./index";

export default class CompanyVersionTable extends React.Component {
    state = {
        company_id: -1,
        loadStatus: true,
        versionList:[]
    };

    componentDidMount() {
        const company_id = this.props.company_id;
        this.setState({company_id: company_id})
        this.getVersionId(company_id);
    }

    getVersionId = (company_id) => {
        axios.ajax({
            url: 'pss_test/getVersionId',
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
                    versionList: res.data.CompanyVersion,
                })
            }
        });
    }

    getHistoryData = (version_id) => {
        const company_id = this.state.company_id;
        console.log('company_id',company_id);
        console.log('version_id',version_id);
        // this.testModal.getHistoryVsersion(company_id,version_id);
        this.testModal.closeDrawer();
    }

    render() {
        const columns = [
            {
                title: '版本号',
                dataIndex: 'version_id',
                key: 'version_id',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                key: 'create_time',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <span
                            onClick={() => this.getHistoryData(record.version_id)}
                            style={{color: '#1890ff', cursor: 'pointer',}}
                        >查看</span>
                    </span>
                ),
            },
        ];
        return (
            <div>
                <Table
                    rowKey={record => record.version_id}
                    size="small"
                    columns={columns}
                    dataSource={this.state.versionList}
                />
                <TestModal ref={v => this.testModal = v}/>
            </div>
        );
    }
}