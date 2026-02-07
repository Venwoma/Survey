import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Input, Form, Checkbox, Button } from 'antd';
import ThirdButton from '../../compoments/login/thirdButton';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { httpAuthLogin } from '../../api/login';

export default function Index() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // 邮箱
    const [password, setPassword] = useState(''); // 密码
    const [passwordVisible, setPasswordVisible] = useState(false); // 密码是否可见
    const [keepLogin, setKeepLogin] = useState(true); // 记住登录状态
    const [emailStatus, setEmailStatus] = useState(''); // 邮箱校验状态
    const [emailErrorText, setEmailErrorText] = useState(''); // 邮箱错误文案
    const [passwordStatus, setPasswordStatus] = useState(''); // 密码校验状态
    const [passwordErrorText, setPasswordErrorText] = useState(''); // 密码错误文案

    const handleClickGoogle = () => {
        console.log('点击谷歌登录');
        const clientId = '403224735743-r7p4dvcn6o52l9cpcbs27m9srvfkfibn.apps.googleusercontent.com';
        const redirectUri = 'http://localhost:5173';
        const responseType = 'code';
        const scope = 'openid%20email%20profile';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
        window.location.href = authUrl;
    };

    const handleClickMicrosoft = () => {
        console.log('点击微软登录');
        const clientId = 'c44b4083-3bb0-49c1-b47d-974e53cbdf3c';
        const redirectUri = 'http://localhost:5173';
        const responseType = 'code';
        const responseMode = 'fragment';
        const scope = 'https%3A%2F%2Fmanagement.core.windows.net%2F%2F.default%20openid%20profile%20offline_access';
        const authUrl = `https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&response_mode=${responseMode}&scope=${scope}`;
        window.location.href = authUrl;
    };

    // 邮箱失焦，校验邮箱格式
    const emailBlur = () => {
        if (!email) {
            updateEmailStatusText('error', 'Email address is required.');
            return;
        }
        console.log(email);
        // 邮箱失焦 邮箱格式校验
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        console.log(emailRegex.test(String(email).toLowerCase()));
        if (!emailRegex.test(String(email).toLowerCase())) {
            updateEmailStatusText('error', 'Email address is not valid');
        } else {
            updateEmailStatusText('', '');
        }
    };

    // 密码失焦，校验密码
    const passwordBlur = () => {
        if (!password) {
            updatePasswordStatusText('error', 'Password is required.');
            return;
        }
        updatePasswordStatusText('', '');
    };

    // 设置邮箱输入框状态以及文案
    const updateEmailStatusText = (status, text) => {
        setEmailStatus(status);
        setEmailErrorText(text);
    };

    // 设置密码输入框状态以及文案
    const updatePasswordStatusText = (status, text) => {
        setPasswordStatus(status);
        setPasswordErrorText(text);
    };

    // 选中/取消保持登录
    const handleCheckKeep = (e) => {
        console.log(e.target.checked);
        setKeepLogin(e.target.checked);
    };

    // 忘记密码，跳转密码重置申请页
    const handleClickForgot = () => {
        navigate('/forgot/apply');
    };

    // 点击注册，跳转注册页
    const handleClickRegister = () => {
        navigate('/login/register');
    };
    const keepSubmit = () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedEmail) {
            message.error('Please enter your email!'); // 提示用户输入邮箱
            return; // 终止函数执行，不发起请求
        }

        if (!trimmedPassword) {
            message.error('Please enter your password!'); // 提示用户输入密码
            return; // 终止函数执行，不发起请求
        }

        const emailReg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailReg.test(trimmedEmail)) {
            message.error('Please enter a valid email address!');
            return;
        }

        if (trimmedPassword.length < 6) {
            message.error('Password must be at least 6 characters!');
            return;
        }

        httpAuthLogin({ email, password })
            .then((res) => {
                if (res.code === 200) {
                    console.log('登录成功', res);

                    localStorage.setItem('token', res.data.token);

                    navigate('/admin');
                } else {
                    console.log('登录失败', res.message);
                }
            })
            .catch((err) => {
                console.log('接口异常', err);
            });
    };

    return (
        <div className="login-page">
            <div className="login-content">
                <div className="login-logo"></div>
                <span className="login-title">Sign in to your account</span>
                <span className="login-tips">Get insight with pop-up surveys</span>
                {/* 谷歌/微软登录 */}
                <div className="third-login-button-group">
                    <ThirdButton text="Continue with Google" width="240" onClick={handleClickGoogle}></ThirdButton>
                    <ThirdButton text="Continue with Microsoft" width="240" onClick={handleClickMicrosoft}></ThirdButton>
                </div>
                <div className="email-tips">
                    <span className="gray-line"></span>OR CONTINUE WITH EMAIL
                    <span className="gray-line"></span>
                </div>
                <Form className="email-form">
                    <Form.Item label="" validateStatus={emailStatus} help={emailErrorText}>
                        <div className="input-name">Email Address</div>
                        <Input
                            className="login-input"
                            type="text"
                            placeholder="name@company.com"
                            value={email}
                            onBlur={emailBlur}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Input>
                    </Form.Item>
                    <Form.Item label="" validateStatus={passwordStatus} help={passwordErrorText}>
                        <div className="input-name">Password</div>
                        <Input.Password
                            className="login-input"
                            placeholder="Enter your password"
                            value={password}
                            iconRender={(passwordVisible) => (passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={passwordBlur}
                            visibilityToggle={{
                                passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                        ></Input.Password>
                    </Form.Item>
                </Form>
                <div className="login-operation">
                    <Checkbox className="keep-check" checked={keepLogin} onChange={handleCheckKeep}>
                        Keep me signed in
                    </Checkbox>
                    <div className="forgot-button" onClick={handleClickForgot}>
                        Forgot password?
                    </div>
                </div>
                <Button className="email-login-button" type="primary" onClick={keepSubmit}>
                    Continue with Email
                </Button>
                <span className="policy-register-text">
                    By continuing, you agree to our <span className="text-button">Terms of Service</span> and{' '}
                    <span className="text-button">Privacy Policy</span>
                </span>
                <span className="policy-register-text">
                    New to insightto?
                    <span className="text-button" onClick={handleClickRegister}>
                        Create your account here
                    </span>
                </span>
            </div>
        </div>
    );
}
