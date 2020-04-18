import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { verifyArr } from '@/utils/util';

import Home from '@/src/pages/home';
import User from '@/src/pages/user';

import tabbar_icon01 from '@/src/assets/tabbars/tabbar_icon01.png';
import tabbar_icon01_active from '@/src/assets/tabbars/tabbar_icon01_active.png';
import tabbar_icon02 from '@/src/assets/tabbars/tabbar_icon02.png';
import tabbar_icon02_active from '@/src/assets/tabbars/tabbar_icon02_active.png';

import styles from './index.modules.scss';

function BasicLayout(props) {
  const { dispatch, tabbarIndex = 0 } = props;
  const tabbarList = [
    { id: 1, icon: tabbar_icon01, selectIcon: tabbar_icon01_active, title: '首页' },
    { id: 2, icon: tabbar_icon02, selectIcon: tabbar_icon02_active, title: '我的' },
  ];

  /**
   * @desc tabbar 点击事件
   * @param { number } index
   */
  const handleTabbarClick = index => {
    dispatch &&
      dispatch({
        type: 'common/save',
        payload: {
          tabbarIndex: index,
        },
      });
  };

  return (
    <View className={styles.basicLayoutWrap}>
      <View className={styles.contentWrap}>
        {
          {
            0: <Home />,
            1: <User />,
          }[tabbarIndex]
        }
      </View>

      <View className={styles.tabbarWrap}>
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
                style={{ color: tabbarIndex === index ? '#f00' : '#000' }}
              >
                {item.title}
              </View>
            </View>
          ))}
      </View>
    </View>
  );
}

export default connect(({ common, loading }) => ({ ...common, ...loading }))(BasicLayout);
