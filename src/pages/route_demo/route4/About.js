import React from "react";
import {HashRouter} from 'react-router-dom';

export default class About extends React.Component{
    render() {
        return (
            <HashRouter>
                <div>
                    This is about
                    参数：{this.props.match.params.aid}
                </div>
            </HashRouter>
        );
    }

}