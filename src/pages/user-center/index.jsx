import { commonStore } from '../../store';
// 导入头部组件
import Header from '../../compoments/admin/header'; 
// 导入左侧菜单组件
import Leftmenu from '../../compoments/user-center/leftMenu';


export default function UserCenterIndex() {
    
    const messageApi = commonStore((state) => state.messageApi);

    return (
        <div className="user-center-container">
            
            
            {/* 二、下方：左侧菜单（固定显示） + 右侧内容 布局容器 */}
            <div className="user-content-wrapper">
                {/* 2.1 左侧菜单区域（固定显示，无显隐控制） */}
                <div className="user-left-menu">
                    <Leftmenu /> {/* 渲染左侧菜单组件 */}
                </div>

                {/* 2.2 右侧显示区域（核心内容区） */}
                <div className="user-right-content">
                    {/* 自定义右侧内容：示例为用户信息，可替换为你的业务内容 */}
                    <div className="content-card">
                        <h3>Personal Information</h3>
                        <p>用户名：test_user</p>
                        <p>邮箱：test@example.com</p>
                        <p>注册时间：2025-01-01</p>
                    </div>

                    {/* 如需复用筛选/表格组件，可保留以下代码 */}
                    {/* 
                    <div className="index-filter">
                        {filterSelects.map((select) => (
                            <ZSelect value={select.value} options={select.options} width={select.width} showPreIcon={select.showIcon}></ZSelect>
                        ))}
                    </div>
                    <div className="index-table">
                        <ZTable></ZTable>
                    </div>
                    */}
                </div>
            </div>
        </div>
    );
}