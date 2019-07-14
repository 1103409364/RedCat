import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { actionCreators as homeActionCreators } from '../../pages/home/store';
import classNames from 'classnames';

// import axios from 'axios';

import {
    HeaderWrapper,
    Logo,
    Nav,
    ItemWrapper,
    NavItem,
    NavSearch,
    Addition,
    Button,
    SearchWrapper,
} from './style.js';

class Header extends React.PureComponent {
    render() {
        const { focused, mouseIn, handleMouseEnter, handleMouseLeave, handleInputFocus, handleInputBlur,handleInputChange,handleSearach, logoutUser, history, user, isAuthenticated, sendConfirmMail, pathname, searchValue } = this.props;
        const activeItem = {
            '/write': '写文章',
        }
        const homeClass = classNames({
            'home': true,
            'left': true,
            'active': pathname === '/' //根据当前路径改变class 从而改变样式
        });

        return (
            <HeaderWrapper>
                <Nav>
                    <Link to="/">
                        <Logo>
                            <h1>redcat-blog</h1>
                        </Logo>
                    </Link>
                    {/* Link 不刷新，a刷新 */}
                    {/* <a href="/"><Logo /></a> */}

                    <Addition>
                        {
                            pathname !== '/write' ?
                                <Link to="/write">
                                    <Button className="wrightting">
                                        <i className="iconfont">&#xe62e;</i> 写文章
                                    </Button>
                                </Link> : null
                        }
                        {
                            // 路由到注册页
                            // 登录成功的时候隐藏注册按钮
                            isAuthenticated ? null :
                                <Link to="/register" >
                                    <Button className="reg">注册</Button>
                                </Link>
                        }

                    </Addition>

                    <ItemWrapper>
                        <Link to="/">
                            <NavItem className={homeClass}>首页</NavItem>
                        </Link>
                        {/* 写文章 */}
                        <NavItem className="left active">{activeItem[pathname]}</NavItem>
                        {
                            user.get('islive') ? null : isAuthenticated ?
                                <NavItem className="email"
                                    onClick={sendConfirmMail}
                                >激活 Email</NavItem> : null
                        }
                        {
                            // 条件渲染,根据 isAuthenticated 的值,渲染不同的组件.
                            // 点击登录跳转到登录页
                            this.props.isAuthenticated ?
                                <div>
                                    <NavItem
                                        className="right logout"
                                        onClick={() => logoutUser(history)}
                                    >
                                        退出
                                    </NavItem>
                                    <img className="avatar" src={user.get('avatar')} alt="avatar"></img>
                                </div>
                                :
                                <Link to="/login" >
                                    <NavItem className="right login">登录</NavItem>
                                </Link>
                        }
                        {
                            this.props.isAuthenticated ?
                                <NavItem className="right nickname">
                                    {`用户名: ${user.get('name')}`}
                                </NavItem> : null
                        }
                        {
                            pathname === '/' ?
                                <SearchWrapper>
                                    <NavSearch
                                        onFocus={() => handleInputFocus()}
                                        onBlur={handleInputBlur}
                                        onChange={handleInputChange}
                                        onKeyDown = {(e) => {
                                            // 监听回车
                                            if(e.keyCode === 13) {
                                                if(!isAuthenticated) {
                                                    alert('请登录后在再进行搜索操作');
                                                    history.push('/login');
                                                    return;
                                                }
                                                handleSearach(searchValue);}}}
                                        className={focused ? 'focused' : ''}
                                    />
                                    {/* 当鼠标进入放大镜或者输入框取得焦点时, 改变放大镜样式 */}
                                    <i className={focused || mouseIn ? 'focused iconfont zoom' : 'iconfont zoom'}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => {
                                            if(!isAuthenticated) {
                                                alert('请登录后在再进行搜索操作');
                                                history.push('/login');
                                                return;
                                            }
                                            handleSearach(searchValue)}}
                                    >&#xe600;</i>
                                </SearchWrapper> : null
                        }
                    </ItemWrapper>
                </Nav>
            </HeaderWrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        // 使用 immutable 提供的 get 方法。获取数据不统一，state不是immutable 对象，没有 get 方法。
        // focused: state.header.get('focused')
        // 使用 redux-immutable 让state成为 immutable 对象，统一使用 get 方法
        focused: state.get('header').get('focused'),
        mouseIn: state.get('header').get('mouseIn'),
        // focused: state.header.focused
        // 取数据的另一种写法
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        pathname: state.getIn(['header', 'pathname']),
        isAuthenticated: state.getIn(['login', 'isAuthenticated']),
        user: state.getIn(['login', 'user']),
        searchValue: state.get('header').get('searchValue'),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // 获得焦点
        handleInputFocus() {
            dispatch(actionCreators.searchFocus());
        },
        // 失去焦点
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        // 鼠标进入搜索放大镜
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        // 鼠标离开搜索放大镜
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        // 退出登录,从 login 中引入 loginActionCreators
        logoutUser(history) {
            dispatch(loginActionCreators.logoutUser(history));
        },
        // 管理搜索框的值
        handleInputChange(e) {
            dispatch(actionCreators.changeSearchInput(e.target.value));
        },
        // 执行搜索操作
        handleSearach(searchValue) {
            dispatch(homeActionCreators.getSomeList(searchValue));
        },
        // 发送激活邮件
        sendConfirmMail() {
            dispatch(loginActionCreators.sendConfirmMail());
        }
    }
}
// withRouter() 之后获得 history,可以进行跳转
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));