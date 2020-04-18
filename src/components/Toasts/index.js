import Taro from '@tarojs/taro';
import { CoverView, CoverImage } from '@tarojs/components';

function Toasts(props) {
  const { isShow = false, imgUrl = '', txt = '' } = props;

  return (
    <CoverView
      style={{
        display: isShow ? 'block' : 'none',
        position: 'absolute',
        top: '0',
        left: '0',
        color: 'transparent',
        width: '100vw',
        height: '100%',
      }}
    >
      <CoverView
        style={{
          position: 'absolute',
          top: '44%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: Taro.pxTransform(330),
          backgroundColor: '#fff',
          border: '1px solid #e4e7ed',
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        <CoverImage
          src={imgUrl}
          style={{
            display: 'inline-block',
            width: Taro.pxTransform(100),
            height: Taro.pxTransform(84),
            marginTop: Taro.pxTransform(60),
            marginBottom: Taro.pxTransform(60),
          }}
        />
        <CoverView
          style={{
            fontSize: Taro.pxTransform(28),
            color: '#6f6a6a',
          }}
        >
          {txt}
        </CoverView>
      </CoverView>
    </CoverView>
  );
}

export default Toasts;
