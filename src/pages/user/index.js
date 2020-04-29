import Taro, { useState } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import NavBar from '@/components/NavBar';
import styles from './index.modules.scss';

function User() {
  const [conOffsetTop, setConOffsetTop] = useState(244); // 内容区域 offsetTop
  // 导航栏参数
  const [navBarJson, setNavBarJson] = useState({
    background: 'transparent',
    color: '#000',
    title: '首页',
  });

  /**
   * @desc 获取内容区域 offsetTop
   * @param { object } e
   */
  const handleConTouchMove = (e) => {
    if (conOffsetTop === 0) {
      const { offsetTop = 0 } = e && e.currentTarget;
      setConOffsetTop(offsetTop);
    }
  };

  /**
   * @desc 监听 scrollView 滚动事件，改变导航条样式
   * @param { object } e
   */
  const handleScroll = (e) => {
    const { scrollTop = 0 } = e && e.currentTarget;
    // 下划至内容区域
    if (conOffsetTop > 0 && scrollTop >= conOffsetTop && navBarJson.color === '#000') {
      setNavBarJson({
        ...navBarJson,
        background: '#000',
        color: '#fff',
      });
    }
    // 上划至 banner 区域
    if (scrollTop <= conOffsetTop && navBarJson.color === '#fff') {
      setNavBarJson({
        ...navBarJson,
        background: 'transparent',
        color: '#000',
      });
    }
  };

  return (
    <View className={styles.userWrap}>
      <NavBar navBarJson={navBarJson} />

      <ScrollView
        scroll-y="true"
        scrollWithAnimation
        onScroll={handleScroll}
        className={styles.scrollDom}
      >
        <Image
          className={styles.imgDom}
          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=8229126,3022714603&fm=26&gp=0.jpg"
        />

        <View className={styles.conWrap} onTouchMove={handleConTouchMove}>
          <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
          <View>内容</View>
          <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
          <View>内容</View>
          <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
          <View>内容</View>
          <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
        </View>
      </ScrollView>
    </View>
  );
}

export default User;
