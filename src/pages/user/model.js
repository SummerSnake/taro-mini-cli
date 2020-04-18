import { userApi } from './service';

export default {
  namespace: 'user',
  state: {},
  effects: {
    *load(_, { call }) {
      return yield call(userApi, {});
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
