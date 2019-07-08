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
            dispatch({
                type: actionTypes.GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const setCurrentUser = decoded => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = (history) => dispatch => {
    // 删除 token
    localStorage.removeItem('jwtToken');
    // 去掉请求头的 token
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
