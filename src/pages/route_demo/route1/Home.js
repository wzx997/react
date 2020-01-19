import React from "react";
import {HashRouter, Route, Link} from 'react-router-dom';

import Main from "./Main";
import About from "./About";
import Topic from "./Topic";

export default class extends React.Component{
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Mian</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/topic">Topic</Link>
                        </li>
                    </ul>
                    <hr/>
                    <Route exact path="/" component={Main}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topic" component={Topic}/>
                </div>

            </HashRouter>
        );
    }
}