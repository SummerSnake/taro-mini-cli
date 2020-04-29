import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Image, ScrollView } from '@tarojs/components';
import getSystemInfo from '@/utils/getSystemInfo';
import { isObj } from '@/utils/util';
import './index.scss';

function User() {
  const [navBarHeight, setHavBarHeight] = useState(68); // 导航栏高度
  const [paddingTop, setPaddingTop] = useState(20); // 导航栏标题上边距

  /**
   * @desc 获取导航栏高度、导航栏标题上边距
   */
  useEffect(() => {
    const globalSystemInfo = getSystemInfo();

    if (isObj(globalSystemInfo)) {
      setHavBarHeight(globalSystemInfo['navBarWrapHeight']);
      setPaddingTop(globalSystemInfo['statusBarHeight']);
    }
  }, []);

  return (
    <View className="userWrap">
      <View className="navBarWrap" style={{ height: `${navBarHeight}px` }}>
        <View className="navBarTitle" style={{ paddingTop: `${paddingTop}px` }}>
          我的
        </View>
      </View>

      <wxs module="move" src="./move.wxs"></wxs>

      <ScrollView
        scroll-y="true"
        scrollWithAnimation
        className="scrollDom"
        onScroll="{{move.handleScroll}}"
      >
        <Image
          className="imgDom"
          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=8229126,3022714603&fm=26&gp=0.jpg"
        />

        <View className="conWrap" onTouchMove="{{move.handleTouchMove}}">
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
