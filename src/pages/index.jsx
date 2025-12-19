import { useNavigate } from 'react-router-dom';
import '../assets/css/index.scss';
import { useEffect, useRef, useState } from 'react';
import { useMobileDetection } from '../hooks/useMobileDetection.jsx';
import { ClientOnly } from 'vite-react-ssg';
const saveCardList = [
    {
        title: 'End-to-End Encryption',
        desc: 'All data is encrypted in transit and at rest using industry-standard protocols.',
        img: 'fourth-3',
    },
    {
        title: 'GDPR & CCPA Compliant',
        desc: `We adhere to global privacy regulations to protect your users' data rights.`,
        img: 'fourth-1',
    },
    {
        title: 'Data Ownership',
        desc: 'You own 100% of your data. We never sell or share it with third parties.',
        img: 'fourth-2',
    },
];
export default function Index() {
    const navigate = useNavigate();
    const { isMobile } = useMobileDetection();
    const introList = [
        {
            desc: 'Turn every visitor journey into an opportunity for improvement.',
            img: 'first-1',
        },
        {
            desc: 'Smartly identify key conversion bottlenecks and user pain points. ',
            img: 'first-2',
        },
        {
            desc: 'Get precise recommendations to smooth out the path to purchase.',
            img: 'first-3',
        },
    ];
    const pointsList = [
        {
            title: 'AI-Powered Precision',
            desc: 'Say Goodbye to Guesswork with real-time analysis of user behavior patterns.',
            img: 'second-1',
        },
        {
            title: '30-Second Setup',
            desc: 'Create You First Survey in 30 Seconds with our intuitive drag-and-drop interface.',
            img: 'second-2',
        },
        {
            title: 'Data-Driven Decisions',
            desc: 'Make Decision with Real Data through our comprehensive analytics dashboard.',
            img: 'second-3',
        },
    ];

    const stepsList = [
        {
            title: 'Create Your Survey',
            desc: 'Quickly create micro pop-up surveys based on your business goals and research needs.',
            img: 'third-1',
            steps: ['Generate surveys in seconds', 'Questions aligned with your exact needs', 'Concise, impactful survey design'],
        },
        {
            title: 'Smart Trigger',
            desc: 'AI detects engagement patterns and triggers surveys,allowing you to capture the right feedback at the perfect moment.',
            img: 'third-2',
            steps: ['Behavior-based trigger', 'AI-powered timing design', 'Non-intrusive display'],
        },
        {
            title: 'Analyze & Act',
            desc: 'Powerful analytics connect survey data with visitor behavior,revealing deep insights into user journeys and real needs.',
            img: 'third-3',
            steps: ['Understand survey effectiveness with key metrics', 'Problem diagnosis and actionable insights', 'Uncover what user truly want'],
        },
    ];

    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false); // 头部吸顶状态
    const pageRef = useRef(null); // 页面滚动容器
    const [fixedCardIndex, setFixedCardIndex] = useState(-1); // 当前吸顶的卡片索引
    const [animationStart, setAnimationStart] = useState(false); // 动画开始
    // isFirstOffAnimate: false,
    const [isFirstOffAnimate, setIsFirstOffAnimate] = useState(false);
    //   isLastOffAnimate: false,
    const [isLastOffAnimate, setIsLastOffAnimate] = useState(false);
    const [showFixedButton, setShowFixedButton] = useState(true); // 固定按钮显示状态

    // 监听滚动事件
    const handleHeaderScroll = (event) => {
        const container = event?.target || pageRef?.current;

        if (!container) return;

        const scrollTop = container.scrollTop;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        setIsHeaderScrolled(scrollTop > 0);

        // 控制固定按钮显示：距离底部374px时隐藏
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
        setShowFixedButton(distanceFromBottom > 374);
        if (isMobile) return;

        const stepCardList = document.querySelectorAll('.step-card');
        const firstTop = stepCardList[0].getBoundingClientRect().top;
        const secondTop = stepCardList[1].getBoundingClientRect().top;
        const thirdTop = stepCardList[2].getBoundingClientRect().top;
        // 判断firstTop是否滚动到距离页面顶部30&的位置
        // 获取页面顶部30%位置 = window.innerHeight * 0.3;
        const fixedTop = window.innerHeight * 0.2;
        const secondFixedTop = fixedTop + 100;
        const thirdFixedTop = secondFixedTop + 200;

        // 超出滚动切换区域的情况
        if (firstTop > fixedTop || thirdTop <= fixedTop) {
            setFixedCardIndex(-1);
            setAnimationStart(false);
            return;
        }

        // 在滚动切换区域的情况

        if (firstTop <= fixedTop) {
            setFixedCardIndex(0);
            setAnimationStart(true);
        } else if (firstTop > fixedTop) {
            setFixedCardIndex(-1);
            setAnimationStart(false);
        }
        if (secondTop <= secondFixedTop) {
            setFixedCardIndex(1);
        }
        if (thirdTop <= thirdFixedTop && thirdTop > fixedTop) {
            setFixedCardIndex(2);
        } else if (thirdTop <= fixedTop) {
            setFixedCardIndex(-1);
            setAnimationStart(false);
        }
    };

    const handleMouseWheel = (evt) => {
        if (isMobile) return;
        setIsFirstOffAnimate(evt.wheelDelta < 0);
        setIsLastOffAnimate(evt.wheelDelta > 0);
    };

    useEffect(() => {
        // 设置页面 TDK
        document.title = 'AI-Powered Insights from User Behavior | Insightto';
        // 设置 meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
        }
        metaDescription.setAttribute(
            'content',
            'Stop guessing and start growing. Our platform uses AI to analyze user behavior on your site, identifies key moments, and collects critical feedback to help you make smarter business decisions.'
        );
        document.head.prepend(metaDescription);
        // 设置 meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
        }
        metaKeywords.setAttribute(
            'content',
            'AI survey, user feedback, customer insights, behavioral analytics, micro-surveys, in-app surveys, user experience, product management, product growth, user retention, customer engagement, automated surveys, real-time feedback, SaaS tools, product analytics, AI feedback'
        );
        document.head.prepend(metaKeywords);
        const title = document.head.querySelector('title');
        document.head.prepend(title);
        // 设置 canonical 链接
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', 'https://www.insightto.ai');
        const container = document.getElementById('root');
        if (!container) return;
        container.addEventListener('scroll', handleHeaderScroll, { passive: true });
        container.addEventListener('mousewheel', handleMouseWheel, { passive: true });
        // 初始化一次
        handleHeaderScroll();
        return () => {
            container.removeEventListener('scroll', handleHeaderScroll);
            container.removeEventListener('mousewheel', handleMouseWheel);
        };
    }, []);

    return (
        <div className={`index-page ${isMobile ? 'mobile-index-page' : ''}`} ref={pageRef}>
            {/* 吸顶头部 */}
            <div className={`index-fixed-header${isHeaderScrolled ? ' scrolled' : ''} ${isMobile ? 'mobile-index-fixed-header' : ''}`}>
                <img
                    className={`index-header-left ${isMobile ? 'mobile-index-header-left' : ''}`}
                    src={`${VITE_APP_CDN}/images/index/logo.png`}
                    alt="Zap CRM - Visitor Analytics Platform Logo"
                />
                <div className="index-header-right">
                    <a href="/login" className={`header-item ${isMobile ? 'mobile-header-item' : ''}`} rel="noreferrer">
                        Log in
                    </a>
                    <a className={`header-item header-item-primary ${isMobile ? 'mobile-header-item' : ''}`} href="/login/register" rel="noreferrer">
                        Sign up
                    </a>
                </div>
            </div>

            {/* 第一屏 */}
            <div className={`page-first ${isMobile ? 'mobile-page-first' : ''}`}>
                <h1 className={`index-title-h1 ${isMobile ? 'mobile-title-h1' : ''}`}>Understand Your Visitors.</h1>
                <h1 className={`index-title-h1 ${isMobile ? 'mobile-title-h1' : ''}`}>Optimize Their Journey.Boost Your Sales</h1>
                <div className={`page-first-intro ${isMobile ? 'mobile-page-first-intro' : ''}`}>
                    {introList.map((item, index) => (
                        <div key={index} className={`index-intro-item ${isMobile ? 'mobile-index-intro-item' : ''}`}>
                            {item.desc}
                            <img
                                className={`index-intro-icon ${isMobile ? 'mobile-index-intro-icon' : ''}`}
                                src={`${VITE_APP_CDN}/images/index/${item.img}.png`}
                                alt={`${item.desc} - Visitor Analytics Feature Icon`}
                            />
                        </div>
                    ))}
                </div>
                <ClientOnly>
                    {() => (
                        <video
                            className={`first-video ${isMobile ? 'mobile-first-video' : ''}`}
                            loop="loop"
                            playsInline
                            muted="muted"
                            autoPlay="autoplay"
                            src={`${VITE_APP_CDN}/images/index/first-video.webm`}
                        ></video>
                    )}
                </ClientOnly>
            </div>

            {/* 第二屏 */}
            <div className={`page-second ${isMobile ? 'mobile-second' : ''}`}>
                <div className={`second-inner ${isMobile ? 'mobile-second-inner' : ''}`}>
                    <h2 className={`index-title-h2 ${isMobile ? 'mobile-index-title-h2' : ''}`}>
                        Smartly identify key conversion bottlenecks and user pain points
                    </h2>
                    <h3 className={`index-title-h3 ${isMobile ? 'mobile-index-title-h3' : ''}`}>
                        Our AI-powered platform helps you understand your visitors like never before
                    </h3>
                    <div className={`points-warp ${isMobile ? 'mobile-points-warp' : ''}`}>
                        {pointsList.map((item, index) => (
                            <div key={index} className={`points-item ${isMobile ? 'mobile-points-item' : ''}`}>
                                <img
                                    className={`points-icon ${isMobile ? 'mobile-points-icon' : ''}`}
                                    src={`${VITE_APP_CDN}/images/index/${item.img}.png`}
                                    alt={`${item.title} - ${item.desc} Feature Icon`}
                                />
                                <span className={`points-title ${isMobile ? 'mobile-points-title' : ''}`}>{item.title}</span>
                                <span className={`points-desc ${isMobile ? 'mobile-points-desc' : ''}`}>{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* 第三屏 */}
            <div className={`page-third ${isMobile ? 'mobile-page-third' : ''}`}>
                {/* <img
                    className="title-image"
                    src={`${VITE_APP_CDN}/images/index/third-title.png`}
                    alt="Three Simple Steps to Transform Visitor Interactions - Survey Analytics Process"
                /> */}
                <div className={`third-title ${isMobile ? 'mobile-third-title' : ''}`}>How Insightto Works</div>
                <h3 className={`index-title-h3 ${isMobile ? 'mobile-index-title-h3' : ''}`}>
                    Three simple steps to transform visitor interactions into actionable insights
                </h3>
                <div className={`steps-warp ${isMobile ? 'mobile-steps-warp' : ''}`}>
                    {stepsList.map((item, index) => (
                        <div key={index} className={`step-card ${isMobile ? 'mobile-step-card' : ''}`}>
                            {fixedCardIndex === index && !isMobile && <div className="card-left-block"></div>}
                            <div
                                className={`card-left ${animationStart && !isMobile ? 'card-left-opacity' : ''} ${
                                    fixedCardIndex === index && !isMobile ? 'card-left-fixed' : ''
                                } ${isFirstOffAnimate && index === 0 && !isMobile ? 'animate-off' : ''} 
                                ${isLastOffAnimate && index === 2 && !isMobile ? 'animate-off' : ''} ${isMobile ? 'mobile-card-left' : ''}`}
                            >
                                <div className={`step-index ${isMobile ? 'mobile-step-index' : ''}`}>Step {index + 1}</div>
                                <span className={`step-title ${isMobile ? 'mobile-step-title' : ''}`}>{item.title}</span>
                                <span className={`step-desc ${isMobile ? 'mobile-step-desc' : ''}`}>{item.desc}</span>
                                {item.steps.map((step, stepIndex) => (
                                    <div key={stepIndex} className={`step-text ${isMobile ? 'mobile-step-text' : ''}`}>
                                        <img
                                            className={`step-icon ${isMobile ? 'mobile-step-icon' : ''}`}
                                            src={`${VITE_APP_CDN}/images/index/third-icon.png`}
                                            alt={`${step} - Survey Analytics Step Icon`}
                                        />
                                        {step}
                                    </div>
                                ))}
                            </div>
                            <img
                                className={`index-right-image ${isMobile ? 'mobile-index-right-image' : ''}`}
                                src={`${VITE_APP_CDN}/images/index/${isMobile ? `${item.img}-mobile` : item.img}.png`}
                                alt={`${item.title} - ${item.desc} Dashboard Screenshot`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* 第四屏 */}
            <div className={`page-fourth ${isMobile ? 'mobile-page-fourth' : ''}`}>
                <h2 className={`index-title-h2 ${isMobile ? 'mobile-index-title-h2' : ''}`}>Your Data,Your control</h2>
                <h3 className={`index-title-h3 ${isMobile ? 'mobile-index-title-h3' : ''}`}>
                    We take data security and privacy seriously.Our platform is built with enterprise-grade security measures to protect your information
                </h3>
                <div className={`save-card-warp ${isMobile ? 'mobile-save-card-warp' : ''}`}>
                    {saveCardList.map((item, index) => (
                        <div key={index} className={`save-card ${isMobile ? 'mobile-save-card' : ''}`}>
                            <img
                                className={`save-icon ${isMobile ? 'mobile-save-icon' : ''}`}
                                src={`${VITE_APP_CDN}/images/index/${item.img}.png`}
                                alt={`${item.title} - ${item.desc} Security Feature Icon`}
                            />
                            <span className={`save-title ${isMobile ? 'mobile-save-title' : ''}`}>{item.title}</span>
                            <span className={`save-desc ${isMobile ? 'mobile-save-desc' : ''}`}>{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* 页脚 */}
            <div className={`index-page-footer ${isMobile ? 'mobile-index-page-footer' : ''}`}>
                <span className={`index-footer-title ${isMobile ? 'mobile-index-footer-title' : ''}`}>Start Collecting Valuable Insights Today</span>
                <span className={`index-footer-desc ${isMobile ? 'mobile-index-footer-desc' : ''}`}>
                    Join thousands of businesses using Insightto to understand their visitors and drive growth.
                </span>
                <div className={`index-button-group ${isMobile ? 'mobile-index-button-group' : ''}`}>
                    <a className={`index-white-button ${isMobile ? 'mobile-index-white-button' : ''}`} href="/login/register">
                        Start Free Trial
                    </a>
                    {/* 需跳转新页面，未开发先隐藏 */}
                    {/* <div className="black-button">Schedule Demo</div> */}
                </div>
                <div className={`footer-index-button-group ${isMobile ? 'mobile-footer-index-button-group' : ''}`}>
                    <a href="/legal/privacy" className={`index-text-button ${isMobile ? 'mobile-index-text-button' : ''}`}>
                        Privacy Policy
                    </a>
                    <a href="/legal/terms" className={`index-text-button ${isMobile ? 'mobile-index-text-button' : ''}`}>
                        Terms of Service
                    </a>
                    {/* 需跳转新页面，未开发先隐藏 */}
                    {/* <span className="index-text-button">Contact us</span> */}
                </div>
            </div>

            {/* fixed按钮 */}
            {showFixedButton && (
                <a className={`index-fixed-button ${isMobile ? 'mobile-index-fixed-button' : ''}`} href="/login/register">
                    Get Started
                </a>
            )}
        </div>
    );
}
