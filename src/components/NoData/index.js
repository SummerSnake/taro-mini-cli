import { View } from '@tarojs/components';

function NoData(props) {
  const { isShow = false } = props;

  return (
    <View
      style={{
        display: isShow ? 'block' : 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <View style={{ width: '80px', height: '80px', textAlign: 'center', color: '#999' }}>
        <View>暂无数据</View>
      </View>
    </View>
  );
}

export default NoData;
