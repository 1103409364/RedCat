import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/vs.css';
import './TextEditor.scss';
// import axios from 'axios';
// import { actionCreators } from './store';
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

        this.state = {
            'html': '',
            'focus': false,
            'isEmpty': true, //输入框是否为空
            'showTip': false, //是否显示提示文字
        }

        this.handleInput = this.handleInput.bind(this);
        this.clear = this.clear.bind(this);
        this.save = this.save.bind(this);
    }
    // 检查输入是否为空
    checkIsEmpty(text) {
        return text.trim() === '';
    }
    // 输入事件处理
    handleInput(e) {
        let isEmpty = this.checkIsEmpty(e.target.innerText);
        this.setState({
            'html': marked(e.target.innerText, { breaks: true }),
            'isEmpty': isEmpty,
            'showTip': false,
        });
    }

    save() {
        // 检查输入是否为空
        if (this.checkIsEmpty(this.state.html)) {
            this.setState({
                'isEmpty': true,
                'showTip': true,
            })

            // this.ipt.focus();
            return;
        }
    }
    // 清空输入框
    clear() {
        this.setState({
            'html': '',
            'isEmpty': true,
        })
        this.ipt.innerText = '';
        // this.ipt.focus();
    }

    componentDidMount() {
        this.ipt.focus();
        // 更改地址栏路径
        this.props.changePath(this.props.history.location.pathname);
        document.title = '写文章-rr';
        // this.ipt.selectionEnd = this.ipt.innerText.length;
    }

    render() {
        const { isAuthenticated } = this.props;
        // 未登陆渲染登陆页,已登陆,跳转到首页
        if (isAuthenticated) {
            return (
                <div className={this.state.focus === true ? 'TextEditor focus' : 'TextEditor'}>
                    <div className={this.state.focus === true ? 'wrap focus' : 'wrap'}>
                        <div className="textarea"
                            contentEditable="true"
                            ref={ipt => this.ipt = ipt}
                            onInput={this.handleInput}
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
                                value="清屏"
                            />
                            <span
                                className={this.state.showTip ? 'TextEditor-tip show' : 'TextEditor-tip'}
                            >内容为空，请输入
                        </span>
                        </div>
                    </div>

                    <div className={this.state.isEmpty ? 'empty preview' : 'preview'}
                        dangerouslySetInnerHTML={{ __html: this.state.html }}
                    />
                </div>)
        }

        return <Redirect to="/login" />
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
});

const mapDispatchToProps = dispatch => ({
    changePath(pathname) {
        dispatch(headerActionCreators.changePath(pathname));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Write));