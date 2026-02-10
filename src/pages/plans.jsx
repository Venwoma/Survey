import '../assets/css/plans/index.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { Mail } from '@icon-park/react';

export default function Plans() {
    const navigate = useNavigate();

    const faqData = [
        {
            question: "What is a 'survey display' and how is it counted?",
            answer: 'A survey display is counted each time Insightto attempts to show a survey to a qualified visitor on your storefront. We only count a display if the visitor meets your specific targeting rules (e.g., spending 15 seconds on the page and showing exit intent). This unit is the basis for our plan limits.',
        },
        {
            question: "How is 'Active survey' counted?",
            answer: "An Active Survey Slot counts any survey that is currently set to 'Published' or 'Running' and has been successfully deployed to your live online store.",
        },
        {
            question: "What happens when I exceed my 'survey displays per month' limit?",
            answer: 'Once your plan reaches its limit for survey displays, Insightto will stop deploying new surveys on your store for the remainder of the billing cycle. Your existing data and reports will remain accessible.',
        },
    ];
    return (
        <div className="plans-container">
            <div className="plans-menu">
                <div className="back" onClick={() => navigate('/user-center/plan-billing')}>
                    <span className="backIcon"> ← </span>
                    <span className="backTex">Back to Plan & Billing</span>
                </div>
            </div>
            <div className="content">
                <div className="plan-upgrade-header">
                    <h1>Upgrade your plan</h1>
                    <p>Select the plan that matches your business needs.</p>
                </div>
                <div className="plan-cards">
                    {/* Free Plan Card */}
                    <div className="plan-card free">
                        <div className="plan-header">
                            <h2>Free</h2>
                            <span className="plan-tag">Recommended for 500–1k mau</span>
                        </div>
                        <div className="plan-price">
                            <span className="price">$0</span>
                            <span className="price-note">No limits</span>
                        </div>
                        <p className="plan-desc">Perfect for small projects and testing</p>
                        <ul className="plan-features">
                            <li>✅ 50 survey displays</li>
                            <li>✅ 10 active survey slots</li>
                            <li>✅ 1 user seat included</li>
                            <li>✅ 1 domain site</li>
                            <li>✅ Basic data reports</li>
                        </ul>
                        <Button className="bt current" disabled>
                            Current Plan
                        </Button>
                    </div>

                    {/* Premium Plan Card */}
                    <div className="plan-card premium">
                        <div className="pro-badge">PRO</div>
                        <div className="plan-header">
                            <h2>Premium</h2>
                            <span className="plan-tag">Recommended for up to 10k mau</span>
                        </div>
                        <div className="plan-price">
                            <span className="price">$99</span>
                            <span className="price-period">/month</span>
                        </div>
                        <p className="plan-desc">For growing businesses with advanced needs</p>
                        <ul className="plan-features">
                            <li>✅ 200 survey displays per month</li>
                            <li>✅ 30 active survey slots</li>
                            <li>✅ 1 user seat included</li>
                            <li>✅ 1 domain site</li>
                            <li>✅ Raw customer response data</li>
                            <li>✅ AI-powered intelligent reports</li>
                            <li>✅ Priority email support</li>
                        </ul>
                        <Button
                            className="bt start"
                            onClick={() => {
                                window.location.href =
                                    'https://checkout.stripe.com/c/pay/cs_test_a1qOsq7m6TS9dDxrKJcFxaXOSj0jzv5CZFWA3ZqIi3mvsNX5rRDYfgjYv3#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdkdWxOYHwnPyd1blpxYHZxWjA0Vl91QX0zVTBfdjVuQmJhcEZ8ZmlAPFZzdXJ2QH8wPTx2cGRwYmE0MmtvUk90SkJoSG5gbFRQZDxzYzVSMkFja0JsPFdRMDF9STc3Tz03QkA0bE18VXV3NTVyfFVRX3FrQCcpJ2N3amhWYHdzYHcnP3F3cGApJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MnKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSdga2RnaWBVaWRmYG1qaWFgd3YnP3F3cGB4JSUl';
                            }}
                        >
                            Start 14-days free trial
                        </Button>
                    </div>
                </div>

                <div className="faq-container">
                    <h2>Frequently asked questions</h2>
                    <div className="faq-list">
                        {faqData.map((item, index) => (
                            <div key={index} className="faq-item">
                                <h3 className="faq-question">{item.question}</h3>
                                <p className="faq-answer">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="faq-container">
                    <h2>Need a hand</h2>
                    <h3>Email Support</h3>
                    <div className="mailbox">
                        <Mail theme="outline" size="30" fill="#3f13fe" className="icon" />
                        <div>
                            <h2>For technical inquiries and installation support</h2>
                            <div className="support">support@insightto.ai</div>
                            <div className="lightcontent">Average response time: 2-4 hours during business hours</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
