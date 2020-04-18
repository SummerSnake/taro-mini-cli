export default {
  namespace: 'common',
  state: {
    statusBarHeight: 0, // 状态栏高度
    tabbarIndex: 0, // tabbar index
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
