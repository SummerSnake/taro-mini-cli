import { getRequest } from '@/utils/request';

const getInfoApi = async (params) => await getRequest('/taroMini/homepage', params);

export { getInfoApi };
