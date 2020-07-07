import Taro, { useState, useEffect } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import { isNotNull } from '@/utils/util';
import styles from './index.modules.scss';

function VerifyCodeBtn(props) {
  const { dispatch, mobile = '' } = props;

  const [count, setCount] = useState(60); // 倒计时
  const [isFetch, setIsFetch] = useState(false); // 按钮开关

  /**
   * @desc 按钮点击事件
   */
  const handleClick = async () => {
    if (isNotNull(mobile) && !!isFetch) {
      // 获取验证码
      const res = await dispatch({
        type: 'common/getSMSCode',
      });

      if (res && res['status'] === 1) {
        setIsFetch(false); // 倒计时
        Taro.showToast({ title: res.statusDesc || '', icon: 'none', duration: 2000 });
      }
    }
  };

  /**
   * @desc 倒计时
   */
  useEffect(() => {
    let timer = null;

    if (!isFetch) {
      timer = setInterval(() => {
        setCount((n) => {
          if (n === 1) {
            setIsFetch(true);
            clearInterval(timer);
          }
          return n - 1;
        });
      }, 1000);
    }
    return () => {
      setCount(60);
      clearInterval(timer);
    };
  }, [isFetch]);

  return (
    <View
      onClick={handleClick}
      className={styles.verifyCodeBtn}
      style={{ backgroundColor: isFetch ? '#ff7554' : 'rgba(255,117,84,0.4)' }}
    >
      {isFetch ? '重新获取' : `${count}S`}
    </View>
  );
}

export default connect(({ common }) => ({ ...common }))(VerifyCodeBtn);
