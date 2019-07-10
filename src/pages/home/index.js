import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreators } from './store';
import { actionCreators as headerActionCreators } from '../../common/header/store';
// import Topic from './components/Topic';
import List from './components/List';
// import RecommendItem from './components/RecommendItem';
// import DownLoadLink from './components/DownLoadLink';
import RecommendedAuthors from './components/RecommendedAuthors';

import {
    HomwWrapper,
    HomwLeft,
    HomwRight,
    BackTop,
    DailyWallpaper
} from './style.js'

class Home extends React.PureComponent {
    handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        return (
            <HomwWrapper>
                <a href={this.props.bannerImg} target="_blank" rel="noopener noreferrer">
                    <DailyWallpaper bannerImg={this.props.bannerImg} >
                        <span>
                            必应每日高清壁纸- 精彩，从这里开始
                        </span>
                    </DailyWallpaper>
                    
                </a>
                <HomwLeft>
                    {/* <Topic /> */}
                    <List />
                </HomwLeft>
                <HomwRight>
                    {/* <RecommendItem /> */}
                    {/* <DownLoadLink /> */}
                    <RecommendedAuthors />
                </HomwRight>
                {/* 回到顶部 */}
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>BACK</BackTop> : null}
            </HomwWrapper>
        )
    }

    bindScrollEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }

    componentDidMount() {
        this.bindScrollEvents();
        // 获得初始化数据
        this.props.getHomeData();
        this.props.getBannerImg();
        this.props.changePath(this.props.history.location.pathname);
    }
    // 在 window 上绑定了事件，可能会影响其他组件。在组件卸载的时候移除这个事件监听
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }

}

const mapStateToProps = state => ({
    bannerImg: state.getIn(['home', 'bannerImg']),
    showScroll: state.getIn(['home', 'showScroll'])
});

const mapDispatchToProps = dispatch => ({
    getHomeData() {
        dispatch(actionCreators.getHomeData());
    },
    getBannerImg() {
        dispatch(actionCreators.getBannerImg());
    },
    changeScrollTopShow() {
        // toggleTopShow 显示或者隐藏回到顶部按钮的 actionCreator
        if (document.documentElement.scrollTop > 300) {
            dispatch(actionCreators.toggleTopShow(true))
        } else {
            dispatch(actionCreators.toggleTopShow(false))
        }
    },
    changePath(pathname) {
        dispatch(headerActionCreators.changePath(pathname));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));