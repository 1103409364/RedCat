import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
// fromJS 会把对象变成 immutable 对象，深层次的转换。还有个方法 List 是浅转换
const defaultState = fromJS({
    bannerImg: '',
    articleList: [],
    pageIndex: 1, //分页，告诉后端要哪一页的数据
    totalPage: 1,
    showScroll: false //是否显示回到顶部
})

// 当 switch 里的语句变复杂的时候，可以进行提取
export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_HOME_DATA:
            return state.merge({
                articleList: fromJS(action.payload.articleList),
                totalPage: fromJS(action.payload.totalPage)
            });
        case actionTypes.CHANGE_BANNERIMG:
            return state.set('bannerImg', action.bannerImg);
        // 加载下一页
        case actionTypes.ADD_ARTICLE_LIST:
            return state.merge({
                articleList: state.get('articleList').concat(fromJS(action.payload.articleList)),
                pageIndex: action.payload.nextPage
            });
        case actionTypes.RESTORE_PAGE_INDEX:
            return state.set('pageIndex', action.defaultIndex);
        case actionTypes.CHANGE_AUTHOR_LIST:
            return state.merge({
                authorList: fromJS(action.authorList),
                authorListPage: action.nextAuthorPage
            })
        case actionTypes.TOGGLE_SCROLL_TOP:
            return state.set('showScroll', action.show);
        default:
            return state;
    }
}