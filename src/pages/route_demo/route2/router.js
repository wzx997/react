import React from "react";
import {HashRouter, Route} from 'react-router-dom'

import Main from "./../route1/Main";
import About from "./../route1/About";
import Topic from "./../route1/Topic";
import Home from "./Home";

export default class IRoute extends React.Component{
    render() {
        return (
            <HashRouter>
                <Home> {/* 最先看到的组件*/}
                    <Route exact path="/" component={Main}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topic" component={Topic}/>
                </Home>
            </HashRouter>
        );
    }
}