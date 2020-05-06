export default {
  namespace: 'common',
  state: {
    tabbarIndex: 0, // tabbar index
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
