import React from "react";
import MenuConfig from '../../config/menuConfig'
import {Menu} from 'antd';
import './index.less';//加载css

import {NavLink} from 'react-router-dom'

const {SubMenu} = Menu;

export default class NavLeft extends React.Component {
    state = {
        currentKey:''
    }

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        let currentKey = window.location.hash.replace(/#|\?.*$/g,'');
        this.setState({
            currentKey,
            menuTreeNode
        });
    }

     //点击菜单的事件
    handleClick = (item) => {
        this.setState({
            currentKey:item.key
        })
    }

     //菜单渲染
    renderMenu = (data) =>{
        return data.map((item)=>{
            if (item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>
                    {item.title}
                </NavLink>
            </Menu.Item>
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <h1>Imooc Ms</h1>
                </div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.currentKey]}
                    theme="dark"
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}