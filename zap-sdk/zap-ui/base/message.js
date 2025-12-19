import { createNodeFixed } from '../create-dom';
export const messageList = [];
import { store } from '../store';

window.$wjMessage = messageList;
export const Message = (message, { className = '', type = 'dark', offset = 0, zIndex } = {}) => {
    const defineTop = 20;
    const lastMessage = messageList.slice(-1)?.[0];
    const top = lastMessage
        ? `${lastMessage?.offsetHeight + defineTop + Number(lastMessage.style.top.slice(0, -2))}px`
        : `${defineTop + offset}px`;
    const div = createNodeFixed(message, {
        classNames: [
            `${store.tagkey}-message`,
            `${store.tagkey}-message_backcolor_${type || 'dark'}`,
            className,
        ],
    });
    if (lastMessage) lastMessage.$nextMessage = div;
    // 设置层级高度
    if (zIndex) div.style.zIndex = 2000;
    // 设置关闭时间
    div.onanimationend = () => {
        const run = (currentNode, subTop) => {
            if (currentNode.$nextMessage) {
                const preTop = currentNode.$nextMessage.style.top;
                currentNode.$nextMessage.style.top = subTop || currentNode.style.top;
                run(currentNode.$nextMessage, preTop);
            }
        };
        run(div);
        const amiNode = messageList.findIndex((v) => v === div);
        ~amiNode && messageList.splice(amiNode, 1);
        div.$nextMessage = null;
        div.$close();
    };

    div.$append().$atFixed({ top });
    messageList.push(div);
};
