import { View, WebView } from '@tarojs/components';

function WebviewX() {
  const { params = {} } = this.$router && this.$router;
  return (
    <View>
      <WebView src={params.url} />
    </View>
  );
}

export default WebviewX;
