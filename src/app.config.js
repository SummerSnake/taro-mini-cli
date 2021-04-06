export default {
  pages: ['pages/basicLayout/index'],
  subpackages: [
    {
      root: 'webview',
      pages: ['index'],
    },
  ],
  window: {
    navigationStyle: 'custom',
    // backgroundTextStyle: 'light',
    // navigationBarBackgroundColor: '#fff',
    // navigationBarTitleText: 'SummerSnake',
    // navigationBarTextStyle: 'black',
  },
  permission: {
    // 地图权限
    // 'scope.userLocation': {
    //   desc: '您的位置信息将用于小程序位置接口的效果展示',
    // },
  },
};
