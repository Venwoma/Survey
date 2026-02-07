import React, { useState } from 'react';
import { Input, Form, Button, message } from 'antd'; // 新增 message 组件用于提示
import ThirdButton from '../../compoments/login/thirdButton';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { httpAuthRegister } from '../../api/login';

export default function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // 邮箱
    const [password, setPassword] = useState(''); // 密码
    const [passwordVisible, setPasswordVisible] = useState(false); // 密码是否可见
    const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // 确认密码是否可见
    const [emailStatus, setEmailStatus] = useState(''); // 邮箱校验状态
    const [emailErrorText, setEmailErrorText] = useState(''); // 邮箱错误文案
    const [passwordStatus, setPasswordStatus] = useState(''); // 密码校验状态
    const [passwordErrorText, setPasswordErrorText] = useState(''); // 密码错误文案
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(''); // 确认密码校验状态
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState(''); // 确认密码错误文案

    // 谷歌注册
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
        validateEmail(); // 复用独立的邮箱校验函数
    };

    // 独立的邮箱校验函数（供失焦和提交时复用）
    const validateEmail = () => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            updateEmailStatusText('error', 'Email address is required.');
            return false;
        }
        // 邮箱格式校验
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(trimmedEmail).toLowerCase())) {
            updateEmailStatusText('error', 'Email address is not valid');
            return false;
        }
        updateEmailStatusText('', '');
        return true;
    };

    // 密码失焦，校验密码
    const passwordBlur = () => {
        validatePassword(); // 复用独立的密码校验函数
    };

    // 独立的密码校验函数（供失焦和提交时复用）
    const validatePassword = () => {
        const trimmedPassword = password.trim();
        if (!trimmedPassword) {
            updatePasswordStatusText('error', 'Password is required.');
            return false;
        }
        // 可选：密码强度校验（至少8位，包含字母+数字）
        const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!pwdRegex.test(trimmedPassword)) {
            updatePasswordStatusText('error', 'Password must be at least 8 characters and contain letters and numbers');
            return false;
        }
        updatePasswordStatusText('', '');
        return true;
    };

    // 确认密码失焦，校验确认密码
    const confirmPasswordBlur = () => {
        validateConfirmPassword(); // 复用独立的确认密码校验函数
    };

    // 独立的确认密码校验函数（供失焦和提交时复用）
    const validateConfirmPassword = () => {
        const trimmedConfirmPwd = confirmPassword.trim();
        if (!trimmedConfirmPwd) {
            updateConfirmPasswordStatusText('error', 'Password is required.');
            return false;
        }
        if (trimmedConfirmPwd !== password.trim()) {
            updateConfirmPasswordStatusText('error', "Password didn't match");
            return false;
        }
        updateConfirmPasswordStatusText('', '');
        return true;
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

    // 设置确认密码输入框状态以及文案
    const updateConfirmPasswordStatusText = (status, text) => {
        setConfirmPasswordStatus(status);
        setConfirmPasswordErrorText(text);
    };

    // 跳转登录页
    const handleClickSign = () => {
        navigate('/login');
    };

    // 点击注册（核心修改：添加完整校验逻辑）
    const handleClickRegister = () => {
        // 1. 先执行所有校验（复用已有的校验函数）
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPwdValid = validateConfirmPassword();

        // 2. 只要有一个校验不通过，终止注册流程
        if (!isEmailValid || !isPasswordValid || !isConfirmPwdValid) {
            message.warning('Please fix the errors above before continuing'); // 全局提示
            return;
        }

        // 3. 所有校验通过，发起注册请求
        httpAuthRegister({
            email: email.trim(), // 传入去空格后的邮箱
            password: password.trim(), // 传入去空格后的密码
        })
            .then((res) => {
                if (res && res.code === 200) {
                    // 增加 res 非空判断，避免报错
                    console.log('注册成功', res);
                    message.success('Registration successful! Redirecting to login...'); // 友好提示
                    localStorage.setItem('token', res.data.token);
                    setTimeout(() => {
                        // 延迟跳转，让用户看到提示
                        navigate('..');
                    }, 1500);
                } else {
                    const errorMsg = res?.message || 'Registration failed!';
                    message.error(errorMsg); // UI 提示错误
                    console.log('注册失败', errorMsg);
                }
            })
            .catch((err) => {
                message.error('Network error! Please try again later.'); // 网络异常提示
                console.log('接口异常', err);
            });
    };

    return (
        <div className="register-page">
            <div className="register-content">
                <div className="register-logo"></div>
                <span className="register-title">Let's get started</span>
                <span className="register-tips">Get insight with pop-up surveys</span>
                <Form className="email-form">
                    <Form.Item label="" validateStatus={emailStatus} help={emailErrorText}>
                        <div className="input-name">Email Address</div>
                        <Input
                            className="register-input"
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
                            className="register-input"
                            placeholder="Enter your password (at least 8 chars, letters + numbers)" // 提示密码规则
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={passwordBlur}
                            iconRender={(passwordVisible) => (passwordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                            visibilityToggle={{
                                passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                        ></Input.Password>
                    </Form.Item>
                    <Form.Item label="" validateStatus={confirmPasswordStatus} help={confirmPasswordErrorText}>
                        <div className="input-name">Confirm your password</div>
                        <Input.Password
                            className="register-input"
                            placeholder="Enter your password again"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onBlur={confirmPasswordBlur}
                            iconRender={(confirmPasswordVisible) => (confirmPasswordVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                            visibilityToggle={{
                                confirmPasswordVisible,
                                onVisibleChange: setConfirmPasswordVisible,
                            }}
                        ></Input.Password>
                    </Form.Item>
                </Form>

                <Button className="email-register-button" type="primary" onClick={handleClickRegister}>
                    Continue with Email
                </Button>

                <div className="email-tips">
                    <span className="gray-line"></span>OR CONTINUE WITH EMAIL
                    <span className="gray-line"></span>
                </div>

                {/* 谷歌/微软 */}
                <div className="third-register-button-group">
                    <ThirdButton text="Continue with Google" width="240" onClick={handleClickGoogle}></ThirdButton>
                    <ThirdButton text="Continue with Microsoft" width="240" onClick={handleClickMicrosoft}></ThirdButton>
                </div>

                <span className="policy-register-text">
                    By continuing, you agree to our <span className="text-button">Terms of Service</span> and{' '}
                    <span className="text-button">Privacy Policy</span>
                </span>
                <span className="policy-register-text">
                    Already have an account
                    <span className="text-button" onClick={handleClickSign}>
                        {' '}
                        Sign in
                    </span>
                </span>
            </div>
        </div>
    );
}
