import { View, Image } from '@tarojs/components';
import NavBar from '@/components/NavBar';
import styles from './index.modules.scss';

function User() {
  // 导航栏参数
  const navBarJson = {
    background: 'transparent',
    color: '#000',
    title: '首页',
  };

  return (
    <View className={styles.userWrap}>
      <NavBar navBarJson={navBarJson} />

      <Image
        className={styles.imgDom}
        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=8229126,3022714603&fm=26&gp=0.jpg"
      />

      <View className={styles.conWrap}>
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

export default User;
