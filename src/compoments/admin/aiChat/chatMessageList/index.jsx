import messageListCss from './index.module.scss';

export default function ChatMessageList({ messageList, listRef }) {
    // 不同类型消息对应不同类名
    const messageTypeClassNameObj = {
        user: 'userMessage',
        ai: 'aiMessage',
        loading: 'loadMessage',
    };

    return (
        <div className={messageListCss.messageListBox} ref={listRef}>
            {messageList.map((message, idx) => (
                <div key={idx} className={`${messageListCss.messageWrap} ${messageListCss[messageTypeClassNameObj[message.messageType]]}`}>
                    {message.messageType === 'loading' ? (
                        <div className={messageListCss.message}>
                            {/* 加载动效 */}
                            <div className={messageListCss.loadingDots}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className={messageListCss.dot}></div>
                                ))}
                            </div>
                            {message.messageContent}
                        </div>
                    ) : (
                        <div className={messageListCss.message}>{message.messageContent}</div>
                    )}
                </div>
            ))}
        </div>
    );
}
