import { getRequest } from '@/utils/request';

const userApi = async (params) => await getRequest('/api/api', params);

export { userApi };
