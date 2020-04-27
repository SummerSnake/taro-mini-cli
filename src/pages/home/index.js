import Taro, { useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import NavBar from '@/components/NavBar';
import styles from './index.modules.scss';

function Home(props) {
  const { dispatch } = props;
  // 导航栏参数
  const navBarJson = {
    backgroundColor: '#000',
    color: '#fff',
    title: '首页',
  };

  useEffect(() => {
    dispatch &&
      dispatch({
        type: 'home/getInfo',
      });
  }, []);

  return (
    <View className={styles.homeWrap}>
      <NavBar navBarJson={navBarJson} />
    </View>
  );
}

export default connect(({ home, loading }) => ({ ...home, ...loading }))(Home);
