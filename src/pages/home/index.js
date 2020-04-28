import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import getSystemInfo from '@/utils/getSystemInfo';
import NavBar from '@/components/NavBar';
import styles from './index.modules.scss';

function Home(props) {
  const { dispatch } = props;
  const [top, setTop] = useState(68); // 内容 marginTop === 导航栏高度
  // 导航栏参数
  const navBarJson = {
    background:
      'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588051783806&di=f90444f63d56f420558dc3a4715b8650&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2287735266%2C697970441%26fm%3D214%26gp%3D0.jpg)',
    color: '#fff',
    title: '首页',
  };

  useEffect(() => {
    dispatch &&
      dispatch({
        type: 'home/getInfo',
      });
  }, []);

  /**
   * @desc 获取导航栏高度，设置内容 marginTop
   */
  useEffect(() => {
    const globalSystemInfo = getSystemInfo();
    globalSystemInfo['navBarWrapHeight'] && setTop(globalSystemInfo['navBarWrapHeight']);
  }, []);

  return (
    <View className={styles.homeWrap}>
      <NavBar navBarJson={navBarJson} />

      <View className={styles.conWrap} style={{ top: `${top}px` }}>
        <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
        <View>内容</View>
        <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
        <View>内容</View>
        <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
        <View>内容</View>
        <Image src="http://att.3dmgame.com/att/forum/201302/21/105933sa5m6pea2o6msq3z.gif" />
      </View>
    </View>
  );
}

export default connect(({ home, loading }) => ({ ...home, ...loading }))(Home);
