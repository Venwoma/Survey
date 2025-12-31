import '../../assets/css/user-center/index.scss'
import { commonStore } from '../../store';
import Header from '../../compoments/admin/header'; 
import Leftmenu from '../../compoments/user-center/leftMenu';

export default function UserCenterIndex() {
    const messageApi = commonStore((state) => state.messageApi);

    return (
        <div className="user-center-container">
            <div className="user-content-wrapper">
                {/* 左侧菜单区 */}
                <div className="user-left-menu">
                    <Leftmenu />
                </div>

                {/* 右侧核心内容区 */}
                <div className="user-right-content">
                    <div className="content-card">
                        <h3>Personal Information</h3>
                        <p>用户名：test_user</p>
                        <p>邮箱：test@example.com</p>
                        <p>注册时间：2025-01-01</p>
                    </div>
                </div>
            </div>
        </div>
    );
}