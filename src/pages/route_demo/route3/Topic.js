import React from "react";
import {HashRouter} from 'react-router-dom';

export default class Topic extends React.Component{
    render() {
        return (
            <HashRouter>
                <div>
                    This is topic
                    参数：{this.props.match.params.tid}
                </div>
            </HashRouter>
        );
    }

}