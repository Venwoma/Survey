import { commonStore } from '../../store';
import Leftmenu from '../../compoments/user-center/leftMenu';
import ProjectSet from '../../compoments/user-center/projectSetting';

export default function UserCenterPlanBilling() {
    const messageApi = commonStore((state) => state.messageApi);

    return (
        <div className="user-center-container">
            <div className="user-content-wrapper">
              
                <div className="user-left-menu">
                    <Leftmenu />
                </div>
                
                <div className="user-right-content">

                    <div className="card">

                        <ProjectSet />

                    </div>
                    
                   

                </div>
            </div>
        </div>
                 );
}
