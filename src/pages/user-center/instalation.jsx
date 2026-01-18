import Leftmenu from '../../compoments/user-center/leftMenu';
import { commonStore } from '../../store';
import { useCallback, useState } from 'react';
import { Button } from 'antd';
import { Mail } from '@icon-park/react';
import clsx from 'clsx';
import React from 'react';

export default function UserCenterInstalation() {
    const messageApi = commonStore((state) => state.messageApi);
    const [activeFaqId, setActiveFaqId] = useState(null);
    const toggleFaq = (id) => {
        setActiveFaqId(activeFaqId === id ? null : id);
    };

    const copyCode = useCallback(() => {
        try {
            const codeElement = document.getElementById('codeContent');
            if (!codeElement) {
                messageApi?.error('未找到代码内容');
                return;
            }
            const codeContent = codeElement.textContent.trim();

            navigator.clipboard.writeText(codeContent);

            messageApi?.success('代码复制成功！');

            const btnElement = document.querySelector('.copy-btn');
            if (btnElement) {
                const originalText = btnElement.textContent;
                btnElement.textContent = 'Copied!';
                setTimeout(() => {
                    btnElement.textContent = originalText;
                }, 2000);
            }
        } catch (error) {
            messageApi?.error('复制失败，请手动复制');
            console.error('复制失败：', error);
        }
    }, [messageApi]);

    const codeContent1 = `<script type="text/javascript" src="https://static.insightto.ai/sdk/js/insigtto.min.js"></script>`;
    const codeContent2 = `<!-- index.html -->
</head>
    ....
    <script type="text/javascript" src="https://static.insightto.ai/sdk/js/insigtto.min.js"></script>
    ....
</head>
<body>
    ....
</body>
</html>`;

    const codeContent3 = `<!-- index.html --> 
    ...
<body>
    ...
</body>
<script type="text/javascript" src="https://static.insightto.ai/sdk/js/insigtto.min.js"></script>
</html>`;

    const highlightScriptLine = (codeText) => {
        return codeText.split('\n').map((line, idx) => {
            const escapedLine = line;

            const isScriptLine = line.trim().includes('<script') && line.trim().includes('</script>');
            return (
                <span
                    key={idx}
                    style={{
                        color: isScriptLine ? 'blue' : 'black',
                        display: 'block',
                    }}
                >
                    {escapedLine}
                </span>
            );
        });
    };

    const faqData = [
        {
            id: 'url-change',
            question: 'What happens if I change my website URL',
            answer: `If you change your website URL, you will need to update the website URL in your Project Setting to ensure accurate data collection.

Go to Project Settings → Replace the old URL with your new one.
If the URL is not updated, tracking may not function properly on the new site.`,
        },
        {
            id: 'performance',
            question: "Does the tracking code affect my website's performance?",
            answer: `Our tracking code is lightweight and loads asynchronously, which means it will not block or delay other elements of your website.

The script is optimized for minimal impact on page load time, and typically adds less than 50ms to overall loading performance under normal network conditions.`,
        },
        {
            id: 'installation-check',
            question: 'How do I know if my installation is working correctly?',
            answer: `After adding the tracking code, you can verify the installation in two ways:

Quick Verification: 
        Step1: Launch your website and interact with it by clicking and scrolling.
        Step2: Use the Verify Installation button to check the installation status.`,
        },
        {
            id: 'sdk-issue',
            question: 'My SDK is not working after installation. What should I do?',
            answer: `· Verify that you have correctly initialized the SDK with a valid API Key.
· Check your internet connection to ensure the SDK can communicate with the server.
· Confirm there are no firewall or proxy restrictions blocking API requests.
· (Optional) Use the Verify SDK Integration button on this page to test connectivity.`,
        },
        {
            id: 'sdk-update',
            question: 'How do I update to the latest SDK version?',
            answer: 'The SDK will update automatically, so no additional action is required from you. However, to ensure that you can access the latest features without being affected by browser caching, we recommend clearing your browser cache after the SDK has been updated.',
        },
    ];

    return (
        <div className="user-center-container">
            <div className="user-content-wrapper">
                <div className="user-left-menu">
                    <Leftmenu />
                </div>

                <div className="user-right-content">
                    <h1 className="title1">Installation</h1>
                    <div className="block">
                        <div className="content">
                            Integrating our application is straightforward. The clear, step‑by‑step instructions below are designed so that even non‑technical
                            users can complete the setup on their own. We are continuously working to provide more simple and flexible integration options, help
                            you get started with ease.
                        </div>
                        <h2 className="title2">Prerequisites</h2>
                        <div>
                            Before starting, ensure you have:
                            <ul>
                                <li>Access to your app's HTML source code</li>
                                <li>Administrative acess to your Insightto account and uploaded your website url</li>
                            </ul>
                        </div>
                    </div>

                    <h1 className="title1">Step-by-Step instructions</h1>
                    <div className="block">
                        <h2 className="title2">Step1: Paste this code snippet</h2>
                        <div class="code-block">
                            <pre>
                                <code id="codeContent">{codeContent1}</code>
                            </pre>
                            <button class="copy-btn" onClick={copyCode}>
                                Copy
                            </button>
                        </div>

                        <h2 className="title2">Step2: Open your HTML and Paste this code</h2>
                        <div className="content">
                            <p>
                                The tracking script is what lets Insightto track your visitors. Without it, surveys will not run on your website and the
                                analytics reports will be not generated.
                            </p>
                            <p>
                                Note: Installing the Insightto script is simple: copy and paste it into your web page(s) or header file. If your site uses a
                                shared header file, you only need to install it once. If each page has its own header code, repeat the installation on every
                                page.
                            </p>
                            <p>Open your page in a text editor in your HTML code, locate &lt;/head&gt;. Paste this snippet into the &lt;head&gt; tag</p>
                        </div>
                        <div className="code-block">
                            <pre>
                                <code>{highlightScriptLine(codeContent2)}</code>
                            </pre>
                        </div>

                        <div className="content">Or place it after the body tag, your page should look similar to this.</div>
                        <div className="code-block">
                            <pre>
                                <code>{highlightScriptLine(codeContent3)}</code>
                            </pre>
                        </div>

                        <h2 className="title2">Step3: Check Integration Status</h2>
                        <div className="content">
                            Save your changes. Congratulations, you have set up the script and are now ready to create surveys! Click the button and open your
                            website. We'll automatically verify if the tracking code has been successfully installed on your website.
                        </div>
                        <Button className="button">Verify integration</Button>
                    </div>

                    <h1 className="title1">Support & Resources</h1>
                    <div className="block">
                        <h2 className="title2">Frequently Asked Questions</h2>
                        <div className="faq-container">
                            {faqData.map((item) => {
                                const isActive = activeFaqId === item.id; // 判断当前问答是否展开
                                return (
                                    <div key={item.id} className="faq-item">
                                        {/* 问题按钮（带动态箭头） */}
                                        <button
                                            className={clsx(
                                                'faq-question',
                                                isActive && 'faq-question--active', // 展开时的活跃类
                                            )}
                                            onClick={() => toggleFaq(item.id)}
                                        >
                                            <span className="faq-question-text">{item.question}</span>
                                            {/* 箭头图标（通过clsx控制方向） */}
                                            <span className={clsx('faq-arrow', isActive && 'faq-arrow--expanded')}>▲</span>
                                        </button>
                                        {/* 答案区域（动态显示/隐藏） */}
                                        <div className={clsx('faq-answer', isActive && 'faq-answer--visible')}>
                                            {/* 处理答案中的换行 */}
                                            {item.answer.split('\n').map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="block">
                        <h2 className="title2">Contact Our Technical Team</h2>
                        <div className="content">Email Support</div>
                        <div className="mailbox">
                            <Mail theme="outline" size="30" fill="#3f13fe" className="icon" />
                            <div>
                                <h2>For technical inquiries and installation support</h2>
                                <div className="support">support@insightto.ai</div>
                            </div>
                        </div>
                        <div className="lightcontent">Average response time: 2-4 hours during business hours</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
