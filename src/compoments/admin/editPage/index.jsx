import editPageCss from './index.module.scss';
import AiChat from '../aiChat';
import GenerateWrap from './generateWrap';
import { useState } from 'react';
export default function EditPage({ chatMessage, onBack }) {
    const [showAiChat, setShowAiChat] = useState(true);

    const handleBack = () => {
        onBack();
    };

    const handleCloseAi = () => {
        setShowAiChat(false);
    };

    return (
        <div className={editPageCss.editPageBox}>
            {/* 左侧项目编辑区域 */}
            <div className={editPageCss.editWrap}>
                <GenerateWrap onBack={handleBack}></GenerateWrap>
            </div>
            {/* 右侧ai聊天区域 - 隐藏而不是销毁 */}
            <div className={`${editPageCss.aiChatContainer} ${!showAiChat ? editPageCss.hidden : ''}`}>
                <AiChat chatMessage={chatMessage} onClose={handleCloseAi}></AiChat>
            </div>
        </div>
    );
}
