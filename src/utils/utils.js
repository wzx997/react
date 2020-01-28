import React from "react";
import {Select} from 'antd';
const {Option} = Select;

export default {
    formateDate(time){
        if (!time) {
            return '';
        }
        let date = new Date(time);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
    },

    //获取select的option选项
    getOptionList(data){
        if (!data){
            return [];
        }
        let options = [];
        options = [<Option value='' key='all_key'>全部</Option> ];
        data.forEach((item) => {
           options.push(<Option value={item.id} key='all_key'>{item.name}</Option> );
        });
        return options;
    }
}