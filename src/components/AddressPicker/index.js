import Taro, { useDidShow } from '@tarojs/taro';
import React, { useState, useEffect } from 'react';
import { View, PickerView, PickerViewColumn } from '@tarojs/components';
import { verifyArr, isObj } from '@/utils/util';

import areaList from './area.js';

import styles from './index.modules.scss';

let isFirst = 1; // 编辑设置默认值开关
function AddressPicker(props) {
  const isIPhoneX = Taro.getStorageSync('isIPhoneX') === '1';
  const { callback = () => {}, selectedVal = [] } = props;

  const [isShow, setIsShow] = useState(0); // Picker 开关
  const [pickerVal, setPickerVal] = useState([]); // picker index 值
  const [provinces, setProvinces] = useState([]); // 省
  const [citys, setCitys] = useState([]); // 市
  const [areas, setAreas] = useState([]); // 区

  /**
   * @desc Picker 滑动事件
   * @param { object } e
   */
  const handlePickerScroll = (e) => {
    const { value = '' } = e && e.detail;
    const provinceIndex = value[0];
    const cityIndex = value[1];
    const areaIndex = value[2];

    // 如果省和之前不一样，表示滑动了省，此时市默认是省的第一组数据，
    if (pickerVal[0] !== provinceIndex) {
      const provinceId = provinces[provinceIndex].id;
      setPickerVal([provinceIndex, 0, 0]);
      getCitys(provinceId);
    } else if (pickerVal[1] !== cityIndex) {
      // 如果省和之前一样，表示滑动了第二项数据，即市，此时区显示省市对应的第一组区数据
      const cityId = citys[cityIndex].id;
      setPickerVal([provinceIndex, cityIndex, 0]);
      getAreas(cityId);
    } else {
      // 如果省市均一样，表示滑动了区
      setPickerVal([provinceIndex, cityIndex, areaIndex]);
    }
  };

  /**
   * @desc Picker 关闭事件
   * @param { number } isSetVal 是否赋值 0=>否  1=>是
   */
  const handlePickerShow = (isSetVal = 0) => {
    let areaInfo = {};

    if (!!isSetVal) {
      const val = pickerVal;

      if (verifyArr(provinces) && verifyArr(citys) && verifyArr(areas) && verifyArr(val)) {
        const name = `${provinces[val[0]].name} ${citys[val[1]].name} ${areas[val[2]].name}`;
        const code = [provinces[val[0]].id, citys[val[1]].id, areas[val[2]].id];

        areaInfo = { name, code };
      }
    }

    callback(areaInfo);
    setIsShow(0);
  };

  /**
   * @desc 获取 区 数据
   * @param { number } 市 id
   */
  const getAreas = (id) => {
    const areasArr = [];

    areaList.forEach((province) => {
      if (isObj(province) && verifyArr(province.citys)) {
        province.citys.forEach((city) => {
          if (isObj(city) && city.id === id && verifyArr(city.areas)) {
            city.areas.forEach((area) => {
              areasArr.push({ id: area.id, name: area.areaName });
            });
          }
        });
      }
    });

    setAreas(areasArr);

    return areasArr;
  };

  /**
   * @desc 获取 市 数据
   * @param { number } 省 id
   */
  const getCitys = (id) => {
    const citysArr = [];

    areaList.forEach((province) => {
      if (isObj(province) && province.id === id && verifyArr(province.citys)) {
        province.citys.forEach((city) => {
          citysArr.push({ id: city.id, name: city.cityName });
        });
      }
    });

    setCitys(citysArr);

    // 市对应的第一组区数据
    getAreas(citysArr[0] && citysArr[0].id);

    return citysArr;
  };

  /**
   * @desc 挂载格式化数据
   */
  useEffect(() => {
    if (verifyArr(areaList)) {
      const provincesArr = [];
      // 省数据
      areaList.forEach((province) => {
        if (isObj(province)) {
          provincesArr.push({ id: province.id, name: province.provinceName });
        }
      });
      setProvinces(provincesArr);
      // 市数据
      getCitys(provincesArr[0] && provincesArr[0].id);
    }
  }, []);

  /**
   * @desc 设置默认值
   */
  useEffect(() => {
    const setDefultVal = async () => {
      if (!!isFirst && verifyArr(provinces)) {
        isFirst = 0;
        let tmpArr = [0, 0, 0];

        if (verifyArr(selectedVal)) {
          // 省默认值
          provinces.forEach((province, index) => {
            if (selectedVal[0] === province.id) {
              tmpArr[0] = index;
            }
          });

          // 市默认值
          const citysArr = getCitys(selectedVal[0]);

          citysArr.forEach((city, index) => {
            if (selectedVal[1] === city.id) {
              tmpArr[1] = index;
            }
          });

          // 区默认值
          const areasArr = getAreas(selectedVal[1]);

          areasArr.forEach((area, index) => {
            if (selectedVal[2] === area.id) {
              tmpArr[2] = index;
            }
          });
        }

        setPickerVal(tmpArr);
      }
    };

    setDefultVal();
  }, [provinces]);

  /**
   * @desc Picker 开关
   */
  useEffect(() => {
    setIsShow(props.isPickShow);
  }, [props.isPickShow]);

  /**
   * @desc 首次进入页面打开默认值开关
   */
  useDidShow(() => (isFirst = 1));

  return (
    <View className={`${styles.addressPickerWrap} ${!!isShow ? styles.addressPickerShow : null}`}>
      {/* 遮罩层 */}
      <View
        className={styles.modalShadow}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={() => handlePickerShow()}
      />

      {/* 白色面板 */}
      <View
        className={`${styles.panelWrap} ${!!isShow ? styles.slideShow : null}`}
        style={{ paddingBottom: !!isIPhoneX ? Taro.pxTransform(74) : Taro.pxTransform(20) }}
      >
        <View className={styles.panelHeader}>
          <View
            className={`${styles.panelBtn} ${styles.cancle}`}
            onClick={() => handlePickerShow()}
          >
            取消
          </View>
          <View className={styles.headerTitle}>所在地区</View>
          <View className={styles.panelBtn} onClick={() => handlePickerShow(1)}>
            确定
          </View>
        </View>

        {verifyArr(pickerVal) && (
          <PickerView
            className={styles.pickerWrap}
            indicator-class={styles.pickerSelectedItem}
            onChange={handlePickerScroll}
            value={pickerVal}
          >
            <PickerViewColumn>
              {verifyArr(provinces) &&
                provinces.map((province) => {
                  return (
                    <View className={styles.pickerItem} key={province.id}>
                      {province.name}
                    </View>
                  );
                })}
            </PickerViewColumn>
            <PickerViewColumn>
              {verifyArr(citys) &&
                citys.map((city) => {
                  return (
                    <View className={styles.pickerItem} key={city.id}>
                      {city.name}
                    </View>
                  );
                })}
            </PickerViewColumn>
            <PickerViewColumn>
              {verifyArr(areas) &&
                areas.map((area) => {
                  return (
                    <View className={styles.pickerItem} key={area.id}>
                      {area.name}
                    </View>
                  );
                })}
            </PickerViewColumn>
          </PickerView>
        )}
      </View>
    </View>
  );
}

export default AddressPicker;
