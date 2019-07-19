import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { actionCreators } from './store';
import {
    LoginWrapper,
    LoginTitle,
    SignIn,
    SignUp,
    LoginBox,
    Input,
    Button,
    Tip,
} from './style.js';

class Login extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            account: '', // 账号是邮箱或者用户名
            password: '',
            errors: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // 已登录访问登录页时,立即跳转到首页
        // if (this.props.isAuthenticated) {
        //     this.props.history.push('/');
        // }

        document.title = '登录-rr';
    }
    // 组件卸载时,清空 error
    componentWillUnmount() {
        this.props.clearErrors();
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            account: this.state.account,
            password: this.state.password,
        };
        this.props.loginUser(user);
    }

    render() {
        const { isAuthenticated, errors } = this.props;
        // isAuthenticated 通过验证,跳转到首页, 不使用生命周期函数实现
        if (!isAuthenticated) {
            return (
                <LoginWrapper>
                    <LoginBox>
                        <LoginTitle>
                            <Link to="/login">
                                <SignIn>登录</SignIn>
                            </Link>
                            <Link to="/register">
                                <SignUp>注册</SignUp>
                            </Link>
                        </LoginTitle>
                        <Input
                            placeholder="邮箱或者用户名"
                            name="account"
                            value={this.state.account}
                            onChange={this.handleInputChange}
                        />
                        <Tip>{errors.get('account')}</Tip>
                        <Input
                            placeholder="密码"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                        <Tip>{errors.get('password')}</Tip>
                        <Button
                            onClick={this.handleSubmit}
                        >登录</Button>
                    </LoginBox>
                </LoginWrapper>
            );
        } else {
            return <Redirect to="/" />;
        }
    }
}

// Login.propTypes = {
//     loginUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
    errors: state.getIn(['login', 'errors'])
});

const mapDispatchToProps = dispatch => ({
    loginUser(user) {
        dispatch(actionCreators.loginUser(user));
    },
    clearErrors() {
        dispatch(actionCreators.clearErrors());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));