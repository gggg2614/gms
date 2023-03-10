import Request from 'luch-request';
import { assign } from 'lodash-es';
import { Toast } from '@/utils/uniapi/prompt';
import { getBaseUrl } from '@/utils/env';
import { useAuthStore } from '@/state/modules/auth';
import { ResultEnum } from '@/enums/httpEnum';

const BASE_URL = getBaseUrl();
const HEADER = {
	Accept: 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'X-Requested-With': 'XMLHttpRequest',
};

function createRequest() {
	return new Request({
		baseURL: 'http://localhost:3000',
		header: HEADER,
	});
}

const request = createRequest();
/**
 * 请求拦截器
 */
request.interceptors.request.use(
	(options) => {
		if (options.custom?.auth) {
			const authStore = useAuthStore();
			if (!authStore.isLogin) {
				Toast('请先登录');
				// token不存在跳转到登录页
				// return Promise.reject(options);
			}
			// options.header = assign(options.header, {
			// 	Authorization: `Bearer ${authStore.getToken}`,
			// });
			options.header = {
				...options.header,
				Authorization: `Bearer ${authStore.getToken}`,
			};
		}
		options.header['Authorization'] = `Bearer ${useAuthStore().getToken}`;
		return options;
	},
	(options) => Promise.reject(options)
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
	async (response) => {
		const { data: resData } = response;
		if (response.statusCode === 201 || 200) {
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
