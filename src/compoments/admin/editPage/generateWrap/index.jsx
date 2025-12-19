import generateWrapCss from './index.module.scss';
export default function GenerateWrap({ onBack }) {
    const handleClickBack = () => {
        onBack();
    };
    return (
        <div className={generateWrapCss.generateWrapBox}>
            {/* 返回按钮 */}
            <div className={generateWrapCss.backButton} onClick={handleClickBack}>
                <div className={generateWrapCss.backIcon}></div>
                Back to Workplace
            </div>
            {/* 生成状态显示区域 */}
            <div className={generateWrapCss.generateStatus}>状态显示</div>
        </div>
    );
}
