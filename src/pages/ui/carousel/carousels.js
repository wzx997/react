import React from "react";
import {Card,Carousel} from 'antd';
import '../ui.less';

export default class Carousels extends React.Component{
    render() {
        return (
            <div>
                <Card title="背景轮播" className="card-wrap">
                    <Carousel autoplay style={{backgroundColor:'#364d79'}}>
                        <div><h3>Ant Motion Banner - React</h3></div>
                        <div><h3>Ant Motion Banner - Vue</h3></div>
                        <div><h3>Ant Motion Banner - Angular</h3></div>
                        <div><h3>Ant Motion Banner - None</h3></div>
                    </Carousel>

                </Card>

                <Card title="图片轮播" className="card-wrap">
                    <Carousel autoplay>
                        <img src="/assets/images/carousels/c1.jpg" alt=""/>
                        <img src="/assets/images/carousels/c2.jpg" alt=""/>
                        <img src="/assets/images/carousels/c3.jpg" alt=""/>
                        <img src="/assets/images/carousels/c4.jpg" alt=""/>
                    </Carousel>
                </Card>
            </div>
        );
    }
}