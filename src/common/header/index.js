import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import { CSSTransition } from 'react-transition-group';
// import * as actionCreators from './store/actionCreators.js'
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import classNames from 'classnames';

// import axios from 'axios';

import {
    HeaderWrapper,
    Logo,
    Nav,
    ItemWrapper,
    NavItem,
    // NavSearch,
    Addition,
    Button,
    // SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList,
} from './style.js';

class Header extends React.PureComponent {
    getListArea() {
        // 解构赋值，从 props 中取出要用的东西
        const { focused, mouseIn, list, page, totalPage, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
        const newList = list.toJS();
        const pageList = [];

        for (let i = (page - 1) * 10; i < page * 10; i++) {
            // 最后一页可能不是满的，第一次是空页
            if (i < newList.length) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        // 满足其中一个条件时，显示 SearchInfo，防止点击 SearchInfo 失焦导致点不中
        if (focused || mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                    <SearchInfoSwitch
                            onClick={() => { handleChangePage(page, totalPage, this.spinIcon) }}
                        ><i
                            className="iconfont spin"
                            ref={icon => this.spinIcon = icon}
                        >&#xe606;</i>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>)
        }
    }

    render() {
        // focused, handleInputFocus, handleInputBlur, list,
        const {  logoutUser, history, user, isAuthenticated, sendConfirmMail, pathname } = this.props;
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
                            // 登陆成功的时候隐藏注册按钮
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
                            // 点击登陆跳转到登录页
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
                                    <NavItem className="right login">登陆</NavItem>
                                </Link>
                        }
                        {
                            this.props.isAuthenticated ?
                                <NavItem className="right">
                                    {`用户名: ${user.get('name')}`}
                                </NavItem> : null
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
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        pathname: state.getIn(['header', 'pathname']),
        isAuthenticated: state.getIn(['login', 'isAuthenticated']),
        user: state.getIn(['login', 'user']),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // 获得焦点,list 是 immutable 对象
        handleInputFocus(list) {
            // 避免多次无意义的请求发送,提升组件性能
            list.size === 0 && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        // 退出登陆,从 login 中引入 loginActionCreators
        logoutUser(history) {
            dispatch(loginActionCreators.logoutUser(history));
        },
        sendConfirmMail() {
            dispatch(loginActionCreators.sendConfirmMail());
        }
    }
}
// withRouter() 之后获得 history,可以进行跳转
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));