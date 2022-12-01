import Taro from '@tarojs/taro';
import React, { useReducer, useEffect } from 'react';
import { state as initState, reducer, GlobalContext } from './store';
import { apiUrlJson } from '@/src/config';
import { wxCheckForUpdate, wxCheckIsIphoneX } from '@/utils/wxApi';

import 'taro-ui/dist/style/index.scss';
import './styles/iconfont.scss';

function App(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  // 不同环境接口配置
  Taro.baseUrl = apiUrlJson[process.env.ENV];

  useEffect(() => {
    // 校验版本更新
    wxCheckForUpdate();

    // 校验是否是 iphoneX 及以上机型
    wxCheckIsIphoneX();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>{props?.children}</GlobalContext.Provider>
  );
}

export default App;
