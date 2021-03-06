import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
// fromJS 会把对象变成 immutable 对象，深层次的转换。还有个方法 List 是浅转换
// content 里面存放的实际上是 dom 字符串
const defaultState = fromJS({
    title: '',
    content: '',
    author: '',
    text: '',
    date: '',
    updateDate: '',
    id: '',
    showScroll: false //是否显示回到顶部
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_DETAIL:
            // console.log(action.data);
            return state.merge({
                // title 和 content 都是字符串,也可以不进行转换
                title: fromJS(action.data.title),
                content: fromJS(action.data.html),
                author: fromJS(action.data.author),
                text: fromJS(action.data.text),
                date: fromJS(action.data.date),
                updateDate: fromJS(action.data.updateDate),
                id: fromJS(action.data._id),
            });
        case actionTypes.TOGGLE_SCROLL_TOP:
            return state.set('showScroll', action.show);
        default:
            return state;
    }
}