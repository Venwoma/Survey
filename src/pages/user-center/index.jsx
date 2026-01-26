import '../../assets/css/user-center/index.scss';
import { commonStore } from '../../store';
import Leftmenu from '../../compoments/user-center/leftMenu';
import Accounts from '../../compoments/user-center/accounts';
import DeleteAccount from '../../compoments/user-center/delete';
import { Button, Input, message, Modal } from 'antd';
import { CheckSmall } from '@icon-park/react';
import { useState } from 'react';

export default function UserCenterIndex() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentUserName, setCurrentUserName] = useState('User_google_7684');
    const [currentEmail, setCurrentEmail] = useState('zhiqianj68@gmail.com');

    const showModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);

        if (type === 'name') setNewUsername(currentUserName);
        if (type === 'email') setNewEmail(currentEmail);
        if (type === 'password') {
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setModalType('');
        setNewUsername('');
        setNewEmail('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleOk = () => {
        try {
            if (modalType === 'name') {
                console.log('更新后的用户名：', newUsername);
                setCurrentUserName(newUsername);
                message.success('Username updated successfully!');
            } else if (modalType === 'email') {
                console.log('更新后的邮箱：', newEmail);
                setCurrentEmail(newEmail);
                message.success('Email updated successfully!');
            } else if (modalType === 'password') {
                if (newPassword !== confirmPassword) {
                    message.error('Password do not match!');
                    return;
                }
                console.log('更新后的密码：', newPassword);
                message.success('Password updated successfully!');
            }
            handleCancel();
        } catch (err) {
            message.error('Update failed, please try again!');
        }
    };

    const isConfirmDisabled = () => {
        if (modalType === 'name') return !newUsername.trim() || newUsername === 'User_google_7684';
        if (modalType === 'email') return !newEmail.trim() || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(newEmail);
        if (modalType === 'password') {
            return !newPassword.trim() || newPassword !== confirmPassword || newPassword.length < 6;
        }
        return true;
    };

    const renderModalContent = () => {
        switch (modalType) {
            case 'name':
                return (
                    <>
                        <div>Username</div>
                        <Input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} maxLength={20} placeholder="Enter new username" />
                    </>
                );
            case 'email':
                return (
                    <>
                        <div>we'll send an email to the address for you to comfirm.</div>
                        <div>Your email</div>
                        <Input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} maxLength={20} placeholder="Enter new email address" />
                    </>
                );
            case 'password':
                return (
                    <>
                        <div>After setting your password, you can log in by your email and password.</div>
                        <div>New password</div>
                        <Input.Password
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password (at least 6 characters)"
                            style={{ marginBottom: 16 }}
                        />
                        <div>Confirm new password</div>
                        <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" />
                    </>
                );
            default:
                return null;
        }
    };

    const messageApi = commonStore((state) => state.messageApi);

    const socialAccounts = [
        {
            name: 'Google Account',
            desc: 'zhiqianj68@gmail.com',
            iconColor: '#4285F4', // Google品牌色
            btnText: 'Disconnect',
        },
        {
            name: 'Microsoft Account',
            desc: 'Connect to sign in with Microsoft',
            iconColor: '#00A4EF', // Microsoft品牌色
            btnText: 'Connect',
        },
        {
            name: 'Facebook',
            desc: 'Connect to sign in with Facebook',
            iconColor: '#4a90e2', // Facebook品牌色
            btnText: 'Connect',
        },
        {
            name: 'X',
            desc: 'Connect to sign in with X',
            iconColor: '#1DA1F2', // X(Twitter)品牌色
            btnText: 'Connect',
        },
        {
            name: 'LinkedIn',
            desc: 'Connect to sign in with LinkedIn',
            iconColor: '#0077B5', // LinkedIn品牌色
            btnText: 'Connect',
        },
    ];

    return (
        <div className="user-center-container">
            <div className="user-content-wrapper">
                <div className="user-left-menu">
                    <Leftmenu />
                </div>

                <div className="user-right-content">
                    <div className="block">
                        <div className="title2">Profile</div>
                        <div className="lightcontent">Username</div>
                        <div>{currentUserName}</div>
                        <div>
                            <Button className="button" onClick={() => showModal('name')}>
                                Update name
                            </Button>
                        </div>
                    </div>
                    <div className="block">
                        <div className="title2">Sign-in details</div>
                        <div className="lightcontent">Email</div>

                        <div className="emailRow">
                            <span className="name">{currentEmail}</span>
                            <div className="verifiedGroup">
                                <span className="verified">Verified</span>
                                <span className="check">
                                    <CheckSmall theme="outline" size="20" fill="blue" />
                                </span>
                            </div>
                        </div>
                        <div>
                            <Button className="button" onClick={() => showModal('email')}>
                                Update email
                            </Button>
                        </div>

                        <hr className="customHr"></hr>

                        <div className="lightcontent">Password</div>
                        <div>
                            <Button className="button" onClick={() => showModal('password')}>
                                Update Password
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Accounts />
                    </div>
                    <div>
                        <DeleteAccount />
                    </div>
                </div>
            </div>
            <Modal
                title={modalType === 'name' ? 'Update Username' : modalType === 'email' ? 'Update Email Address' : 'Update Password'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
                okButtonProps={{ disabled: isConfirmDisabled() }}
                destroyOnClose={true} // 关闭时销毁弹窗内容，避免状态残留
            >
                {renderModalContent()}
            </Modal>
        </div>
    );
}
