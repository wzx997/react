import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
// import App from './App';
// import Admin from './admin.js';//主入口
// import Home from './pages/route_demo/route1/Home';//测试路由用,route1
// import Router from './pages/route_demo/route2/router';//测试路由用,route2
// import PRouter from './pages/route_demo/route3/Home';//测试路由用,route3,参数路由1
// import PRouter2 from './pages/route_demo/route4/router';//测试路由用,route3,参数路由2
import Router from './router';//全局的路由文件
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Admin />, document.getElementById('root'));//主入口
// ReactDOM.render(<Home />, document.getElementById('root'));//测试路由用,route1
// ReactDOM.render(<Router />, document.getElementById('root'));//测试路由用,route2
// ReactDOM.render(<PRouter />, document.getElementById('root'));//测试路由用,route3,参数路由1
// ReactDOM.render(<PRouter2 />, document.getElementById('root'));//测试路由用,route3,参数路由1
ReactDOM.render(<Router />, document.getElementById('root'));//测试路由用,route3,参数路由1

serviceWorker.unregister();
