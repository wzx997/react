import React from "react";
import {Card, Tabs, Button, Alert, Spin, Modal, Icon, message, Select} from 'antd';
import '../ui.less'

export default class MyTabs extends React.Component{
    state = {
        tabPosition: 'top',
    };

    changeTabPosition = (tabPosition) => {
        this.setState({ tabPosition });
    };

    showConfirm = (type) => {
        //使用Modal[type],例如Modal[confirm]和Modal.confirm等价
        Modal[type]({
            title: '请确认信息'+type,
            content: '是否学会了react',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                console.log('点击了确认')
            },
            //取消按钮不可点击
            cancelButtonProps:{ disabled: true }
        });
    };

    render() {
        const { TabPane } = Tabs;
        const { Option } = Select;
        return (
            <div>
                <Card title="基本的tab标签" className="card-wrap">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="说明文" key="1" disabled>
                            被禁用的tab
                        </TabPane>
                        <TabPane
                            tab={<span>
                                 <Icon type="android" />
                                 小说
                            </span>} key="2">
                            <Button type="primary">Imooc</Button>
                            <Button>Imooc</Button>
                            <Button type="dashed">Imooc</Button>
                            <Button type="danger">Imooc</Button>
                            <Button disabled>Imooc</Button>
                        </TabPane>
                        <TabPane tab="散文" key="3">
                            <Spin tip="加载中...">
                                <Alert
                                    message="React"
                                    description="React高级实战课程"
                                    type="success"
                                />
                            </Spin>
                        </TabPane>
                        <TabPane tab="诗歌" key="4">
                            <Button onClick={()=>this.showConfirm('confirm')}>Confirm</Button>
                            <Button onClick={()=>this.showConfirm('error')}>Error</Button>
                            <Button onClick={()=>this.showConfirm('info')}>Info</Button>
                            <Button onClick={()=>this.showConfirm('success')}>Success</Button>
                            <Button onClick={()=>this.showConfirm('warning')}>Warning</Button>
                        </TabPane>
                    </Tabs>
                </Card>

                <Card title="tab的其他用法" className="card-wrap">
                    <div style={{ marginBottom: 16 }}>
                        请选择位置：
                        <Select
                            value={this.state.tabPosition}
                            onChange={this.changeTabPosition}
                            dropdownMatchSelectWidth={false}
                        >
                            <Option value="top">顶部</Option>
                            <Option value="bottom">底部</Option>
                            <Option value="left">左侧</Option>
                            <Option value="right">右侧</Option>
                        </Select>
                    </div>
                    <Tabs tabPosition={this.state.tabPosition}>
                        <TabPane tab="诗歌" key="1">
                            <div style={{textAlign:'center'}}>
                                <h3>相思</h3>
                                <h5>唐代：王维</h5>
                                <p>红豆生南国，春来发几枝。</p>
                                <p>愿君多采撷，此物最相思。</p>
                            </div>
                        </TabPane>
                        <TabPane tab="散文" key="2">
                            <div >
                                <h3 style={{textAlign:'center'}}>美在身边</h3>
                                <p style={{textIndent:'2em'}}>
                                    海，是鱼儿的归宿，柔美的海，仿佛抚摸着我，
                                    抚平这悲哀与伤痛，湛蓝清透的海水耀着它独
                                    有的光芒，如同一块宝石，融化了所有的一切
                                    ，梦幻，幸福。——题记。
                                </p>
                                <p style={{textIndent:'2em'}}>
                                    大海，对于我来说并不陌生，从小至今，那是去过
                                    最多的地方，安宁，静谧她是唯美的化身，是最杰
                                    出的婚礼地点。这只不过是表面，她的灵魂，内心
                                    等等，都是无与伦比的，那一天，我才发觉……
                                </p>
                                <p style={{textIndent:'2em'}}>
                                    匆忙的鼓点，浮躁的音阶，虚伪的笑容，麻木的眼神，
                                    拒绝被同化。看惯了城市的喧哗繁杂，正想放松放松，
                                    沉重的学业啊！正当时国庆要到来，跟随父母，回了家
                                    乡的海。平常都没发现过，只以为海是一个安宁，静谧
                                    的地方，只是能够让人光赏的：谁知，在这次我学习压
                                    力的悲哀与伤痛，竟发现了海的灵魂，宽容、慈爱、严
                                    厉、勤劳……
                                </p>
                                <p style={{textIndent:'2em'}}>......</p>
                            </div>
                        </TabPane>
                        <TabPane tab="小说" key="3">
                            <div>
                                <h3 style={{textAlign:'center'}}>伏天的罪孽</h3>
                                <h5 style={{textAlign:'center'}}>美国-海沃德</h5>
                                <p style={{textIndent:'2em'}}>
                                    “大热天，真是没事找事。”商场侦探亨利嘀咕着，他的制
                                    服已被汗水湿得精透。
                                </p>
                                <p style={{textIndent:'2em'}}>
                                    一位窄脸妇女正在他面前尖声诉说着什么。
                                </p>
                                <p style={{textIndent:'2em'}}>
                                    真是，丢掉的钱既然已经找到了，就算了呗。可她却不善罢甘
                                    休，仿佛站在桌前的这个小男孩真是一个危险的罪犯。
                                </p >
                                <p style={{textIndent:'2em'}}>
                                    亨利思忖着，是的，10块钱对大人也是不小的诱惑，何况对
                                    这个穿得破破烂烂的小孩子？“是的，我没亲眼看到他偷钱。
                                    ”那位太太唠叨着，“我买了一样东西，又要去看另一件货，
                                    就把10块钱放到柜台上。刚离开分把钟，钱就跑到这个小
                                    贼骨头的手上了。”
                                </p>
                                <p style={{textIndent:'2em'}}>......</p>
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
        );
    }
}