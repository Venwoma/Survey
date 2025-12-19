// import {clsx} from clsx;
import { Button } from 'antd';
import header from './index.module.scss';
export default function Header({ title, buttonText }) {
    return (
        <div className={header.header}>
            <div className={header.title}>{title}</div>
            <Button className={header.button} type="primary">
                {buttonText}
            </Button>
        </div>
    );
}
