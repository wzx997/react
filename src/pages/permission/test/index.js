import React from "react";
import {
    Modal,
    Row,
    Col,
    Button,
    message,
    Card, Tooltip, notification, Table, Alert, Spin
} from 'antd';

import './index.less';
import axios from '../../../axios/index';

import BaseInfoForm from './BaseInfoForm';
import BackgroundForm from "./BackgroundForm";
import ChanceManageForm from "./ChanceManageForm";
import CustomerFocusForm from "./CustomerFocusForm";
import RiskManageForm from "./RiskManageForm";
import ContactsTable from "./ContactsTable";

export default class TestModal extends React.Component {
    state = {
        visible: false,
        drawerVisible: false,
        historyVisible: false,
        versionIdload: true,
        mainEdit: false,
        isOldVersion: false,
        spinStatus: true,
        data: {},
        versionList: [],
        company_name: '',
        id: -1,
        versionId: -1,
        mainSubmit: 'none',
        overflowY: 'auto',
    };

    //初始化，获取数据同时打开模态框
    init = (id) => {
        console.log(id);
        this.getCurrentVersion(id);
    };

    //获取当前使用的版本
    getCurrentVersion = (company_id) => {
        this.setState({spinStatus: true});
        axios.ajax({
            url: 'pss_test/getData',
            data: {
                params: {
                    company_id: company_id
                }
            }
        }).then((res) => {
            if (res.code !== 0) {
                message.error(res.msg, 2);
            } else {
                this.setState({
                    data: res.data,
                    company_name: res.data.baseinfo && res.data.baseinfo.company_name ? res.data.baseinfo.company_name : '--',
                    visible: true,
                    id: company_id,
                    isOldVersion: false,
                    spinStatus: false
                })
            }
        });
    }
    getCurrentVersion2 = (company_id) => {
        this.setState({spinStatus: true});
        axios.ajax({
            url: 'pss_test/getData2',
            data: {
                params: {
                    company_id: company_id
                }
            }
        }).then((res) => {
            if (res.code !== 0) {
                message.error(res.msg, 2);
            } else {
                this.setState({
                    data: res.data,
                    company_name: res.data.baseinfo.company_name,
                    visible: true,
                    id: company_id,
                    isOldVersion: false,
                    spinStatus: false
                })
            }
        });
    }

    //获取历史版本
    getHistoryVersion = (version_id) => {
        const company_id = this.state.id;
        this.setState({spinStatus: true});
        axios.ajax({
            url: 'pss_test/getHistoryData',
            data: {
                params: {
                    company_id: company_id,
                    version_id: version_id
                }
            }
        }).then((res) => {
            if (res.code !== 0) {
                message.error(res.msg, 2);
            } else {
                // this.closeDrawer();
                this.setState({
                    data: res.data,
                    versionId: version_id,
                    isOldVersion: true,
                    spinStatus: false,
                    historyVisible: false,
                    overflowY: 'auto'
                });
            }
        });
    }

    //获取各历史版本id
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
                    versionIdload: false
                })
            }
        });
    }

    //关闭模态框
    hideModal = () => {
        this.mainCancel();
        this.setState({
            visible: false,
            historyVisible: false,
            overflowY: 'auto'
        });
    };

    //打开历史版本模态框
    openHistoryModal  = () => {
        const company_id = this.state.id;
        this.setState({versionIdload:true ,historyVisible: true, overflowY: 'hidden'});
        this.getVersionId(company_id);
    };


    //关闭历史版本模态框
    closeHistoryModal = () => {
        this.setState({
            historyVisible: false,
        });
    };

    //主页面编辑按钮
    mainEdit = () => {
        this.setState({
            mainSubmit: 'inline',
            mainEdit: true
        })
    };

    //主页面取消按钮
    mainCancel = () => {
        this.baseInfoForm.baseInfoCancel();//同时取消子模块的编辑按钮，目的是重置表单
        this.backgroundForm.backgroundCancel();
        this.chanceManageForm.chanceManageCancel();
        this.customerFocusForm.customerFocusCancel();
        this.riskManageForm.riskManageCancel();
        this.setState({
            mainSubmit: 'none',
            mainEdit: false
        })
    };

    //主页面的提交按钮
    handleSubmit = (e) => {
        e.preventDefault();
        const company_id = this.state.id;
        let baseinfo;
        let background;
        let chanceManage;
        let customerFocus;
        let riskManage;

        this.baseInfoForm.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            delete values.company_id;
            baseinfo = values;
        });

        this.backgroundForm.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            delete values.keys;
            delete values.company_id;
            values.competitors = values.competitors ? values.competitors.filter(item => item) : [];
            values.switch_time = values.switch_time ? values.switch_time.format('YYYY-MM-DD') : ''
            background = values;
        });

        this.chanceManageForm.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            values.company_linkman = values.company_linkman ? values.company_linkman.filter(item => item) : [];
            values.our_linkman = values.our_linkman ? values.our_linkman.filter(item => item) : [];
            const temp = {
                industry_ana: values.industry_ana,
                company_ana: values.company_ana,
                contacts: [...values.company_linkman, ...values.our_linkman]
            };
            chanceManage = temp;
        })

        this.customerFocusForm.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            delete values.company_id;
            customerFocus = values;
        })

        this.riskManageForm.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }
            delete values.company_id;
            riskManage = values;
        })
        if (baseinfo && background && chanceManage && customerFocus && riskManage) {
            //验证通过，可以提交表单
            //TODO 调用接口，关闭编辑按钮（这步已经重置表单），然后再次请求数据，重新渲染页面
            const params = {
                company_id,
                baseinfo,
                background,
                chanceManage,
                customerFocus,
                riskManage
            };
            console.log(params);
            this.getCurrentVersion2(params.company_id);
            this.mainCancel();
        } else {
            notification.error({
                    message: '发生了一些错误！！！',
                    description: '请确信息填写完成。'
                }
            )
        }
    };

    render() {
        const {
            visible, versionIdload, isOldVersion, data, versionList, spinStatus,
            company_name, id, versionId, mainEdit, mainSubmit, overflowY
        } = this.state;
        const columns = [
            {
                title: '版本号',
                dataIndex: 'version_id',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'created_time',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <span>
                        <span
                            onClick={() => this.getHistoryVersion(record.version_id)}
                            style={{color: '#1890ff', cursor: 'pointer',}}
                        >查看</span>
                    </span>
                ),
            },
        ];

        return (
            <div>
                <Modal
                    title='客户档案'
                    visible={visible}
                    footer={null}
                    onCancel={(this.hideModal)}
                    width={1300}
                    maskClosable={false}
                    style={{
                        height: 750,
                        overflowX: 'hidden',
                        overflowY: overflowY,
                        position: 'relative',
                    }}
                >
                    <Spin spinning={spinStatus}>
                        <Row>
                            <Col span={8}></Col>
                            <Col span={8} style={{textAlign: 'center'}}>
                                <h3>{company_name}&nbsp;客户档案</h3>
                            </Col>
                            <Col span={8} style={{textAlign: 'right'}}>
                                <Button
                                    style={{display: mainSubmit, marginRight: 20}}
                                    onClick={this.mainCancel}
                                >取消</Button>
                                <Button
                                    type={"primary"}
                                    style={{display: mainSubmit, marginRight: 20}}
                                    onClick={this.handleSubmit}
                                >提交</Button>
                                <Button
                                    type={"primary"}
                                    style={{display: isOldVersion ? 'inline' : 'none', marginRight: 20}}
                                    onClick={() => this.init(id)}
                                >最新版本</Button>
                                <Tooltip title={(data.is_exist && data.is_exist === 0) ? '创建客户档案' : '编辑客户档案全部信息'}>
                                    <Button
                                        type={"primary"}
                                        style={{display: isOldVersion ? 'none' : 'inline', marginRight: 20}}
                                        onClick={this.mainEdit}
                                    >编辑</Button>
                                </Tooltip>

                                <Button
                                    type={"primary"}
                                    style={{marginRight: 20}}
                                    onClick={() => this.openHistoryModal()}
                                >历史版本</Button>
                            </Col>
                        </Row>

                        {isOldVersion ? (
                            <Alert
                                style={{marginTop: 20}}
                                type="info" showIcon
                                message={`当前信息为 V${versionId} 版本客户档案，您可以点击右上角继续查看历史版本或回到最新版本。`}

                            />
                        ) : (
                            (data.is_exist === 0) ? (
                                <Alert
                                    style={{marginTop: 20}}
                                    type="warning" showIcon
                                    message="当前尚未创建客户档案，您可以点击右上角编辑按钮创建客户档案，否则无法保存历史信息。"
                                />
                            ) : (<Alert
                                style={{marginTop: 20}}
                                type="info" showIcon
                                message="当前信息为最新版本客户档案，您可以点击右上角更新信息或查看历史版本。"
                            />)
                        )}

                        <Card title='客户概况' style={{marginTop: 10}}>
                            <BaseInfoForm
                                baseinfo={data.baseinfo ? data.baseinfo : {}}
                                mainEdit={mainEdit}
                                isOldVersion={isOldVersion}
                                is_exist={data.is_exist}
                                getCurrentVersion2={this.getCurrentVersion2}
                                id={id}
                                wrappedComponentRef={(inst) => {
                                    this.baseInfoForm = inst;
                                }}
                            />
                        </Card>

                        <Card title='背景调研' style={{marginTop: 20}}>
                            <BackgroundForm
                                background={data.background ? data.background : {}}
                                mainEdit={mainEdit}
                                isOldVersion={isOldVersion}
                                is_exist={data.is_exist}
                                id={id}

                                wrappedComponentRef={(inst) => {
                                    this.backgroundForm = inst;
                                }}
                            />
                        </Card>

                        <Card title='机会管理' style={{marginTop: 20}}>
                            <ChanceManageForm
                                chanceManage={data.chanceManage ? data.chanceManage : {}}
                                mainEdit={mainEdit}
                                isOldVersion={isOldVersion}
                                is_exist={data.is_exist}
                                id={id}
                                wrappedComponentRef={(inst) => {
                                    this.chanceManageForm = inst;
                                }}
                            />
                        </Card>

                        <Card title='客户关注点评分' style={{marginTop: 20}}>
                            <CustomerFocusForm
                                customerFocus={data.customerFocus ? data.customerFocus : {}}
                                mainEdit={mainEdit}
                                isOldVersion={isOldVersion}
                                is_exist={data.is_exist}
                                id={id}
                                wrappedComponentRef={(inst) => {
                                    this.customerFocusForm = inst;
                                }}
                            />
                        </Card>

                        <Card title='风险分析' style={{marginTop: 20}}>
                            <RiskManageForm
                                riskManage={data.riskManage ? data.riskManage : {}}
                                mainEdit={mainEdit}
                                isOldVersion={isOldVersion}
                                is_exist={data.is_exist}
                                id={id}
                                wrappedComponentRef={(inst) => {
                                    this.riskManageForm = inst;
                                }}
                            />
                        </Card>

                        <Card title='客户联系人' style={{marginTop: 20}}>
                            <ContactsTable
                                contacts={data.contacts ? data.contacts :[]}
                            />
                        </Card>

                        <Modal
                            title="历史版本"
                            visible={this.state.historyVisible}
                            footer={null}
                            width={1000}
                            onCancel={this.closeHistoryModal}
                        >
                            <Table
                                rowKey={record => record.version_id}
                                size="small"
                                columns={columns}
                                dataSource={versionList}
                                loading={versionIdload}
                            />
                        </Modal>
                    </Spin>
                </Modal>
            </div>
        );
    }
}