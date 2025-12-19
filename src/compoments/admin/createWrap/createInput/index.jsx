import { useState } from 'react';
import { Input, Button } from 'antd';
import createInputCss from './index.module.scss';
export default function CreateInput({ value, onChange, onGenerate }) {
    const handleInput = (e) => {
        onChange(e);
    };

    const handleClickGenerate = () => {
        onGenerate();
    };
    return (
        <div className={createInputCss.createInputBox}>
            <Input.TextArea
                placeholder="Describe the goal of your survey or the problem you want to solve"
                className={createInputCss.createInput}
                value={value}
                rows={6}
                onChange={(e) => handleInput(e)}
            />
            <Button className={createInputCss.createButton} type="primary" onClick={handleClickGenerate}>
                Generate
            </Button>
        </div>
    );
}
