import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
// fromJS 会把对象变成 immutable 对象，深层次的转换。还有个方法 List 是浅转换
import isEmpty from '../util/is-empty';
const defaultState = fromJS({
    isAuthenticated: false, // 是否通过验证
    user: {},
    errors: {
        email: '',
        password: '',
    }
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return state.merge({
                user: fromJS(action.payload),
                isAuthenticated: !isEmpty(action.payload) // token 解析出的 user 就是用户信息,如果非空就说明验证通过
            });
        // 错误处理
        case actionTypes.GET_ERRORS:
            return state.set('errors', fromJS(action.payload));
        case actionTypes.CLEAR_ERRORS:
            return state.set('errors', fromJS(action.payload));
        default:
            return state;
    }
};