import axios from 'axios';
import * as actionTypes from './actionTypes';

export const changeStatus = (status) => ({
    type: actionTypes.CHANGE_STATUS,
    status
});

export const changeTitle = (title) => ({
    type: actionTypes.CHANGE_TITLE,
    title
});

export const changeHtml = (html) => ({
    type: actionTypes.CHANGE_HTML,
    html
});

export const changeText = (text) => ({
    type: actionTypes.CHANGE_TEXT,
    text
});

// 恢复默认状态
export const restoreStatus = () => ({
    type: actionTypes.CHANGE_STATUS,
    status: 0
});

export const postArticle = (article, inputDiv) => {
    return (dispatch) => {
        // 实际请求的时候,会给后端不同的 id 参数,后端根据不同的 id 返回内容
        axios.post('/api/write/post', article)
            .then(res => {
                const result = res.data.success;
                if (result) {
                    // console.log(result)
                    dispatch(changeStatus(1));
                    dispatch(changeTitle(''));
                    dispatch(changeText(''));
                    dispatch(changeHtml(''));
                    // 组件中传一个dom过来，清空输入框。HTML 属性无法设置 div 的值，只能操作 dom
                    inputDiv.innerText = '';
                    // 显示提示消息框。使用定时器，两秒之后恢复默认状态
                    if(window.timmer) clearTimeout(window.timmer);
                    window.timmer = setTimeout(() => dispatch(restoreStatus()), 2000);
                } else {
                    if(window.timmer) clearTimeout(window.timmer);
                    window.timmer = setTimeout(() => dispatch(restoreStatus()), 2000);
                }
            }).catch((e) => {
                console.log('error', e);
                dispatch(changeStatus(-1));
                if(window.timmer) clearTimeout(window.timmer);
                window.timmer = setTimeout(() => dispatch(restoreStatus()), 2000);
            });
    }
}

// 控制回到顶部按钮的显示和隐藏, 同时使用了 localstate 无法绑定全局 state
// export const toggleTopShow = (show) => ({
//     type: actionTypes.TOGGLE_SCROLL_TOP,
//     show
// })
