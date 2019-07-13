import styled from 'styled-components';

export const DetailWrapper = styled.div`
    max-width: 620px;
    margin: 0 auto;
    padding-top: 30px;
    &::after {
        content: '';
        clear: both;
        display: table;
        width: 0;
        height: 0;
        visibility: hidden;
    }
    @media screen and (max-width: 900px) {
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
    }
`
export const Header = styled.div`
    margin-top: 50px 0 20px 0;
    line-height: 44px;
    font-size: 34px;
    color: #333;
    font-weight: bold;
`
export const Author = styled.div`
    .info {
        font-size: 14px;
        line-height: 20px;
        color: #999;
        a{
            text-decoration: none;
            color: #999;
        }
        .btnWrap {
            display: inline;
            .edit, .delete {
                cursor: pointer;
                padding-left: 10px;
            }
        }
    }
`
export const Content = styled.div`
    color: #2f2f2f;
    margin-top: 30px;
`