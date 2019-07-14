import axios from 'axios';
import * as actionTypes from './actionTypes';

// 改变文章列表的数据
const changeHomeData = result => ({
    type: actionTypes.CHANGE_HOME_DATA,
    payload: result
});

// 恢复为第一页
export const restorePageIndex = () => ({
    type: actionTypes.RESTORE_PAGE_INDEX,
    defaultIndex: 1
})

// 加载更多文章, 后端分页
const addArticleList = (result) => ({
    type: actionTypes.ADD_ARTICLE_LIST,
    payload: result
})

// 获得列表初始数据, 默认显示第一页
export const getHomeData = () => {
    return dispatch => {
        axios.get('/api/home/articleList?page=1').then(res => {
            const result = res.data.data;

            if (result.success) {
                const listData = {
                    articleList: result.articles,
                    totalPage: result.totalPage
                }
                dispatch(changeHomeData(listData));
            } else {
                console.log(result);
            }
        }).catch(() => {
            console.log('error');
        })
    }
}

// 搜索文章, 默认显示第一页, 中文会被 uri 编码
export const getSomeList = (searchValue) => {
    return (dispatch) => {
        axios.get(`./api/home/articleList?page=1&search=${searchValue}`).then((res) => {
            const result = res.data.data;
            if (result.success) {
                const listData = {
                    articleList: result.articles,
                    totalPage: result.totalPage
                }
                dispatch(changeHomeData(listData));
                dispatch(restorePageIndex());

            } else {
                console.log(result);
            }
        }).catch(() => {
            console.log('error');
        })
    }
}

// 获取更多文章,后端根据请求参数中的页码和查询字符串返回不同的内容
export const getMoreList = (nextPage, searchValue) => {
    return (dispatch) => {
        axios.get(`./api/home/articleList?page=${nextPage}&search=${searchValue}`).then((res) => {
            const result = res.data.data;
            if (result.success) {
                // 更新页码和文章列表
                const moreList = {
                    articleList: result.articles,
                    nextPage
                }
                dispatch(addArticleList(moreList));
            } else {
                console.log(result);
            }
            console.log(result)
        }).catch(() => {
            console.log('error');
        })
    }
}

// 改变 banner 图
const changeBannerImg = bannerImg => ({
    type: actionTypes.CHANGE_BANNERIMG,
    bannerImg
})
// 获得 banner 图
export const getBannerImg = () => {
    return (dispatch) => {
        axios.get('/api/home/bannerImg').then(res => {
            const imgUrl = res.data.defaultUrl;
            // console.log(res.data)
            dispatch(changeBannerImg(imgUrl));
        }).catch(() => {
            console.log('error');
        })
    }
}

// 控制回到顶部按钮的显示和隐藏
export const toggleTopShow = (show) => ({
    type: actionTypes.TOGGLE_SCROLL_TOP,
    show
})