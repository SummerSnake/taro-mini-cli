import Taro from '@tarojs/taro';
import { getSmsCodeApi, verifySmsCodeApi, getUserInfoApi } from '@/src/services';

export default {
  namespace: 'common',
  state: {
    tabbarIndex: 0, // tabbar index
    mobile: '', // 手机号
    verificationCode: '', // 验证码
  },

  effects: {
    /**
     * @desc 获取验证码
     */
    *getSmsCode(_, { call, select }) {
      const { mobile = '' } = yield select((state) => state.common);

      return yield call(getSmsCodeApi, { mobile });
    },

    /**
     * @desc 校验验证码
     */
    *verifySmsCode(_, { call, select }) {
      const { mobile = '', verificationCode = '' } = yield select((state) => state.common);

      return yield call(verifySmsCodeApi, { mobile, verificationCode });
    },

    /**
     * @desc 获取用户信息
     */
    *getUserInfo(_, { call }) {
      const res = yield call(getUserInfoApi);

      if (res && res['status'] === 1) {
        Taro.setStorageSync('userInfo', JSON.stringify(res.data));
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
