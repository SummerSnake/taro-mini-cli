import Taro, { useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import getSystemInfo from '@/utils/getSystemInfo';
import styles from './index.modules.scss';

function NavBar(props) {
  const { navBarJson = {} } = props; // 导航栏传参

  const setStyle = (systemInfo) => {
    const {
      navBarWrapHeight,
      statusBarHeight,
      navBarHeight,
      navBarExtendHeight,
      capsulePosition,
      windowWidth,
      ios,
    } = systemInfo;

    const rightDistance = windowWidth - capsulePosition.right; // 胶囊按钮右侧到屏幕右侧的边距
    const leftWidth = windowWidth - capsulePosition.left; // 胶囊按钮左侧到屏幕右侧的边距

    const navigationbarinnerStyle = {
      color: navBarJson['color'],
      backgroundColor: navBarJson['backgroundColor'],
      height: `${navBarHeight + navBarExtendHeight}px`,
      paddingTop: `${statusBarHeight}px`,
      paddingRight: `${leftWidth}px`,
      paddingBottom: `${navBarExtendHeight}px`,
    };

    return {
      navBarWrapHeight,
      navigationbarinnerStyle,
      navBarHeight,
      navBarExtendHeight,
      capsulePosition,
      rightDistance,
      ios,
    };
  };

  const [configStyle, setConfigStyle] = useState({});

  const { navigationbarinnerStyle = {}, navBarWrapHeight = 0, ios } = configStyle;
  // 挂载获取系统信息
  useEffect(() => {
    setConfigStyle(setStyle(getSystemInfo()));
  }, []);

  return (
    <View
      className={styles.navBarWrap}
      style={{
        background: navBarJson['background'],
        height: `${navBarWrapHeight}px`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <View
        className={`${styles.navBarInner} ${!!ios ? styles.ios : styles.android}`}
        style={{ ...navigationbarinnerStyle }}
      />

      {/* 仅显示标题 */}
      {navBarJson && navBarJson['title'] && (
        <View
          className={styles.navBarTitle}
          style={{ color: navBarJson['color'], paddingTop: navigationbarinnerStyle['paddingTop'] }}
        >
          {navBarJson['title']}
        </View>
      )}
    </View>
  );
}

NavBar.defaultProps = {
  navBarJson: {
    background: '#000', // 导航栏背景，可设为颜色或图片
    color: '#fff', // title 颜色
    title: '',
  },
};

export default NavBar;
