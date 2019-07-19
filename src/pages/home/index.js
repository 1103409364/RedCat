import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actionCreators } from './store';
import { actionCreators as headerActionCreators } from '../../common/header/store';
import List from './components/List';
import Calendar from './components/Calendar';

import {
    HomwWrapper,
    HomwLeft,
    HomwRight,
    DailyWallpaper
} from './style.js';
import { BackTop } from '../../common/BackTop/style.js';

class Home extends React.PureComponent {
    componentDidMount() {
        this.bindScrollEvents();
        // 获得初始化数据
        this.props.getHomeData();
        this.props.getBannerImg();
        this.props.changePath(this.props.history.location.pathname);
        // 更改标签页标题
        document.title = '首页-rr';
    }
    // 在 window 上绑定了事件，可能会影响其他组件。在组件卸载的时候移除这个事件监听
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow);
    }

    handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    bindScrollEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }

    render() {
        const { bannerImg, showScroll } = this.props;
        return (
            <HomwWrapper>
                <DailyWallpaper bannerImg={bannerImg} >
                    <a className="bannerTitle" href={this.props.bannerImg} target="_blank" rel="noopener noreferrer">
                        <span>
                            Bing 每日高清壁纸- 精彩，从这里开始
                        </span>
                    </a>
                </DailyWallpaper>

                <HomwLeft>
                    {/* <Topic /> */}
                    <List />
                </HomwLeft>
                <HomwRight>
                    <Calendar callback={(date) => { console.log(date) }} />
                </HomwRight>
                {/* 回到顶部 */}
                {showScroll ? <BackTop onClick={this.handleScrollTop}>BackTop</BackTop> : null}
            </HomwWrapper>
        );
    }
}

const mapStateToProps = state => ({
    bannerImg: state.getIn(['home', 'bannerImg']),
    showScroll: state.getIn(['home', 'showScroll']),
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
            dispatch(actionCreators.toggleTopShow(true));
        } else {
            dispatch(actionCreators.toggleTopShow(false));
        }
    },
    changePath(pathname) {
        dispatch(headerActionCreators.changePath(pathname));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));