import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import time from 'time-formater';
import { actionCreators } from './store';
import { actionCreators as headerActionCreators} from '../../common/header/store';

import {
    DetailWrapper,
    Header,
    Content,
    Author,
} from './style.js'

class Detail extends React.PureComponent {
    render() {
        const { content, title, author,updateDate } = this.props;
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
                        <a href={`/api/me/${author}`}>
                            {`作者：${author} ${time(updateDate).format('YYYY-MM-DD HH:mm:ss')}`}
                        </a>
                    </div>
                </Author>
                <Content className="marked" dangerouslySetInnerHTML={{ __html: this.props.content }} />
            </DetailWrapper>
        );
    }

    componentDidMount() {
        this.props.getDetail(this.props.match.params.id);
        this.props.changePath(this.props.history.location.pathname);

        document.title = 'detail-rr';
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
    id: state.getIn(['detail', 'id']),
});

const mapDispatchToProps = dispatch => ({
    getDetail(id) {
        dispatch(actionCreators.getDetail(id))
    },
    changePath(pathname) {
        dispatch(headerActionCreators.changePath(pathname));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));