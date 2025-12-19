import { Select } from 'antd';
import select from './index.module.scss';
export default function ZSelect({ value, options, width, showPreIcon }) {
    const Option = Select.Option;
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <div className={select.selectBox}>
            <Select
                defaultValue={value}
                style={{ width: `${width}px` }}
                dropdownMatchSelectWidth={false} // 关闭下拉菜单与选择框同宽
                // dropdownStyle={{ minWidth: "auto" }} // 下拉菜单最小宽度自动
                onChange={handleChange}
                optionRender={(option) => (
                    <div className={select.optionBox} style={{ display: 'flex' }}>
                        {showPreIcon && (
                            <div
                                className={select.preIcon}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    background: '#000',
                                    'margin-right': '8px',
                                }}
                            ></div>
                        )}
                        {option.label}
                    </div>
                )}
            >
                {options.map((item) => (
                    <Option value={item.value} disabled={item.disabled}>
                        {item.label}
                    </Option>
                ))}
            </Select>
        </div>
    );
}
