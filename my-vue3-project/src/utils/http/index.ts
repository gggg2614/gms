import Request from 'luch-request';
import { assign } from 'lodash-es';
import { Toast } from '@/utils/uniapi/prompt';
import { getBaseUrl } from '@/utils/env';
import { useAuthStore } from '@/state/modules/auth';
import { ResultEnum } from '@/enums/httpEnum';

const BASE_URL = getBaseUrl();
const HEADER = {
	'Content-Type': 'application/json;charset=UTF-8;',
	Accept: 'application/json, text/plain, */*',
};

function createRequest() {
	return new Request({
		baseURL: 'http://localhost:3000/',
		header: HEADER,
		custom: {
			auth: true,
		},
	});
}

const request = createRequest();
/**
 * 请求拦截器
 */
// request.interceptors.request.use(
// 	(options) => {
// 		if (options.custom?.auth) {
// 			const authStore = useAuthStore();
// 			if (!authStore.isLogin) {
// 				Toast('请先登录');
// 				// token不存在跳转到登录页
// 				return Promise.reject(options);
// 			}
// 			options.header = assign(options.header, {
// 				authorization: `Bearer ${authStore.getToken}`,
// 			});
// 		}
// 		return options;
// 	},
// 	(options) => Promise.reject(options)
// );

/**
 * 响应拦截器
 */
request.interceptors.response.use(
	async (response) => {
		const { data: resData } = response;
		if (response.statusCode === ResultEnum.SUCCESS) {
			return resData as any;
		}
		Toast('网络错误，请重试');
		return Promise.reject(resData);
	},
	(response) =>
		// 请求错误做点什么。可以使用async await 做异步操作
		// error('Request Error!');
		Promise.reject(response)
);

export { request };
