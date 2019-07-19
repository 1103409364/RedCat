import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../util/setAuthToken';
import * as actionTypes from './actionTypes';

export const loginUser = (user) => dispatch => {
    axios.post('/api/users/login', user)
        .then(res => {
            const { token } = res.data;
            // 储存 token 到 localStorage
            localStorage.setItem('jwtToken', token);
            // 给请求头加上 token
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
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
        });
};

export const setCurrentUser = decoded => ({
    type: actionTypes.SET_CURRENT_USER,
    payload: decoded
});

export const logoutUser = (history) => dispatch => {
    // 删除 token
    localStorage.removeItem('jwtToken');
    // 去掉请求头的 token
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    // history.push('/login');
};
// 清空错误信息
export const clearErrors = () => ({
    type: actionTypes.CLEAR_ERRORS,
    payload: {
        account: '',
        password: '',
    }
});
// 发送激活邮件
export const sendConfirmMail = () => dispatch => {
    axios.get('/api/users/confirmation')
        .then(res => {
            if (res.data.success) {
                alert('激活邮件已发送，请前往邮箱按照提示激活后，重新登陆');
                // 去除登陆状态
                // 删除 token
                localStorage.removeItem('jwtToken');
                // 去掉请求头的 token
                setAuthToken(false);
                dispatch(setCurrentUser({}));
            }
        });
};

