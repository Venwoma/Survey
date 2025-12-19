import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
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
    };

    // 邮箱失焦，校验邮箱格式
    const emailBlur = () => {
        if (!email) {
            updateEmailStatusText('error', 'Email address is required.');
            //   红框闪烁
            //   setTimeout(() => {
            //     setEmailStatus("");
            //     setTimeout(() => {
            //       setEmailStatus("error");
            //       setTimeout(() => {
            //         setEmailStatus("");
            //       }, 500);
            //     }, 500);
            //   }, 500);
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
        if (confirmPassword && confirmPassword !== password) {
            // 确认密码不一致
            updateConfirmPasswordStatusText('error', "Password didn't match");
            return;
        } else {
            updateConfirmPasswordStatusText('', '');
            return;
        }
    };

    // 确认密码失焦，校验确认密码
    const confirmPasswordBlur = () => {
        if (!confirmPassword) {
            updateConfirmPasswordStatusText('error', 'Password is required.');
            return;
        }
        if (confirmPassword !== password) {
            // 确认密码不一致
            updateConfirmPasswordStatusText('error', "Password didn't match");
            return;
        }
        updateConfirmPasswordStatusText('', '');
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

    //点击注册
    const handleClickRegister = () => {
        // todo，邮箱密码校验
        httpAuthRegister({
            email: email,
            password: password,
        }).then((res) => {
            console.log('res=====', res);
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
                            placeholder="Enter your password"
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
                            placeholder="Enter your password"
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
