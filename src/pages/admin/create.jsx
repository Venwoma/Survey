import '@/assets/css/admin/index.scss';
import CreateWrap from '../../compoments/admin/createWrap';
import EditPage from '../../compoments/admin/editPage';
import { useState } from 'react';
export default function AdminCreate() {
    const [showEditPage, setShowEditPage] = useState(false);
    // 点击生成时的提示词消息
    const [chatMessage, setChatMessage] = useState('');
    const handleGenerate = (message) => {
        console.log(message);
        setShowEditPage(true);
        setChatMessage(message); // 设置聊天消息
    };
    const handleBack = () => {
        setShowEditPage(false);
    };
    return (
        <div className="create-container">
            <CreateWrap onGenerate={handleGenerate}></CreateWrap>
            {showEditPage && <EditPage onBack={handleBack} chatMessage={chatMessage}></EditPage>}
        </div>
    );
}
