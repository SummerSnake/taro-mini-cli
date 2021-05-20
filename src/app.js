import Taro from '@tarojs/taro';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import _store from '@/utils/dva';
import { apiUrlJson } from '@/src/config';
import { wxCheckForUpdate, wxCheckIsIphoneX } from '@/utils/wxApi';
import './styles/iconfont.scss';
import 'taro-ui/dist/style/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount = () => {
    // 不同环境接口配置
    Taro.baseUrl = apiUrlJson[process.env.ENV];
  };

  componentDidMount = () => {
    // 校验版本更新
    wxCheckForUpdate();

    // 校验是否是 iphoneX 及以上机型
    wxCheckIsIphoneX();
  };

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={_store}>{this.props.children}</Provider>;
  }
}

export default App;
