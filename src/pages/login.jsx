import { Outlet } from 'react-router-dom';
import '../assets/css/login/index.scss';
export default function Login() {
    return (
        <div className="login-container">
            <div className="login-left">
                <Outlet />
            </div>
            <div className="login-right"></div>
        </div>
    );
}
