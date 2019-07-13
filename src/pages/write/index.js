import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import marked from 'marked';
// 代码高亮，原理是给代码加 span 和 类名，再引入对应的 css
import highlight from 'highlight.js';

import './TextEditor.scss';
import { actionCreators } from './store';
import { actionCreators as headerActionCreators } from '../../common/header/store';
// import {} from './style.js'
// 配置
marked.setOptions({
    highlight(code) {
        return highlight.highlightAuto(code).value
    }
})

class Write extends React.PureComponent {
    constructor(props) {
        super(props);
        // 将 html text title 交给 redux 管理
        this.state = {
            'focus': false,
            'isEmpty': true, //输入框是否为空
            'isEmptyTitle': true, //输入框是否为空
            'showTip': false, //是否显示提示文字
        }

        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        // this.handleKeyDown = this.handleKeyDown.bind(this);
        this.clear = this.clear.bind(this);
        this.save = this.save.bind(this);
    }
    // 检查输入是否为空
    checkIsEmpty(text) {
        return text.trim() === '';
    }
    // 处理标题输入
    handleTitleInput(e) {
        let text = e.target.value.substr(0, 50);
        let isEmptyTitle = this.checkIsEmpty(text);

        this.setState(() => ({
            'isEmptyTitle': isEmptyTitle,
            'showTip': false,
        }));

        this.props.changeTitle(text);
    }
    // 输入事件处理
    handleInput(e) {
        let text = e.target.innerText || e.target.textContent;
        let html = marked(text, { breaks: true })
        let isEmpty = this.checkIsEmpty(text);
        console.log(html.substr(0, 50))
        this.setState(() => ({
            'isEmpty': isEmpty,
            'showTip': false,
        }));
        this.props.changeText(text);
        this.props.changeHtml(html);
    }
    // 输入 tab 未实现
    // handleKeyDown(e) {
    //     var el = this.ipt;
    //     var keyCode = e.keyCode || e.which;
    //     if (keyCode === 9) {
    //         var start = el.selectionStart,
    //             end = el.selectionEnd;
    //         console.log(start, end);
    //         el.innerHTML = el.innerHTML.substring(0, start)
    //                 + "\t"
    //                 + el.innerHTML.substring(end);
    
    //         el.selectionStart = el.selectionEnd = start + 1;
    
    //         e.preventDefault();
    //     }
    // }

    // 从 HTML 中提取纯文本
    getPlainText(html) {
        //动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
        temp.innerHTML = html;
        //返回这个元素的innerText(ie)或者textContent，即得到经过HTML解码的字符串了。
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }

    save() {
        // 检查输入是否为空
        if (this.state.isEmpty || this.state.isEmptyTitle) {
            this.setState({
                'showTip': true,
            })
            return;
        }
        const htmlText = this.props.html
        // 截取一部分正文作为简介
        const descText = this.getPlainText(htmlText).substr(0, 100) + '……';
        // 文章的标题，正文原文，mark之后的正文，作者id，文章id
        const article = {
            title: this.props.title,
            text: this.props.text,
            html: htmlText,
            desc: descText,
            author: this.props.author,
            // id: 文章 id 自己生成
        }
        this.props.postArticle(article, this.ipt);
    }
    // 清空输入框
    clear() {
        this.setState({
            'html': '',
            'isEmpty': true,
        })

        this.ipt.innerText = '';
        // this.ipt.focus();
        this.props.changeTitle('');
        this.props.changeText('');
        this.props.changeHtml('');
    }

    componentDidMount() {
        // if (this.ipt) { this.ipt.focus()}
        // 更改地址栏路径
        this.props.changePath(this.props.history.location.pathname);
        document.title = '写文章-rr';
        // this.ipt.selectionEnd = this.ipt.innerText.length;
    }

    render() {
        const { isAuthenticated, postStatus,title, html, text } = this.props;
        const postTipClass = classNames({
            postTip: true,
            success: postStatus === 1,
            failed: postStatus === -1
        });
        // 未登陆渲染登陆页,已登陆,跳转到首页
        if (isAuthenticated) {
            return (
                <div className={this.state.focus === true ? 'TextEditor focus' : 'TextEditor'}>
                    <div className="titleEditor">
                        <input className="title"
                            onChange={this.handleTitleInput}
                            type="text"
                            value={title}
                            placeholder="请输入标题（最多50个字）"
                            autoFocus
                        />
                    </div>
                    <div className={this.state.focus === true ? 'textareaWrap focus' : 'textareaWrap'}>
                        {/* 模拟输入框 */}
                        <div className="textarea"
                            contentEditable="true"
                            ref={ipt => this.ipt = ipt}
                            onInput={this.handleInput}
                            // onKeyDown={this.handleKeyDown}
                            onFocus={() => {
                                this.setState({
                                    'focus': true
                                })
                            }}
                            onBlur={() => {
                                this.setState({
                                    'focus': false
                                })
                            }}
                        />
                        {/* 模拟 placeholder */}
                        <div className={this.state.isEmpty ? 'placeholder' : 'hide placeholder'}>请输入正文（支持 Markdown）</div>
                        <div className="App-btn">
                            <i
                                onClick={() => this.ipt.focus()}
                                className="iconfont"
                                title="编辑">&#xe65c; </i>
                            <input
                                // 保存到服务器，成功的时候清空输入框
                                onClick={this.save}
                                type="button"
                                className="submit"
                                value="发布"
                            />
                            <input
                                // 保存到服务器，成功的时候清空输入框
                                onClick={this.clear}
                                type="button"
                                className="clear"
                                value="清空"
                            />
                        </div>

                        <span className={this.state.showTip ? 'TextEditor-tip show' : 'TextEditor-tip'}
                        >标题或正文为空，请输入
                        </span>
                    </div>
                    {/* 预览 */}
                    <div className={this.state.isEmpty ? 'empty preview marked' : 'preview marked'}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />

                    <div className={postTipClass}>
                        {postStatus === 1 ? '文章发表成功' : postStatus === -1 ? '服务器错误请稍后再试' : ''}
                    </div>
                </div>)
        }

        return <Redirect to="/login" />
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
    author: state.getIn(['login', 'user', 'name']),
    postStatus: state.getIn(['write', 'postStatus']),
    title: state.getIn(['write', 'title']),
    html: state.getIn(['write', 'html']),
    text: state.getIn(['write', 'text']),
});

const mapDispatchToProps = dispatch => ({
    changePath(pathname) {
        dispatch(headerActionCreators.changePath(pathname));
    },
    postArticle(article, inputDiv) {
        dispatch(actionCreators.postArticle(article, inputDiv));
    },
    changeTitle(title) {
        dispatch(actionCreators.changeTitle(title));
    },
    changeHtml(html) {
        dispatch(actionCreators.changeHtml(html));
    },
    changeText(text) {
        dispatch(actionCreators.changeText(text));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Write));