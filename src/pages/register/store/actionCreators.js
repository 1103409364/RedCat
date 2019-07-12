import axios from 'axios';
import * as actionTypes from './actionTypes';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
        .then(res => {
            // 注册成功跳转到登录页
            history.push('./login');
        })
        .catch(err => {
            // 加个错误处理,防止服务器没开的时候程序崩溃
            if (err.response.status === 500) {
                alert(err + ';' + err.response.data);
                return;
            }

            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            });
        })
}

// 清空错误信息
export const clearErrors = () => ({
    type: actionTypes.CLEAR_ERRORS,
    payload: {
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    }
})