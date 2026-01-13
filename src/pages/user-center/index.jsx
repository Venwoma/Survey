import '../../assets/css/user-center/index.scss'
import { commonStore } from '../../store';
import Header from '../../compoments/admin/header'; 
import Leftmenu from '../../compoments/user-center/leftMenu';
import ProFile from '../../compoments/user-center/proFile';
import SignIn from '../../compoments/user-center/sign-in'
import Accounts from '../../compoments/user-center/accounts';
import DeleteAccount from '../../compoments/user-center/delete';

export default function UserCenterIndex() {
    const messageApi = commonStore((state) => state.messageApi);
    
     const socialAccounts = [
            {
                name: "Google Account",
                desc: "zhiqianj68@gmail.com",
                iconColor: "#4285F4", // Google品牌色
                btnText: "Disconnect"
            },
            {
                name: "Microsoft Account",
                desc: "Connect to sign in with Microsoft",
                iconColor: "#00A4EF", // Microsoft品牌色
                btnText: "Connect"
            },
            {
                name: "Facebook",
                desc: "Connect to sign in with Facebook",
                iconColor: "#4a90e2", // Facebook品牌色
                btnText: "Connect"
            },
            {
                name: "X",
                desc: "Connect to sign in with X",
                iconColor: "#1DA1F2", // X(Twitter)品牌色
                btnText: "Connect"
            },
            {
                name: "LinkedIn",
                desc: "Connect to sign in with LinkedIn",
                iconColor: "#0077B5", // LinkedIn品牌色
                btnText: "Connect"
            }
        ];
    
    return (
        <div className="user-center-container">
            <div className="user-content-wrapper">
                {/* 左侧菜单区 */}
                <div className="user-left-menu">
                    <Leftmenu />
                </div>

                {/* 右侧核心内容区 */}
                <div className="user-right-content">
                    <div>
                        <ProFile />
                    </div>
                    <div>
                        <SignIn />
                    </div>
                    <div>
                        <Accounts />
                    </div>
                    <div>
                        <DeleteAccount />
                    </div>

                    

                    
                </div>
            </div>
        </div>
    );
}