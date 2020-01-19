import React from "react";
import {HashRouter, Route, Link} from 'react-router-dom';

import About from "./About";
import Main from "./Main";
import Topic from "./Topic";

export default class extends React.Component{
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/1">Mian</Link>
                        </li>
                        <li>
                            <Link to="/about/aa">About</Link>
                        </li>
                        <li>
                            <Link to="/topic/bb">Topic</Link>
                        </li>
                    </ul>
                    <hr/>
                    <Route exact path="/:id" component={Main}/>
                    <Route path="/about/:aid" component={About}/>
                    <Route path="/topic/:tid" component={Topic}/>
                </div>
            </HashRouter>
        );
    }
}