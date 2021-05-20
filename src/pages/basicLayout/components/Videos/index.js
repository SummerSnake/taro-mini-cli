import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { View, Video, Image, ScrollView } from '@tarojs/components';
import { verifyArr } from '@/utils/util';
import getSystemInfo from '@/utils/getSystemInfo';
import NavBar from '@/components/NavBar';
import styles from './index.modules.scss';

class Videos extends Component {
  // 导航栏参数
  navBarJson = {
    background: 'linear-gradient(33deg, #77a1d3, #79cbca, #e684ae)', // 导航栏背景，可设为颜色或图片
    color: '#fff', // 导航栏标题颜色
    title: '视频', // 导航栏标题
  };
  videoUrl = 'https://www.runoob.com/try/demo_source/movie.mp4';
  imgUrl = 'https://s1.ax1x.com/2020/06/01/tGt4sO.jpg';

  constructor(props) {
    super(props);
    this.state = {
      top: 68,
      videosList: [
        { id: 1, isVideoPlay: 0, imgUrl: this.imgUrl, videoUrl: this.videoUrl },
        { id: 2, isVideoPlay: 0, imgUrl: this.imgUrl, videoUrl: this.videoUrl },
        { id: 3, isVideoPlay: 0, imgUrl: this.imgUrl, videoUrl: this.videoUrl },
      ],
    };
  }

  componentDidMount = () => {
    const globalSystemInfo = getSystemInfo();
    if (globalSystemInfo['navBarWrapHeight']) {
      this.setState({ top: globalSystemInfo['navBarWrapHeight'] });
    }
  };

  /**
   * @desc 点击播放视频
   * @param { number } index
   */
  handleVideoPlay = async (index) => {
    const { videosList = [] } = this.state;

    if (Array.isArray(videosList)) {
      const list = [...videosList];
      list.forEach((item) => (item.isVideoPlay = 0));
      list[index].isVideoPlay = 1;

      await this.setState({
        videosList: list,
      });

      const videoContext = Taro.createVideoContext(`video-${index}`, this);
      videoContext.play();
    }
  };

  render() {
    const { top = 0, videosList = [] } = this.state;

    return (
      <View className={styles.videosWrap}>
        <NavBar navBarJson={this.navBarJson} />

        <ScrollView
          className={styles.scrollDom}
          style={{ height: `calc(100vh - ${top}px)`, marginTop: `${top}px` }}
          scrollY
          scrollWithAnimation
          lowerThreshold="50"
          onScrollToLower={this.handleScroll}
        >
          <View className={styles.videosListWrap}>
            {verifyArr(videosList) &&
              videosList.map((item, index) => (
                <View key={item.id} className={styles.listItemWrap}>
                  <View className={styles.itemVideoWrap}>
                    <Video
                      id={`video-${index}`}
                      className={styles.videoDom}
                      style={{ display: !!item.isVideoPlay ? 'block' : 'none' }}
                      src={item.videoUrl}
                      show-center-play-btn
                      show-play-btn
                      controls
                      onPlay
                    />

                    <Image
                      className={styles.imgDom}
                      src={item.imgUrl}
                      style={{ display: !item.isVideoPlay ? 'block' : 'none' }}
                      onClick={() => this.handleVideoPlay(index)}
                    />
                  </View>
                  <View className={styles.itemTitle}>SummerSnake</View>
                  <View className={styles.itemDate}>2020.07.17</View>
                </View>
              ))}
          </View>

          <View className={styles.noCon}>已经全部加载完毕</View>
        </ScrollView>
      </View>
    );
  }
}

export default Videos;
