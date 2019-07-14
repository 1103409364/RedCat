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
import { BackTop } from '../../common/BackTop/style.js';

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
            focus: false,
            isEmpty: true, //输入框是否为空
            isEmptyTitle: true, //输入框是否为空
            showTip: false, //是否显示提示文字
            showScroll: false
        }

        this.handleTitleInput = this.handleTitleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.changeScrollTopShow = this.changeScrollTopShow.bind(this);
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
        // console.log(html.substr(0, 50))
        this.setState(() => ({
            'isEmpty': isEmpty,
            'showTip': false,
        }));
        this.props.changeText(text);
        this.props.changeHtml(html);
    }

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
        // 发布前检查输入内容是否为空
        let isEmptyTitle = this.checkIsEmpty(this.props.title);
        let isEmptyBody = this.checkIsEmpty(this.props.text);
        this.setState(() => ({
            isEmptyTitle: isEmptyTitle,
            isEmpty: isEmptyBody,
        }));
        // 只有激活用户才能发表文章
        if (!this.props.islive) {
            alert('请先激活 Email');
            return;
        }
        // 检查输入是否为空
        if (isEmptyTitle || isEmptyBody) {
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
            id: this.props.id //文章 id
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

    // 点击回到顶部
    handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    changeScrollTopShow() {
        // toggleTopShow 显示或者隐藏回到顶部按钮的 actionCreator
        if (document.documentElement.scrollTop > 300) {
            this.setState(() => ({ showScroll: true }));
        } else {
            this.setState(() => ({ showScroll: false }));
        }
    }
    // 绑定事件，监听 scrollTop
    bindScrollEvents() {
        window.addEventListener('scroll', this.changeScrollTopShow);

    }

    componentDidMount() {
        // 更改 pathname, 用来改变导航样式
        this.props.changePath(this.props.history.location.pathname);
        document.title = '写文章-rr';

        // 从查询字符串中提取文章的 id
        const articleId = this.props.location.search.replace(/^\?\=/, '');
        // id 不为空就拉取文章内容填到输入框中
        if (articleId !== '') {
            this.props.getDetail(articleId, this.ipt);
            this.setState({
                isEmpty: false, //输入框是否为空
                isEmptyTitle: false, //输入框是否为空
            })
        }
        // 回到顶部按钮绑定事件
        this.bindScrollEvents();
    }

    // 在 window 上绑定了事件，可能会影响其他组件。在组件卸载的时候移除这个事件监听
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

    render() {
        const { isAuthenticated, postStatus, title, html} = this.props;
        const postTipClass = classNames({
            postTip: true,
            success: postStatus === 1,
            failed: postStatus === -1
        });
        // 未登陆渲染登陆页,已登陆,跳转到首页
        if (isAuthenticated) {
            return (
                <div className={this.state.focus === true ? 'TextEditor focus' : 'TextEditor'}>
                    {/* 标题输入框 */}
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
                    {/* 提示框 */}
                    <div className={postTipClass}>
                        {postStatus === 1 ? '文章发表成功' : postStatus === -1 ? '服务器错误请稍后再试' : ''}
                    </div>
                    {/* 回到顶部 */}

                    {this.state.showScroll ? <BackTop onClick={this.handleScrollTop}>BackTop</BackTop> : null}
                </div>)
        }

        return <Redirect to="/login" />
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
    author: state.getIn(['login', 'user', 'name']),
    islive: state.getIn(['login', 'user', 'islive']),
    postStatus: state.getIn(['write', 'postStatus']),
    title: state.getIn(['write', 'title']),
    html: state.getIn(['write', 'html']),
    text: state.getIn(['write', 'text']),
    id: state.getIn(['write', 'id']),
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
    },
    getDetail(id, inputDiv) {
        dispatch(actionCreators.getDetail(id, inputDiv));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Write));