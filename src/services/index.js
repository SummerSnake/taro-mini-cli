import { postRequest } from '@/utils/request';

// 获取验证码
const getSmsCodeApi = async (params) => await postRequest('/smscode/send', params);

// 校验验证码
const verifySmsCodeApi = async (params) => await postRequest('/smscode/check', params);

// 获取用户信息
const getUserInfoApi = async (params) => await postRequest('/user/getUserInfo', params);

export { getSmsCodeApi, verifySmsCodeApi, getUserInfoApi };
