// import {clsx} from clsx;
import { Button } from 'antd';
import header from './index.module.scss';
import { useNavigate } from 'react-router-dom';
export default function Header({ title, buttonText }) {
    const navigate = useNavigate();

    return (
        <div className={header.header}>
            <div className={header.title}>{title}</div>
            <Button className={header.button} type="primary" onClick={() => navigate('./create')}>
                {buttonText}
            </Button>
        </div>
    );
}
