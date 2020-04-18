import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import { postRequest } from '@/utils/api';
import { connect } from '@tarojs/redux';

function Authorize(props) {
  const { dispatch, isModalShow = false, callback = () => {} } = props;

  /**
   * @desc 关闭 Modal
   */
  const handleModalHide = () => callback(false);

  /**
   * @desc 授权
   * @param { object } userRes
   * @param { object } loginRes
   * @return { string }
   */
  const authorize = async (userRes, loginRes) => {
    const rawData = JSON.parse(userRes.rawData);
    const data = await postRequest('/wx/wxAuthorize', {
      code: loginRes.code,
      nickName: rawData.nickName,
      avatarUrl: rawData.avatarUrl,
      gender: rawData.gender,
    });

    if (data.status === 200) {
      dispatch &&
        dispatch({
          type: 'common/save',
          payload: {
            accessToken: data.data.miniOpenId,
            userInfo: data.data,
          },
        });
      return 'success';
    } else {
      return 'fail';
    }
  };

  /**
   * @desc 授权认证
   */
  const applyAuthorize = () => {
    // 获取用户信息
    Taro.getUserInfo({
      success: async res => Taro.setStorageSync('userInfo', res.userInfo),
    }).then(userRes => {
      // 授权
      Taro.login({
        success: async loginRes => {
          if (loginRes.code) {
            const authRes = await authorize(userRes, loginRes);
            if (authRes === 'success') {
              Taro.showToast({ title: '授权成功', icon: 'none', duration: 2000 });
              setTimeout(() => {
                Taro.hideToast();
              }, 2000);
            } else if (authRes === 'fail') {
              Taro.showToast({ title: '授权失败', icon: 'none', duration: 2000 });
              setTimeout(() => {
                Taro.hideToast();
              }, 2000);
            }
            handleModalHide();
          } else {
            console.log('登录失败！' + loginRes.errMsg);
          }
        },
      });
    });
  };

  return (
    <View className="checkboxListWrap">
      <AtModal isOpened={isModalShow} closeOnClickOverlay={false}>
        <AtModalHeader>欢迎来到小程序</AtModalHeader>
        <AtModalContent>请授权登录，获得完整体验</AtModalContent>
        <AtModalAction>
          <Button onClick={handleModalHide}>取消</Button>
          <Button openType="getUserInfo" onClick={applyAuthorize}>
            授权登录
          </Button>
        </AtModalAction>
      </AtModal>
    </View>
  );
}

export default connect(({ common, loading }) => ({ ...common, ...loading }))(Authorize);
