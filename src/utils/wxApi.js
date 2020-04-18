import Taro from '@tarojs/taro';

/**
 * @desc 微信支付
 * @param { object } option
 */
export const wxPay = (option) => {
  return new Promise((resolve, reject) => {
    // 调起微信支付
    Taro.requestPayment({
      ...option,
      success: (success) => {
        Taro.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000,
        });
        resolve(success);
        setTimeout(() => {
          Taro.hideToast();
        }, 2000);
      },
      fail: (error) => {
        Taro.showToast({ title: '支付失败', icon: 'none', duration: 2000 });
        reject(error);
        setTimeout(() => {
          Taro.hideToast();
        }, 2000);
      },
    });
  });
};

/**
 * @desc 微信 Toast
 * @param { string } toastTxt
 * @param { string } toastIcon
 * @param { number } duration 持续时间
 */
export const wxToast = (toastTxt = '', toastIcon = 'none', duration = 2000) => {
  Taro.showToast({ title: toastTxt, icon: toastIcon, duration });
  setTimeout(() => {
    Taro.hideToast();
  }, duration);
};
