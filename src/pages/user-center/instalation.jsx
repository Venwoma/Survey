import Leftmenu from '../../compoments/user-center/leftMenu';
import { commonStore } from '../../store';

export default function UserCenterInstalation() {
    const messageApi = commonStore((state) => state.messageApi);

    return (
        <div className="user-center-container">
            <div className="user-content-wrapper">
                <div className="user-left-menu">
                    <Leftmenu />
                </div>

                <div className="user-right-content">
                    <h1 className="title1">Installation</h1>
                    <div className="block">
                        <div className="content">
                            Integrating our application is straightforward. The clear, step‑by‑step instructions below are designed so that even non‑technical
                            users can complete the setup on their own. We are continuously working to provide more simple and flexible integration options, help
                            you get started with ease.
                        </div>
                        <h2 className="title2">Prerequisites</h2>
                        <div className="content">
                            Before starting, ensure you have:
                            <ul>
                                <li>Access to your app's HTML source code</li>
                                <li>Administrative acess to your Insightto account and uploaded your website url</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
