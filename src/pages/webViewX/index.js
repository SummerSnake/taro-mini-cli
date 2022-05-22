import { getCurrentInstance } from '@tarojs/taro';
import { View, WebView } from '@tarojs/components';

function WebviewX() {
  const {
    router: { params = {} },
  } = getCurrentInstance() && getCurrentInstance();

  return (
    <View>
      <WebView src={decodeURIComponent(params.url)} />
    </View>
  );
}

export default WebviewX;
