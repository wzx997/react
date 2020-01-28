import React from "react";
import {Input,
    Select,
    Form,
    Button,
    Checkbox,
    Radio
} from 'antd';

const FormItem = Form.Item;
const {Option} = Select;

class FilterForm extends React.Component{
    initFormList = () =>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        if (formList && formList.length > 0){
            formList.forEach((item,i) => {
                let label = item.label;
                let field = item.filed;
                let initialValuei = item.initialValue;
                let placeholder = item.placeholder;
                let width = item.width;
            })
        }
    }
    render() {
        return (
            <Form>
            </Form>
        );
    }
}
export default Form.create({})(FilterForm);