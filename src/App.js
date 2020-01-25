import React from 'react';
import './assets/css/App.css';

//配置中文主题
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class  App extends React.Component{

  render() {
    return (
        <div>
            <ConfigProvider locale={zhCN}>
                {this.props.children}
            </ConfigProvider>
        </div>
    );
  }
}

export default App;
