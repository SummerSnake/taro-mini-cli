import Taro from '@tarojs/taro';
import { Component } from 'react';
import { Provider } from 'react-redux';
import _store from '@/utils/dva';
import { devUrl, testUrl, uatUrl, proUrl } from '@/src/config';
import './styles/iconfont.scss';
import 'taro-ui/dist/style/index.scss';

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
        baseUrl = devUrl;
    }

    Taro.baseUrl = baseUrl;
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={_store}>{this.props.children}</Provider>;
  }
}

export default App;
