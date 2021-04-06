import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from 'react-redux';
import { verifyArr } from '@/utils/util';

import tabbar_icon01 from '@/src/assets/tabbars/tabbar_icon01.png';
import tabbar_icon01_active from '@/src/assets/tabbars/tabbar_icon01_active.png';
import tabbar_icon02 from '@/src/assets/tabbars/tabbar_icon02.png';
import tabbar_icon02_active from '@/src/assets/tabbars/tabbar_icon02_active.png';
import tabbar_icon03 from '@/src/assets/tabbars/tabbar_icon03.png';
import tabbar_icon03_active from '@/src/assets/tabbars/tabbar_icon03_active.png';

import Home from './components/Home';
import Videos from './components/Videos';
import User from './components/User';

import styles from './index.modules.scss';

function BasicLayout(props) {
  const { dispatch, tabbarIndex = 0 } = props;
  const isIPhoneX = Taro.getStorageSync('isIPhoneX') === 'true';
  const tabbarList = [
    { id: 1, icon: tabbar_icon01, selectIcon: tabbar_icon01_active, title: '首页' },
    { id: 2, icon: tabbar_icon02, selectIcon: tabbar_icon02_active, title: '视频' },
    { id: 3, icon: tabbar_icon03, selectIcon: tabbar_icon03_active, title: '我的' },
  ];

  /**
   * @desc tabbar 点击事件
   * @param { number } index
   */
  const handleTabbarClick = (index) => {
    dispatch({
      type: 'common/save',
      payload: {
        tabbarIndex: index,
      },
    });
  };

  return (
    <View className={styles.basicLayoutWrap}>
      <View
        className={styles.contentWrap}
        style={{
          height: !!isIPhoneX ? `calc(100% - 85px)` : `calc(100% - 54px)`,
        }}
      >
        {
          {
            0: <Home />,
            1: <Videos />,
            2: <User />,
          }[tabbarIndex]
        }
      </View>

      <View
        className={styles.tabbarWrap}
        style={{
          paddingTop: !!isIPhoneX ? Taro.pxTransform(24) : Taro.pxTransform(8),
          paddingBottom: !!isIPhoneX ? Taro.pxTransform(66) : Taro.pxTransform(20),
        }}
      >
        {verifyArr(tabbarList) &&
          tabbarList.map((item, index) => (
            <View
              key={item.id}
              className={styles.tabbarItem}
              onClick={() => handleTabbarClick(index)}
            >
              <Image
                className={styles.tabbarIcon}
                src={tabbarIndex === index ? item.selectIcon : item.icon}
              />
              <View
                className={styles.tabbarTitle}
                style={{ color: tabbarIndex === index ? '#1377ff' : '#333' }}
              >
                {item.title}
              </View>
            </View>
          ))}
      </View>
    </View>
  );
}

export default connect(({ common }) => ({ ...common }))(BasicLayout);
