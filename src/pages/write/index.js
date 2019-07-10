import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { actionCreators } from './store';
import { actionCreators as headerActionCreators} from '../../common/header/store';
// import {

// } from './style.js'

class Write extends React.PureComponent {
    render() {
        const { isAuthenticated } = this.props;
        // 未登陆渲染登陆页,已登陆,跳转到首页
        if (isAuthenticated) {
            return (
                <div>Write{
                    // console.log(this.props.history.location.pathname)
                    
                }</div>
            )
        }

        return <Redirect to="/login" />
    }

    componentDidMount() {
        this.props.changePath(this.props.history.location.pathname);
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
});

const mapDispatchToProps = dispatch => ({
    changePath(pathname) {
        dispatch(headerActionCreators.changePath(pathname));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Write));