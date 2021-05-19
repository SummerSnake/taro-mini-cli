import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import _store from '@/utils/dva';
import { apiUrlJson } from '@/src/config';
import { wxCheckForUpdate, wxCheckIsIphoneX } from '@/utils/wxApi';
import BasicLayout from './pages/basicLayout';
import './styles/iconfont.scss';

class App extends Component {
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

  config = {
    pages: ['pages/basicLayout/index', 'pages/webViewX/index'],
    // subpackages: [
    //   {
    //     root: 'webview',
    //     pages: ['index'],
    //   },
    // ],
    window: {
      navigationStyle: 'custom',
    },
    permission: {
      // 地图权限
      // 'scope.userLocation': {
      //   desc: '您的位置信息将用于小程序位置接口的效果展示',
      // },
    },
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={_store}>
        <BasicLayout />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
