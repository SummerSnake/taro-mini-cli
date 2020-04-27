import Taro, { useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import styles from './index.modules.scss';

const getSystemInfo = () => {
  // 校验是否存在系统信息，并校验是否ios
  if (Taro.globalSystemInfo && !Taro.globalSystemInfo.ios) {
    return Taro.globalSystemInfo;
  } else {
    // 获取系统信息
    let systemInfo = Taro.getSystemInfoSync();
    // 是否ios
    let ios = !!(systemInfo.system.toLowerCase().indexOf('ios') + 1);
    // 胶囊按钮
    let rect = null;
    try {
      rect = Taro.getMenuButtonBoundingClientRect ? Taro.getMenuButtonBoundingClientRect() : null;
      if (rect === null) {
        throw 'getMenuButtonBoundingClientRect error';
      }
      // 取值为0的情况  有可能width不为0 top为0的情况
      if (!rect.width || !rect.top || !rect.left || !rect.height) {
        throw 'getMenuButtonBoundingClientRect error';
      }
    } catch (error) {
      let gap = 0; // 胶囊按钮上下间距 使导航内容居中
      let width = 96; // 胶囊按钮的宽度
      if (systemInfo.platform === 'android') {
        gap = 8;
        width = 96;
      } else if (systemInfo.platform === 'devtools') {
        if (ios) {
          gap = 5.5; // 开发工具中ios手机
        } else {
          gap = 7.5; // 开发工具中android和其他手机
        }
      } else {
        gap = 4;
        width = 88;
      }
      // 开启wifi的情况下修复statusBarHeight值获取不到
      if (!systemInfo.statusBarHeight) {
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      }
      // 获取不到胶囊按钮信息则自定义
      rect = {
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width,
      };
    }
    // 导航栏高度
    let navBarHeight = 0;
    if (!systemInfo.statusBarHeight) {
      // 开启wifi和打电话下
      systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20;
      navBarHeight = (() => {
        let gap = rect.top - systemInfo.statusBarHeight;
        return 2 * gap + rect.height;
      })();

      systemInfo.statusBarHeight = 0;
      systemInfo.navBarExtendHeight = 0;
    } else {
      navBarHeight = (() => {
        let gap = rect.top - systemInfo.statusBarHeight;
        return systemInfo.statusBarHeight + 2 * gap + rect.height;
      })();
      // ios下方扩展4像素高度 防止下方边距太小
      systemInfo.navBarExtendHeight = !!ios ? 4 : 0;
    }

    systemInfo.navBarHeight = navBarHeight; // 导航栏高度不包括statusBarHeight
    // 右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87
    // 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
    systemInfo.capsulePosition = rect;
    systemInfo.ios = ios; // 是否ios
    Taro.globalSystemInfo = systemInfo; // 将信息保存到全局变量中

    return systemInfo;
  }
};

const NavBar = (props) => {
  const { navBarJson = {} } = props;

  const setStyle = (systemInfo) => {
    const {
      statusBarHeight,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      windowWidth,
    } = systemInfo;

    let rightDistance = windowWidth - capsulePosition.right; // 胶囊按钮右侧到屏幕右侧的边距
    let leftWidth = windowWidth - capsulePosition.left; // 胶囊按钮左侧到屏幕右侧的边距

    let navigationbarinnerStyle = {
      color: navBarJson['color'],
      backgroundColor: navBarJson['backgroundColor'],
      height: `${navBarHeight + navBarExtendHeight}px`,
      paddingTop: `${statusBarHeight}px`,
      paddingRight: `${leftWidth}px`,
      paddingBottom: `${navBarExtendHeight}px`,
    };

    return {
      navigationbarinnerStyle,
      navBarHeight,
      capsulePosition,
      navBarExtendHeight,
      ios,
      rightDistance,
    };
  };

  const [configStyle, setConfigStyle] = useState({});

  const { navigationbarinnerStyle = {}, ios, navBarHeight, navBarExtendHeight } = configStyle;
  // 挂载获取系统信息
  useEffect(() => {
    setConfigStyle(setStyle(getSystemInfo()));
  }, []);

  return (
    <View
      className={styles.navBar}
      style={{
        backgroundColor: navBarJson['backgroundColor'],
        height: `${navBarHeight + navBarExtendHeight}px`,
      }}
    >
      <View
        className={`${styles.navBarInner} ${ios ? styles.ios : styles.android}`}
        style={{ ...navigationbarinnerStyle }}
      />

      <View
        className={styles.navBarTitle}
        style={{ color: navBarJson['color'], paddingTop: navigationbarinnerStyle.paddingTop }}
      >
        {navBarJson && navBarJson['title']}
      </View>
    </View>
  );
};

NavBar.defaultProps = {
  navBarJson: {
    backgroundColor: '#000', //导航栏背景
    color: '#fff',
    title: '导航',
  },
};

export default NavBar;
