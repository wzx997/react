import React from "react";
import {Button, Card, Modal} from 'antd';
import './index.less';

import {Editor} from 'react-draft-wysiwyg';//导入组件
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';//导入样式
import draftJs from 'draftjs-to-html';

export default class Rich extends React.Component{
    state = {
        editorState:'',
        showRichText:false,
        contentState:''
    }

    //状态改变的时候，即输入的时候
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }

    //值会被存储在这个变量中
    onEditorChange = (contentState) => {
        this.setState({
            contentState,
        });
    }

    handleClearContent = () => {
        this.setState({
            editorState:'',
        });
    }

    handleGetText = () => {
        this.setState({
            showRichText:true,
        });
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Card title='富文本编辑器' className='card-wrap'>
                    <Button type='primary' className='fwb-btn' onClick={this.handleClearContent}>清空内容</Button>
                    <Button type='primary' className='fwb-btn' onClick={this.handleGetText}>获取HTML文本</Button>
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onEditorChange}
                    />
                </Card>
                <Modal
                    title='富文本HTML'
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    onOk={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                >
                    {draftJs(this.state.contentState)}
                </Modal>
            </div>
        );
    }
}