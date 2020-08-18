import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import _store from '@/utils/dva';
import { devUrl, testUrl, uatUrl, proUrl } from '@/src/config';
import BasicLayout from './pages/basicLayout';
import './styles/iconfont.scss';

class App extends Component {
  componentWillMount = () => {
    /**
     * @desc 不同环境接口配置
     */
    let baseUrl = '';
    switch (process.env.ENV) {
      case 'dev':
        baseUrl = devUrl;
        break;
      case 'test':
        baseUrl = testUrl;
        break;
      case 'uat':
        baseUrl = uatUrl;
        break;
      case 'prod':
        baseUrl = proUrl;
        break;
      default:
        baseUrl = proUrl;
    }

    Taro.baseUrl = baseUrl;
  };

  config = {
    pages: ['pages/basicLayout/index', 'pages/subPage/index'],
    subpackages: [
      {
        root: 'webview',
        pages: ['index'],
      },
    ],
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
