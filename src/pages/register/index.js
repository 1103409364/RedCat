import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter,Redirect } from 'react-router-dom';
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
} from './style.js'

class Register extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        // history 是路由组件自动传进来的
        this.props.registerUser(user, this.props.history);
    }

    // componentDidMount() {
    //     // 检查是否经过登陆验证
    //     // 如果用户已经登陆了,当用户再访问登陆或者注册的路由时,应该立即跳转到首页
    //     if (this.props.isAuthenticated) {
    //         this.props.history.push('/');
    //     }
    // }
    componentWillUnmount() {
        this.props.clearErrors();
    }

    render() {
        const { isAuthenticated, errors } = this.props;

        if (!isAuthenticated) {
            return (
                <LoginWrapper>
                    <LoginBox>
                        <LoginTitle>
                            <Link to="/login">
                                <SignIn>登陆</SignIn>
                            </Link>
                            <Link to="/register">
                                <SignUp >注册</SignUp>
                            </Link>
                        </LoginTitle>
                        <Input
                            name="name"
                            placeholder="用户名"
                            value={this.state.name}
                            onChange={this.handleInputChange} />
                        <Tip>{errors.get('name')}</Tip>
                        <Input
                            name="email"
                            placeholder="邮箱"
                            value={this.state.email}
                            onChange={this.handleInputChange} />
                        <Tip>{errors.get('email')}</Tip>
                        <Input
                            name="password"
                            placeholder="密码"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInputChange} />
                        <Tip>{errors.get('password')}</Tip>
                        <Input
                            name="password_confirm"
                            placeholder="确认密码"
                            type="password"
                            value={this.state.password_confirm}
                            onChange={this.handleInputChange} />
                        <Tip>{errors.get('password_confirm')}</Tip>
                        <Button
                            onClick={this.handleSubmit}
                        >注册</Button>
                    </LoginBox>
                </LoginWrapper>
            )
        } else {
            return <Redirect to="/" />
        }
    }
}

// Register.propTypes = {
//     registerUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    isAuthenticated: state.getIn(['login', 'isAuthenticated']),
    errors: state.getIn(['register', 'errors'])
});

const mapDispatchToProps = dispatch => ({
    registerUser(user, history) {
        dispatch(actionCreators.registerUser(user, history))
    },
    clearErrors() {
        dispatch(actionCreators.clearErrors());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));