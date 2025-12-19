import thirdButtonCss from './index.module.scss';
export default function ThirdButton({ text, width, onClick }) {
    const handleClick = () => {
        onClick();
    };
    return (
        <div className={thirdButtonCss.buttonContainer} style={{ width: `${width}px` }} onClick={handleClick}>
            <div className={thirdButtonCss.buttonIcon}></div>
            {text}
        </div>
    );
}
