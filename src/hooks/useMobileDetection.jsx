import { useState, useEffect } from 'react';
import { deviceDetection } from '../utils/tools';

export const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [deviceType, setDeviceType] = useState('desktop');
    const [screenInfo, setScreenInfo] = useState({
        width: 0,
        height: 0,
        orientation: 'landscape',
    });

    useEffect(() => {
        const updateDeviceInfo = () => {
            setIsMobile(deviceDetection.isMobile());
            setIsTablet(deviceDetection.isTablet());
            setIsTouchDevice(deviceDetection.isTouchDevice());
            setDeviceType(deviceDetection.getDeviceType());
            setScreenInfo(deviceDetection.getScreenInfo());
        };

        // 初始检测
        updateDeviceInfo();

        // 监听窗口大小变化
        const handleResize = () => {
            updateDeviceInfo();
        };

        // 监听屏幕方向变化
        const handleOrientationChange = () => {
            setTimeout(updateDeviceInfo, 100); // 延迟确保方向变化完成
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);

    return {
        isMobile,
        isTablet,
        isTouchDevice,
        deviceType,
        screenInfo,
        isMobileOrTablet: isMobile || isTablet,
    };
};
