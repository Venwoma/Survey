import { Input } from 'antd';
import aiChatCss from './index.module.scss';
import { useState, useRef, useEffect } from 'react';
import ChatMessageList from './chatMessageList';
export default function AiChat({ chatMessage, onClose }) {
    const [inputValue, setInputValue] = useState('');
    //   聊天消息列表
    const [massageList, setMessageList] = useState([]);

    // 接收到默认消息
    useEffect(() => {
        console.log('get default message', chatMessage);
        // 发送用户消息
        handleClickSend(chatMessage);
    }, [chatMessage]);

    const listRef = useRef(null);

    //   消息框滚动到底部
    const scrollToBottom = () => {
        const el = listRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    };

    //   消息改变滚动到底部
    useEffect(() => {
        scrollToBottom();
    }, [massageList]);

    // 输入
    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    // 新增消息公共方法
    const addMessage = (type, content) => {
        const message = {
            messageType: type,
            messageContent: content,
        };
        setMessageList((prev) => [...prev, message]);
    };

    // 发送用户消息
    const handleClickSend = (userMessage) => {
        // 添加用户消息
        addMessage('user', userMessage);
        // 清空输入框
        setInputValue('');

        // 添加loading
        setTimeout(() => {
            addMessage('loading', 'Generating');
        }, 500);

        // 接口返回结果，移除loading，添加ai消息
        setTimeout(() => {
            // 移除loading
            setMessageList((prev) => prev.slice(0, -1));
            // 添加ai消息
            addMessage('ai', 'Oops! AI is a bit busy right now. Please try again in a moment.');
        }, 3000);
    };

    // 关闭窗口
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className={aiChatCss.aiChatCssBox}>
            <div className={aiChatCss.header}>
                AI Editor
                <div className={aiChatCss.closeIcon} onClick={handleClose}></div>
            </div>
            <div className={aiChatCss.messageList}>
                <ChatMessageList messageList={massageList} listRef={listRef}></ChatMessageList>
            </div>
            <div className={aiChatCss.inputWrap}>
                <Input.TextArea
                    placeholder="Describe the product you are looking for"
                    className={aiChatCss.createInput}
                    value={inputValue}
                    rows={2}
                    onChange={(e) => handleInput(e)}
                ></Input.TextArea>
                <div className={aiChatCss.sendButton} onClick={() => handleClickSend(inputValue)}></div>
            </div>
        </div>
    );
}
