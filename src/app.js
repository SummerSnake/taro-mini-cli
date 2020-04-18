import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import _store from '@/utils/dva';
import BasicLayout from './pages/basicLayout';
import './styles/iconfont.scss';

class App extends Component {
  config = {
    pages: ['pages/basicLayout/index'],
    window: {
      navigationBarTitleText: 'taro 小程序',
      navigationBarTextStyle: 'white',
      navigationBarBackgroundColor: '#656b79',
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
