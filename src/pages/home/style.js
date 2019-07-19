import styled from 'styled-components';

export const HomwWrapper = styled.div`
    max-width: 960px;
    margin: 0 auto;
    padding-top: 30px;
    li {
        list-style: none;
    }
    &::after {
        content: '';
        clear: both;
        display: table;
        width: 0;
        height: 0;
        visibility: hidden;
    }
    @media screen and (max-width: 900px) {
        // 改变盒子防止出现横向滚动条
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
    }
`;
export const HomwLeft = styled.div`
    float: left;
    width: 66%;
    // margin: 0 auto;
    @media screen and (max-width: 900px) {
        width: 100%;
    }
`;
export const HomwRight = styled.div`
    width: 280px;
    float: right;
    @media screen and (max-width: 900px) {
        display: none;
`;
export const DailyWallpaper = styled.div`
    background: url(${props => props.bannerImg}) no-repeat center center;
    background-size: 960px auto;
    // width: 100%;
    height: 300px;
    margin-bottom: 20px;
    border-radius: 6px;
    position: relative;

    .bannerTitle {
        display: block;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: #fff;

        span {
            font-size: 18px;
            position: absolute;
            left: 0;
            bottom: 0;
            padding: 10px;
            opacity: 0;
            background-color: #33333347;
            transition: all .3s ease;
        }
        &:hover span {
            opacity: 1;
        }
    }
`;

export const TopicWrapper = styled.div`
    padding: 20px 0 10px 0;
    // margin-left: -18px;
    overflow: hidden;
    border-bottom: 1px solid #dcdcdc;
`;
export const TopicItem = styled.div`
    float: left;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #000;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background-color: #f7f7f7;
    padding: 0 10px;
    margin-right: 18px;
    margin-bottom: 18px;
    text-align: center;
    a {
        text-decoration: none;
        color: #333;
    }
`;
export const LinkMore = styled.div`
    float: left;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    margin-left: 18px;
    margin-bottom: 18px;
    text-align: center;
    a {
        text-decoration: none;
        color: #888;
    }
`;
export const ListItem = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #dcdcdc;
    overflow: hidden;
    .pic {
        width: 125px;
        height: 100px;
        float: right;
        border-radius: 10px;
    }
    
`;
export const ListContent = styled.div`
    width: 100%;
    float: left;
    padding-right: 10px;
    box-sizing: border-box;
    .title {
        line-height: 1.5;
        font-size: 18px;
        font-weight: 700;
        color: #333;
        margin-bottom: 4px;
    }
    .desc {
        line-height: 24px;
        font-size: 13px;
        color: #999;
        margin: 0 0 8px;
    }
    .info {
        color: #b4b4b4;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
    }
    
`;

export const AuthorsTitle = styled.div`
    font-size: 14px;
    color: #787878;
    margin-bottom: 20px;
`;
export const AuthorsSwitch = styled.div`
    font-size: 13px;
    float: right;
    cursor: pointer;
    user-select: none;
    .spin {
        float: left;
        font-size: 13px;
        margin-right: 4px;
        transition: all .3s ease-in;
        // 围绕中心点旋转
        transform-origin: center center;
    }
`;
export const AuthorsItemWrap = styled.ul`
    a {
        text-decoration: none;
        color: #000;
    }
`;
export const AuthorsItem = styled.li`
    overflow: hidden;
    margin-bottom: 15px;

    .avatar {
        margin-right: 10px;
        width: 47px;
        height: 47px;
        border: 1px solid #dcdcdc;
        border-radius: 50%;
        float: left;
    }
    .name {
        margin-top: 5px;
        font-size: 14px;
        line-height: 20px;
    }
    .info {
        font-size: 12px;
        color: #787878;
        line-height: 20px;
    }
    .follow {
        float: right;
        margin-top: 5px;
        padding: 0;
        font-size: 13px;
        color: #42c02e;
    }

`;
export const AuthorsMore = styled.div`
    text-align: center;
    padding: 7px 7px 7px 12px;
    font-size: 13px;
    color: #787878;
    background-color: #f7f7f7;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    a {
        text-decoration: none;
        color: #787878;
        .more {
            margin-left: 10px;
        }
    }

`;
export const LoadMore = styled.div`
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 30px 0;
    background-color: #a5a5a5;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
    color: #fff;
`;
export const BackTop = styled.div`
    color: #999;
    position: fixed;
    right: 100px;
    bottom: 30px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    text-align: center;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    cursor: pointer;
`;