import { useState, useEffect } from 'react';
import { View, Text, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import getSystemInfo from '@/utils/getSystemInfo';
import { isObj, verifyArr, formatNumberToRMB } from '@/utils/util';

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

  const cardList = [
    { id: 1, title: 'ECMAScript', num: 90, money: 10000, txt: '门前大桥下' },
    { id: 2, title: 'React', num: 80, money: 10000, txt: '门前大桥下' },
    { id: 3, title: 'Taro', num: 70, money: 10000, txt: '门前大桥下' },
    { id: 4, title: 'Webpack', num: 60, money: 10000, txt: '门前大桥下' },
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

      <wxs module="move" src="./components/Home/move.wxs"></wxs>

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
            indicator-active-color="#2083e4"
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

          {/* 列表 */}
          <View className="listWrap">
            {verifyArr(cardList) &&
              cardList.map((item) => (
                <View key={item.id} className="cardDom">
                  <View className="cardLeft">
                    <Image className="cardLogo" src="https://s1.ax1x.com/2020/08/31/dO5leU.jpg" />
                  </View>
                  <View className="cardRight">
                    <View className="cardTitle">
                      <Text>{item.title}</Text>
                      <Text
                        className="circleSign"
                        style={{
                          backgroundColor:
                            item.num >= 90
                              ? '#009A61'
                              : item.num >= 80 && item.num < 90
                              ? '#2083e4'
                              : item.num >= 70 && item.num < 80
                              ? '#fb7e48'
                              : '#e80e27',
                        }}
                      >
                        {item.num >= 90
                          ? '中'
                          : item.num >= 80 && item.num < 90
                          ? '国'
                          : item.num >= 70 && item.num < 80
                          ? '加'
                          : '油'}
                      </Text>
                    </View>
                    <View className="cardTxt ellipsis">文字：{item.txt}</View>
                    <View className="cardTxt">
                      文字：{item.txt}
                      <Text>文字：{item.txt}</Text>
                    </View>
                    <View className="cardTxt">文字：{item.txt}</View>
                    <View className="cardDate">
                      文字：{item.txt}
                      <Text>文字：{item.txt}</Text>
                    </View>
                    <View className="moneyDom">￥{formatNumberToRMB(item.money)}</View>
                  </View>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Home;
