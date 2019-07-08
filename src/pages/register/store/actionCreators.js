import axios from 'axios';
import * as actionTypes from './actionTypes';

export const registerUser = (user, history) => dispatch => {
    axios.post('/api/users/register', user)
        .then(res => {
            // console.log('success');
            // 注册成功跳转到登录页
            history.push('./login');
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            });
        })
}
