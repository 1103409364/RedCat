// 把普通组件包装成异步组建
import React from 'react';
import Loadable from 'react-loadable';
import {
    Loading,
    LoadingWrapper
} from '../../common/loading/style.js';


const LoadableComponent = Loadable({
    // 需要异步加载的组件 import 进来，这里引入当前路径下的 index.js
    loader: () => import('./'),
    // loding 是加载中要渲染的组件, 提示用户正在加载
    loading() {
        return (
            <LoadingWrapper>
                <Loading></Loading>
            </LoadingWrapper>
        );
    }
});
// 导出一个无状态组件
export default () => <LoadableComponent />;