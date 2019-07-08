import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { actionCreators } from './store';
// import {

// } from './style.js'

class Write extends React.PureComponent {
    render() {
        const { isAuthenticated } = this.props;
        // 未登陆渲染登陆页,已登陆,跳转到首页
        if (isAuthenticated) {
            return (
                <div>Write</div>
            )
        }

        return <Redirect to="/login" />
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
});

const mapDispatchToProps = dispatch => ({
    // login(account, password) {
    //     dispatch(actionCreators.login(account.value, password.value));
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(Write);