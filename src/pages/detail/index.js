import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import time from 'time-formater';
import { actionCreators } from './store';
import { actionCreators as headerActionCreators } from '../../common/header/store';

import {
    DetailWrapper,
    Header,
    Content,
    Author,
} from './style.js';
import { BackTop } from '../../common/BackTop/style.js';

class Detail extends React.PureComponent {
    render() {
        const { content, title, author, updateDate, showScroll, isAuthenticated, userName, handleEdit, handleDelete, id } = this.props;
        // 拿到上一个页面传进来的 id
        // console.log(this.props.match.params.id);
        return (
            <DetailWrapper>
                <Header>
                    {title}
                </Header>
                <Author>
                    {/* <a className="avatar" href="">
                        <img src=""></img>
                    </a> */}
                    <div className="info">
                        {/* <a href={`/api/me/${author}`}> 跳转到作者主页 */}
                        {updateDate ?  `作者：${author} ${time(updateDate).format('YYYY-MM-DD HH:mm:ss')}` : '本文已删除'}
                        {
                            isAuthenticated && author === userName ?
                                <div className="btnWrap">
                                    <span className="edit"
                                        onClick={handleEdit}
                                    >编辑</span>
                                    <span className="delete"
                                        onClick={() => handleDelete(id, this.props.history)}
                                    >删除</span>
                                </div> : null
                        }

                    </div>
                </Author>
                <Content className="marked" dangerouslySetInnerHTML={{ __html: content }} />
                {/* 回到顶部 */}
                {showScroll ? <BackTop onClick={this.handleScrollTop}>BackTop</BackTop> : null}
            </DetailWrapper>
        );
    }
    // 点击回到顶部
    handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    // 绑定事件，监听 scrollTop
    bindScrollEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }

    componentDidMount() {
        this.props.getDetail(this.props.match.params.id);
        this.props.changePath(this.props.history.location.pathname);
        this.bindScrollEvents();
    }

    // 在 window 上绑定了事件，可能会影响其他组件。在组件卸载的时候移除这个事件监听
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }
}

// connect 中的两个映射方法都要返回一个纯对象
const mapStateToProps = state => ({
    title: state.getIn(['detail', 'title']),
    content: state.getIn(['detail', 'content']),
    author: state.getIn(['detail', 'author']),
    text: state.getIn(['detail', 'text']),
    date: state.getIn(['detail', 'date']),
    updateDate: state.getIn(['detail', 'updateDate']),
    id: state.getIn(['detail', 'id']), //文章 id
    showScroll: state.getIn(['detail', 'showScroll']),
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
    userName: state.getIn(['login', 'user', 'name']),
});

const mapDispatchToProps = dispatch => ({
    getDetail(id) {
        dispatch(actionCreators.getDetail(id))
    },
    changePath(pathname) {
        dispatch(headerActionCreators.changePath(pathname));
    },
    changeScrollTopShow() {
        // toggleTopShow 显示或者隐藏回到顶部按钮的 actionCreator
        if (document.documentElement.scrollTop > 300) {
            dispatch(actionCreators.toggleTopShow(true))
        } else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    },
    handleDelete(id, history) {
        // console.log(id);
        window.confirm('确定要删除吗?') && dispatch(actionCreators.deleteArticle(id, history))
    },
    handleEdit(id) {
        console.log('Edit');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));