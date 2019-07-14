import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
// fromJS 会把对象变成 immutable 对象，深层次的转换。还有个方法 List 是浅转换
// content 里面存放的实际上是 dom 字符串
const defaultState = fromJS({
    // 状态码：0 表示未发送请求， 1 表示请求成功， -1 表示服务器错误
    postStatus: 0,
    title: '', //标题
    html: '', //mark 之后的 html 文本
    text: '', //原文，修改的时候从服务器拉取
    id: '', //文章id
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_STATUS:
            return state.set('postStatus', action.status);
        case actionTypes.CHANGE_TITLE:
            return state.set('title', action.title);
        case actionTypes.CHANGE_HTML:
            return state.set('html', action.html);
        case actionTypes.CHANGE_TEXT:
            return state.set('text', action.text);
        case actionTypes.CHANGE_CONTENT:
            return state.merge({
                title: action.article.title,
                html: action.article.html,
                text: action.article.text,
                id: action.article._id,
            });
        default:
            return state;
    }
}