import React from "react";
import {HashRouter} from 'react-router-dom';

export default class Main extends React.Component{
    render() {
        return (
            <HashRouter>
                <div>
                    This is main
                    参数：{this.props.match.params.id}
                </div>
            </HashRouter>
        );
    }

}