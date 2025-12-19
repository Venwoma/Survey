import { useState } from 'react';
import createCss from './index.module.scss';
import CreateInput from './createInput';
export default function CreateWrap({ onGenerate }) {
    const [inputValue, setInputValue] = useState('');
    //   当前选中的提示词
    const [activeSuggestion, setActiveSuggestion] = useState('');
    const suggestions = [
        {
            key: '0',
            label: `Want to know what is customer's target product`,
        },
        {
            key: '1',
            label: `Customers gave up cart/ stopped to check very often, want to know the reason.`,
        },
        {
            key: '2',
            label: `Why people did not purchase after looking through the product details page.`,
        },
    ];
    // 输入
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    // 点击生成按钮
    const handleGenerate = () => {
        onGenerate(inputValue);
    };
    // 点击推荐问题
    const handleClickSuggest = (suggestion) => {
        console.log('suggest=====', suggestion);
        setInputValue(suggestion.label);
        setActiveSuggestion(suggestion.key);
    };
    return (
        <div className={createCss.createBox}>
            <div className={createCss.title}>Create With AI</div>
            <div className={createCss.createInput}>
                <CreateInput value={inputValue} onChange={handleInputChange} onGenerate={handleGenerate}></CreateInput>
            </div>
            <div className={createCss.suggestionTips}>Suggestions For You</div>
            {suggestions.map((suggestion) => (
                <div
                    className={`${createCss.suggestion} ${activeSuggestion === suggestion.key ? createCss.suggestActive : ''}`}
                    onClick={() => handleClickSuggest(suggestion)}
                >
                    {suggestion.label}
                </div>
            ))}
        </div>
    );
}
