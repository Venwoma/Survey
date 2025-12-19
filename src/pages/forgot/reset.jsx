import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
import '../../assets/css/forgot/index.scss';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
export default function ForgotReset() {
    const navigate = useNavigate();
    const [password, setPassword] = useState(''); // 密码
    const [passwordVisible, setPasswordVisible] = useState(false); // 密码是否可见
    const [confirmPassword, setConfirmPassword] = useState(''); // 确认密码
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // 确认密码是否可见
    const [passwordStatus, setPasswordStatus] = useState(''); // 密码校验状态
    const [passwordErrorText, setPasswordErrorText] = useState(''); // 密码错误文案
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(''); // 确认密码校验状态
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState(''); // 确认密码错误文案
    const [resetSuccess, setResetSuccess] = useState(true); // 是否成功重置密码

    // 密码失焦，校验密码
    const passwordBlur = () => {
        if (!password) {
            updatePasswordStatusText('error', 'Password is required.');
            return;
        }
        updatePasswordStatusText('', '');
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

    // 返回登录页
    const handleBackSign = () => {
        navigate('/login');
    };
    return (
        <div className="forget-page">
            <span className="forget-title">Reset your password</span>
            {!resetSuccess && (
                <span className="forget-tip">
                    Enter a new password for <span className="text-blue">xxxx@idiaoyan.com</span>
                </span>
            )}
            {resetSuccess ? (
                <div className="success-wrap">重置成功资源占位</div>
            ) : (
                <div className="reset-form-wrap">
                    <Form className="forget-form">
                        <Form.Item label="" validateStatus={passwordStatus} help={passwordErrorText}>
                            <div className="form-label">Your new password</div>
                            <Input.Password
                                className="form-input"
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
                            <div className="form-label">Confirm your new password</div>
                            <Input.Password
                                className="form-input"
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
                    <Button className="forget-button" type="primary">
                        Continue with Email
                    </Button>
                </div>
            )}

            <div className="back-button" onClick={handleBackSign}>
                <div className="back-icon"></div>
                Back to sign in page
            </div>
            <div className="policy-text">
                <span className="text-button">Terms of Service </span>
                and
                <span className="text-button"> Privacy Policy</span>
            </div>
        </div>
    );
}
