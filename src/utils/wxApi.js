import Taro from '@tarojs/taro';

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
        wxToast('支付成功', 'success');
        resolve(success);
      },
      fail: (error) => {
        wxToast('支付失败');
        reject(error);
      },
    });
  });
};

/**
 * @desc 微信 保存图片到相册
 * @param { string } filePath 文件路径
 */
export const wxSaveImageToAlbum = (filePath = '') => {
  Taro.getSetting({
    success(settingRes) {
      // 判断是否有权限
      if (!settingRes.authSetting['scope.writePhotosAlbum']) {
        Taro.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            Taro.saveImageToPhotosAlbum({
              filePath,
              success() {
                wxToast('保存成功');
              },
              fail() {
                wxToast('保存失败');
              },
            });
          },
          // 拒绝授权时，则进入手机设置页面，可进行授权设置
          fail() {
            Taro.openSetting({
              success() {},
              fail() {
                wxToast('授权失败');
              },
            });
          },
        });
      } else {
        Taro.saveImageToPhotosAlbum({
          filePath,
          success() {
            wxToast('保存成功');
          },
          fail() {
            wxToast('保存失败');
          },
        });
      }
    },
  });
};

/**
 * @desc 下载、预览文件
 * @param { string } url 文件url
 * @param { string } title 文件标题
 */
export const wxDownloadFile = (url = '', title = '') => {
  const mime = url.substring(url.lastIndexOf('.'));
  let fileName = new Date().valueOf();
  let filePath = Taro.env.USER_DATA_PATH + '/' + fileName + mime;

  Taro.downloadFile({
    url,
    filePath,
    success() {
      if (mime === '.jpg' || mime === '.jpeg' || mime === '.png' || mime === '.gif') {
        wxSaveImageToAlbum(filePath);
      } else {
        Taro.getSystemInfo({
          success(sysRes) {
            if (sysRes.platform === 'ios') {
              Taro.navigateTo({ url: `/webview/index?url=${url}` });
            } else {
              const fs = Taro.getFileSystemManager();
              // 修改文件名字，仅安卓可以，ios无权限
              fs.rename({
                oldPath: filePath,
                newPath: `${Taro.env.USER_DATA_PATH}/${title}`,
                success() {
                  Taro.openDocument({
                    filePath: `${Taro.env.USER_DATA_PATH}/${title}`,
                    fileType: mime,
                    success() {},
                    fail() {
                      wxToast('文件打开失败');
                    },
                  });
                },
                fail() {
                  wxToast('文件保存失败');
                },
              });
            }
          },
        });
      }
    },
  });
};
