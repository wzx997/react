import React from "react";
import {Link} from 'react-router-dom';

export default class extends React.Component {
    render() {
        return (
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
                {/*寻找下面的子节点*/}
                {this.props.children}
            </div>
        );
    }
}