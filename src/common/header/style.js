import styled from 'styled-components';
import logoPic from '../../statics/logo.png';
// 主色调 #e7503f
const rrcolor = '#e7503f';
const minscreenwidth = '850px';

export const HeaderWrapper = styled.div`
    min-height: 56px;
    border-bottom: 1px solid #f0f0f0;
    @media screen and (max-width: 900px) {
        width: 100%;
    }
    overflow: hidden;
    @media screen and (max-width: ${minscreenwidth}) {
        border: none;
    }
`
export const Logo = styled.div`
    float: left;
    height: 56px;
    width: 100px;
    background: url(${logoPic}) no-repeat center bottom;
    background-size: 50px 50px;
    h1 {
        // 隐藏
        text-indent: -999px;
    }
    @media screen and (max-width: ${minscreenwidth}) {
        display: none;
    }
`
export const Nav = styled.div`
    max-width: 1440px;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100%;
`
export const ItemWrapper = styled.div`
    max-width: 960px;
    margin: 0 auto;
    .fontStyle {
        font-size: 20px;
        line-height: 56px;
    }
    .avatar {
        float: right;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        margin-top:8px;
        @media screen and (max-width: 380px ) {
            display: none;
        }
    }
`
export const NavItem = styled.div`
    line-height: 56px;
    padding: 0 15px;
    color: #333;
    &.email {
        float: right;
        padding-right: 0;
        color: ${rrcolor};
    }
    &.home {
        padding-left: 0;
        @media screen and (max-width: ${minscreenwidth}) {
            padding: 0;
        }

        @media screen and (max-width: ${minscreenwidth}) {
            padding-left: 20px;
        }
    }
    &.nickname {
        // 视口小于 380 的隐藏用户名
        @media screen and (max-width: 600px) {
            display: none;
        }
    }
    &.logout, &.login {
        float: right;
        padding-right: 0;
    }
    &.left {
        float: left;
    }
    &.right {
        float: right;
        color: #969696;

    }
    &.active {
        color: #ea6f5a;
    }
    cursor: pointer
`
export const SearchWrapper = styled.div`
    float: left;
    position: relative;
    // flex 让 input 自适应
    display: flex;
    max-width: 300px;

    .zoom {
        position: absolute;
        right: 4px;
        bottom: 5px;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        user-select: none;
        &.focused {
            background-color: gray;
            color: #fff;
        }
        @media screen and (max-width: ${minscreenwidth}) {
            right: 14px;
        }
        &:active {
            background-color: #333;
        }
    }
    // 小屏幕搜索框单独占用一行
    @media screen and (max-width: ${minscreenwidth}) {
        max-width: 100%;
        width: 100%;
    }
`
export const NavSearch = styled.input.attrs({
    placeholder: '搜索'
})`
    width: 100%;
    height: 40px;
    margin-top: 9px;
    padding: 0 35px 0 20px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: 19px;
    background-color: #eee;
    font-size: 14px;
    color: #777;
    margin-left: 10px;
    &::placeholder {
        color: #999;
    }
    // transition: all 0.3s ease-in;
    // &.focused {
    //     width: 300px;
    // }
    @media screen and (max-width: ${minscreenwidth}) {
        margin: 0 10px;
    }
`
export const Addition = styled.div`
    float: right;
    max-width: 220px;
    right: 0;
    top: 0;
    height: 56px;
    margin-left: 20px;
`
export const Button = styled.div`
    float: right;
    line-height: 38px;
    margin-top: 9px;
    margin-right: 20px;
    padding: 0 20px;
    border-radius: 19px;
    border: 1px solid ${rrcolor};
    font-size: 14px;
    &.wrightting {
        color: #fff;
        background-color: ${rrcolor};
    }
    &.reg {
        color: ${rrcolor};
    }
    cursor: pointer;
`