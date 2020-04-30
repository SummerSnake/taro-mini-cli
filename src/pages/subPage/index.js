import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import getSystemInfo from '@/utils/getSystemInfo';
import NavBar from '@/components/NavBar';
import styles from './index.modules.scss';

function Subpage(props) {
  const { dispatch } = props;
  const [top, setTop] = useState(68); // 内容 marginTop === 导航栏高度
  // 导航栏参数
  const navBarJson = {
    background: '#ff00ff',
    color: '#fff',
    title: '首页',
  };

  /**
   * @desc 跳转 tabbar 页面
   * @param { string } tabbarIndex 跳转标识
   */
  const handleLinkTo = (tabbarIndex) => {
    dispatch &&
      dispatch({
        type: 'common/save',
        payload: {
          tabbarIndex,
        },
      });

    Taro.reLaunch({ url: '/pages/basicLayout/index' });
  };

  /**
   * @desc 获取导航栏高度，设置内容 Top
   */
  useEffect(() => {
    const globalSystemInfo = getSystemInfo();
    globalSystemInfo['navBarWrapHeight'] && setTop(globalSystemInfo['navBarWrapHeight']);
  }, []);

  return (
    <View className={styles.subPageWrap}>
      <NavBar navBarJson={navBarJson} />

      <View className={styles.conWrap} style={{ top: `${top}px` }}>
        <Button onClick={() => handleLinkTo(0)}>首页</Button>
        <Button onClick={() => handleLinkTo(1)}>我的</Button>
      </View>
    </View>
  );
}

export default connect(({ common, loading }) => ({ ...common, ...loading }))(Subpage);
