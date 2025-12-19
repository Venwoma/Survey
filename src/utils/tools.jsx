import { getType as type } from '@kyol/usejs';

export const getType = type;

export const deviceDetection = {
    // 检测是否为移动设备
    isMobile: () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|Windows Phone|opera mini/i.test(userAgent);
    },

    // 检测是否为触摸设备
    isTouchDevice: () => {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    },

    // 检测屏幕尺寸是否为移动端
    isMobileScreen: () => {
        return window.innerWidth <= 768;
    },

    // 检测是否为平板设备
    isTablet: () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /ipad|android(?!.*mobile)/i.test(userAgent) || (window.innerWidth >= 768 && window.innerWidth <= 1024);
    },

    // 获取设备类型
    getDeviceType: () => {
        if (deviceDetection.isMobile()) return 'mobile';
        if (deviceDetection.isTablet()) return 'tablet';
        return 'desktop';
    },

    // 检测屏幕方向
    getOrientation: () => {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    },

    // 获取屏幕尺寸信息
    getScreenInfo: () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1,
            orientation: deviceDetection.getOrientation(),
            deviceType: deviceDetection.getDeviceType(),
        };
    },
};
