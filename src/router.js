import React from "react";
import {HashRouter, Route,Switch} from 'react-router-dom';
import App from "./App";

//导入自定义的组件
import Login from './pages/login';//登录页面
import Admin from './admin.js';//admin主页面

//导入ui模块
import Buttons from './pages/ui/buttons/buttons';//admin页面下的UI下的buttons组件
import Modals from './pages/ui/modals/modals';//admin页面下的UI下的modal组件
import Loads from './pages/ui/loading/loadings';//admin页面下的UI下的buttons组件
import Notices from './pages/ui/notices/notices';//admin页面下的UI下的notices组件
import Messages from './pages/ui/messages/messages';//admin页面下的UI下的messages组件
import MyTabs from './pages/ui/tabs/tabs';//admin页面下的UI下的tabs组件
import Gallery from './pages/ui/gallery/gallery';//admin页面下的UI下的gallery组件
import Carousels from './pages/ui/carousel/carousels';//admin页面下的UI下的carousels组件

//导入form模块
import FormLogin from './pages/form/login/login';
import Reg from './pages/form/reg/reg';

//导入table模块
import BasicTable from './pages/table/basicTable/basicTable';
import HighTable from './pages/table/highTable/highTable';

//导入城市管理
import City from './pages/city/index';

//404页面
import NoMatch from "./pages/nomatch";//404


export default class IRouter extends React.Component{
    render() {
        return (
            <HashRouter>
                <App>{/* 项目的根组件，最先渲染的组件*/}
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={()=>
                        <Admin>{/*加载admin的子路由*/}
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons}/>
                                <Route path="/admin/ui/modals" component={Modals}/>
                                <Route path="/admin/ui/loads" component={Loads}/>
                                <Route path="/admin/ui/notices" component={Notices}/>
                                <Route path="/admin/ui/massages" component={Messages}/>
                                <Route path="/admin/ui/tabs" component={MyTabs}/>
                                <Route path="/admin/ui/gallerys" component={Gallery}/>
                                <Route path="/admin/ui/carousels" component={Carousels}/>

                                <Route path="/admin/form/login" component={FormLogin}/>
                                <Route path="/admin/form/reg" component={Reg}/>

                                <Route path="/admin/table/basic-table" component={BasicTable}/>
                                <Route path="/admin/table/high-table" component={HighTable}/>

                                <Route path="/admin/city" component={City}/>
                                <Route  component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path="/order/detail" component={Login}/>
                </App>
            </HashRouter>
        );
    }
}