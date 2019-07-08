import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Write from './pages/write/loadable.js';
import Login from './pages/login/loadable.js';
import Register from './pages/register/loadable.js';
//  引入全局样式
import { GlobalStyled } from './style.js';
import { Iconfont } from './statics/iconfont/iconfont.js';
import store from './store';

// 首次载入或者刷新都会从本地 localstorage 读取数据
import jwt_decode from 'jwt-decode';
import setAuthToken from './pages/login/util/setAuthToken';
import { actionCreators } from './pages/login/store';
// 看看本地有没有 token
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    // 从 token 中读取当前用户,让他处于登陆状态
    store.dispatch(actionCreators.setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
     // 检测 token 是否过期
    if (decoded.exp < currentTime) {
        // 过期退出
        store.dispatch(actionCreators.logoutUser());
        // 跳转到登录页
        window.location.href = '/login'
    }
}

function App() {
    return (
        <Provider store={store}>
            <GlobalStyled />
            <Iconfont />
            <Router>
                <Header />
                <Route path='/' exact component={Home}></Route>
                {/* 要求传递一个 id */}
                <Route path='/detail/:id' exact component={Detail}></Route>
                <Route path='/write/' exact component={Write}></Route>
                <Route path='/login/' exact component={Login}></Route>
                <Route path='/register/' exact component={Register}></Route>
            </Router>
        </Provider>
    );
}

export default App;
