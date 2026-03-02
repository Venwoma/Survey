import { useState } from 'react';

export function useAutoTranslate() {
    const [isTranslated, setIsTranslated] = useState(false);
    const [originalTexts, setOriginalTexts] = useState([]);

    const translatePage = async () => {
        if (!isTranslated) {
            // const container = document.getElementById('page-root');
            // if (!container) return;

            const textNodes = [];
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue.trim()) {
                    textNodes.push(node);
                }
            }

            const texts = textNodes.map((n) => n.nodeValue);
            setOriginalTexts(texts);

            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    texts,
                    target: 'zh-CN',
                }),
            });

            const data = await res.json();

            textNodes.forEach((node, index) => {
                node.nodeValue = data.translations[index];
            });

            setIsTranslated(true);
        } else {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

            let index = 0;
            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue.trim()) {
                    node.nodeValue = originalTexts[index];
                    index++;
                }
            }

            setIsTranslated(false);
        }
    };

    return { translatePage, isTranslated };
}
