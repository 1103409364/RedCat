import React from 'react';
// import { Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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

class Login extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
    }

    componentDidMount() {
        // 已登录访问登陆页时,立即跳转到首页
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.props;
        return (
            <LoginWrapper>
                <LoginBox>
                    <LoginTitle>
                        <Link to="/login">
                            <SignIn>登陆</SignIn>
                        </Link>
                        <Link to="/register">
                            <SignUp>注册</SignUp>
                        </Link>
                    </LoginTitle>
                    <Input
                        placeholder="邮箱"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange} />
                    <Tip>{errors.get('email')}</Tip>
                    <Input
                        placeholder="密码"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                    <Tip>{errors.get('password')}</Tip>
                    <Button
                        onClick={this.handleSubmit}
                    >登陆</Button>
                </LoginBox>
            </LoginWrapper>
        )
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));