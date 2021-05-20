import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';

import eyeOpen from '@/src/assets/images/eye_open.png';
import eyeClose from '@/src/assets/images/eye_close.png';
import arrowRight from '@/src/assets/images/arrow_right.png';
import userIcon_01 from '@/src/assets/images/userIcon_01.png';
import userIcon_02 from '@/src/assets/images/userIcon_02.png';

import './index.scss';

function User(props) {
  const [isEyeOpen, setIsEyeOpen] = useState(false); // 眼睛睁开关闭

  return (
    <View className="userWrap">
      <ScrollView scroll-y="true" scrollWithAnimation className="scrollDom">
        <View className="conWrap">
          {/* banner */}
          <View className="userBanner">
            <View className="avatarWrap">
              <View className="avatarImgWrap">
                <Image className="avatarImgDom" src="https://s1.ax1x.com/2020/08/31/dO5leU.jpg" />
              </View>
              <Text className="avatarTxt">SummerSnake</Text>
            </View>

            <View className="userCard">
              <View className="userTitleWrap" onClick={() => setIsEyeOpen(!isEyeOpen)}>
                <Text className="userCardTitle">GitHub</Text>
                <View className="eyeImgWrap">
                  <Image
                    className="eyeImg"
                    src={eyeOpen}
                    style={{ display: !!isEyeOpen ? 'block' : 'none' }}
                  />
                  <Image
                    className="eyeImg"
                    src={eyeClose}
                    style={{ display: !isEyeOpen ? 'block' : 'none' }}
                  />
                </View>
              </View>

              <View className="userCardEye">{!!isEyeOpen ? 'SummerSnake' : '****'}</View>

              <View className="userCardList">
                <View className="cardListItem">
                  <View className="itemTitle">JavaScript</View>
                  <View className="itemNum">0000</View>
                </View>
                <View className="cardListItem">
                  <View className="itemTitle">CSS</View>
                  <View className="itemNum">0000</View>
                </View>
                <View className="cardListItem">
                  <View className="itemTitle">Algorithm</View>
                  <View className="itemNum">0000</View>
                </View>
              </View>
            </View>
          </View>

          <View className="userLinkList">
            <View className="linkListItemWrap">
              <View className="linkListItemDom">
                <Image
                  className="itemIcon"
                  style={{ width: Taro.pxTransform(28), height: Taro.pxTransform(26) }}
                  src={userIcon_01}
                />
                <Text className="itemTitle">分享好友</Text>
                <Image className="itemIcon" src={arrowRight} />
              </View>
            </View>

            <View className="linkListItemWrap">
              <View className="linkListItemDom" style={{ border: 'none' }}>
                <Image
                  className="itemIcon"
                  style={{ width: Taro.pxTransform(30), height: Taro.pxTransform(28) }}
                  src={userIcon_02}
                />
                <Text className="itemTitle">联系客服</Text>
                <Image className="itemIcon" src={arrowRight} />
              </View>
            </View>

            <View className="linkListItemWrap">
              <View
                className="linkListItemDom"
                style={{ border: 'none', textAlign: 'center', color: '#fd5f10', padding: 0 }}
              >
                退出登录
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default User;
