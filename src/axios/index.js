import JsonP from 'jsonp';
import axios from 'axios';
import URL from '../config/urlConfig';
import {message} from "antd";

export default class Axions {
    static jsonp(options){
        return new Promise((resolve, reject) => {
            JsonP(options.url,{
                param:'callback'
            },function (err, response) {

            })
        })
    }

    //利用axios获取数据
    static ajax(options) {
        return new Promise((resolve, reject) => {
            axios({
                url: URL + options.url,
                method: options.method ? options.method : 'post',
                timeout: 5000,
                params: (options.data && options.data.params) || '',
            }).then((respose) => {
                if (respose.status === 200) {
                    let res = respose.data;
                    if (res.code === 0) {
                        resolve(res)
                    } else {
                        message.error(res.msg, 2)
                    }
                } else {
                    reject(respose.data)
                }
            }).catch( (error) =>{
                console.log(error);
                message.error('网络似乎出了一些问题......', 2)
            });
        });
    }
}