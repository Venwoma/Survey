import React, { useState } from 'react';
import { Input, Form, Button } from 'antd';
import '../../assets/css/forgot/index.scss';
import { useNavigate } from 'react-router-dom';
export default function ForgotApply() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // 邮箱
    const [emailStatus, setEmailStatus] = useState(''); // 邮箱校验状态
    const [emailErrorText, setEmailErrorText] = useState(''); // 邮箱错误文案
    const [emailedSuccess, setEmailedSuccess] = useState(false); // 是否成功发送重置邮件
    const emailBlur = () => {
        console.log(email);
        // 邮箱失焦 邮箱格式校验
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
    // 设置邮箱输入框状态以及文案
    const updateEmailStatusText = (status, text) => {
        setEmailStatus(status);
        setEmailErrorText(text);
    };
    // 返回登录页
    const handleBackSign = () => {
        navigate('/login');
    };
    return (
        <div className="forget-page">
            <span className="forget-title">Reset your password</span>
            <span className="forget-tip">
                {emailedSuccess
                    ? 'We just emailed you the instructions to reset your password'
                    : 'Please enter your email below and we will send you a reset link'}
            </span>
            {emailedSuccess ? (
                <div className="success-wrap">发送成功资源占位</div>
            ) : (
                <div className="apply-form-wrap">
                    <Form className="forget-form">
                        <Form.Item label="" validateStatus={emailStatus} help={emailErrorText}>
                            <div className="form-label">Email Address</div>
                            <Input
                                className="form-input"
                                type="text"
                                placeholder="name@company.com"
                                value={email}
                                onBlur={emailBlur}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Input>
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
