import { getInfoApi } from './service';

export default {
  namespace: 'home',
  state: {
    fetchData: {},
  },

  effects: {
    *getInfo(_, { call, put }) {
      const data = yield call(getInfoApi, {});
      if (data['status'] === 200) {
        yield put({
          type: 'save',
          payload: {
            fetchData: data.data,
          },
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
