import Taro, { useState, useEffect } from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import getSystemInfo from '@/utils/getSystemInfo';
import { isObj, verifyArr } from '@/utils/util';

import './index.scss';

function Home() {
  const [navBarHeight, setHavBarHeight] = useState(68); // 导航栏高度
  const [paddingTop, setPaddingTop] = useState(20); // 导航栏标题上边距

  const bannerList = [
    { id: 1, imgUrl: 'https://s1.ax1x.com/2020/06/01/tGt4sO.jpg' },
    { id: 2, imgUrl: 'https://s1.ax1x.com/2020/06/01/tGt4sO.jpg' },
  ];

  const noticeList = [
    { id: 1, title: 'SummerSnake' },
    { id: 2, title: 'ECMAScript' },
  ];

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
    <View className="homeWrap">
      <View className="navBarWrap" style={{ height: `${navBarHeight}px` }}>
        <View className="navBarTitle" style={{ paddingTop: `${paddingTop}px` }}>
          SummerSnake
        </View>
      </View>

      <wxs module="move" src="./move.wxs"></wxs>

      <ScrollView
        scroll-y="true"
        scrollWithAnimation
        className="scrollDom"
        onScroll="{{move.handleScroll}}"
      >
        {/* banner */}
        <View>
          <Swiper
            circular
            autoplay
            indicator-dots
            indicator-active-color="#fd5f10"
            className="bannerWrap"
          >
            {verifyArr(bannerList) &&
              bannerList.map((item) => (
                <SwiperItem className="swiperItemDom" key={item.id}>
                  <Image className="swiperImg" src={item.imgUrl} />
                </SwiperItem>
              ))}
          </Swiper>
        </View>

        {/* 内容 */}
        <View className="conWrap" onTouchMove="{{move.handleTouchMove}}">
          {/* 公告 */}
          <View className="noticeWrap">
            <Text className="noticeTitle">公告</Text>

            <Swiper
              vertical
              circular
              autoplay
              interval={3000}
              indicator-dots={false}
              className="noticeSwiperWrap"
            >
              {verifyArr(noticeList) &&
                noticeList.map((item) => (
                  <SwiperItem className="swiperItemDom" key={item.id}>
                    {item.title}
                  </SwiperItem>
                ))}
            </Swiper>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
