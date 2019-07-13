import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// time文档 https://www.npmjs.com/package/time-formater
import time from 'time-formater';
import { actionCreators } from '../store';
import { ListItem, ListContent, LoadMore } from '../style.js';

class List extends React.PureComponent {
    render() {
        const { articleList, getMoreList, pageIndex } = this.props;
        return (
            <ul>
                {// 跳转的时候,传一个 id 进去,detail 页的 props 就能接收到 id, 动态路由获取参数
                    articleList.map((item) => (
                        <li key={item.get('_id')}>
                            <Link to={`/detail/${item.get('_id')}`} target="_blank" >
                                <ListItem>
                                    {/* <img className="pic" src={item.get('imgUrl')} alt="pic" /> */}
                                    <ListContent>
                                        <h3 className="title">{item.get('title')}</h3>
                                        <p className="desc">{item.get('desc')}</p>
                                        {/* 显示作者和更新日期 */}
                                        <p className="info">{`作者：${item.get('author')} ${time(item.get('updateDate')).format('YYYY-MM-DD HH:mm:ss')}`}</p>
                                    </ListContent>
                                </ListItem>
                            </Link>
                        </li>
                    ))
                }
                <LoadMore
                    onClick={() => getMoreList(pageIndex)}
                >
                    阅读更多
                </LoadMore>
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return {
        articleList: state.getIn(['home', 'articleList']),
        pageIndex: state.getIn(['home', 'articlePage'])
    }
}

const mapDispatchToProps = dispatch => ({
    getMoreList(pageIndex) {
        dispatch(actionCreators.getMoreList(pageIndex));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(List);