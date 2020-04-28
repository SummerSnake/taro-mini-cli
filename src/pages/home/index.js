import Taro, { useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import NavBar from '@/components/NavBar';
import styles from './index.modules.scss';

function Home(props) {
  const { dispatch } = props;
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

  return (
    <View className={styles.homeWrap}>
      <NavBar navBarJson={navBarJson} />
    </View>
  );
}

export default connect(({ home, loading }) => ({ ...home, ...loading }))(Home);
