import React from "react";
import {Card, Row, Col, Modal} from 'antd';
import '../ui.less'

export default class Gallery extends React.Component{
    state = {
        visible:false
    }

    openImg = (src) => {
        this.setState({
            visible:true,
            currentImg:"/assets/images/"+src
        })
    }

    render() {
        const imgs = [
            ['1.png','2.png','3.png','4.png'],
            ['5.png','6.png','7.png','8.png'],
            ['9.png','10.png','11.png','12.png'],
            ['13.png','14.png','15.png','16.png'],
            ['17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png'],
        ];
        const imgList = imgs.map((list) => list.map((item) =>
            <Card
                cover={<img alt={item} src={"/assets/images/"+item} onClick={()=>this.openImg(item)}/>}
                key={item}
            >
                <Card.Meta
                   title="React Admin"
                   description="这是一幅图片"
                />
            </Card>
        ))
        return (
            <div className="card-wrap">
                <Row gutter={10}>
                    <Col md={4}>
                        {imgList[0]}
                    </Col>
                    <Col md={4}>
                        {imgList[1]}
                    </Col>
                    <Col md={4}>
                        {imgList[2]}
                    </Col>
                    <Col md={4}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                    <Col md={4}>
                        {imgList[5]}
                    </Col>
                </Row>

                <Modal
                    title="图片"
                    visible={this.state.visible}
                    footer={null}
                    onCancel={()=>{
                        this.setState({
                            visible: false,
                        });
                    }}
                >
                    <img src={this.state.currentImg} alt="这是一张图片" style={{width:'100%'}}/>
                </Modal>
            </div>
        );
    }
}