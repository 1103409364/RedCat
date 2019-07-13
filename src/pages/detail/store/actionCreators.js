import axios from 'axios';
import * as actionTypes from './actionTypes';

const changeDetail = (data) => ({
    type: actionTypes.CHANGE_DETAIL,
    data
});

// 获得文章全部内容
export const getDetail = (id) => {
    return (dispatch) => {
        // 后端根据不同的 id 返回内容
        axios.get('/api/detail/article?id=' + id).then(res => {
            const result = res.data.data;
            dispatch(changeDetail(result));
            // 改变标签栏的标题
            document.title = result.title;
        }).catch(()=>{
            console.log('error');
        });
    }
}
// 删除文章
export const deleteArticle = (articleId, history) => {
    return (dispatch) => {
        // 删除
        console.log(articleId)
        axios.delete('/api/detail/delete', {data:{id:articleId}}).then(res => {
            const result = res.data.data;
            // 显示删除成功消息
            alert('删除成功');
            dispatch(changeDetail({}));
            // 删除成功跳转到首页
            history.push('/');
        }).catch((err)=>{
            alert('删除失败');
            console.log('error', err);
        });
    }
}

// 控制回到顶部按钮的显示和隐藏
export const toggleTopShow = (show) => ({
    type: actionTypes.TOGGLE_SCROLL_TOP,
    show
})