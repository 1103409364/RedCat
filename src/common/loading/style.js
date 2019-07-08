import styled from 'styled-components';
import loadingPic from '../../statics/loading.gif';

export const LoadingWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: #fff;
`
export const Loading = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -100px;
    height: 200px;
    width: 200px;
    background: url(${loadingPic});
    background-size: contain;
    background-repeat: no-repeat;
`