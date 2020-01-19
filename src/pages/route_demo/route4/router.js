import React from "react";
import {HashRouter, Route} from 'react-router-dom'

import Main from "./Main";
import About from "./About";
import Topic from "./Topic";
import Home from "./Home";

export default class IRoute extends React.Component{
    render() {
        return (
            <HashRouter>
                <Home> {/* 最先看到的组件*/}
                    <Route exact path="/:id" component={Main}/>
                    <Route path="/about/:aid" component={About}/>
                    <Route path="/topic/:tid" component={Topic}/>
                </Home>
            </HashRouter>
        );
    }
}