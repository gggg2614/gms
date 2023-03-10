import { defineStore } from 'pinia';
import { getCache, removeCache, setCache } from '@/utils/cache';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { login, logout, refreshToken } from '@/services/api/auth';

interface AuthState {
	token?: string;
	stuname?: string;
	stuindustry?: Array<string>;
}

export const useAuthStore = defineStore({
	id: 'auth',
	state: (): AuthState => ({
		token: undefined,
		stuname: undefined,
		stuindustry: undefined,
	}),
	getters: {
		getToken: (state) => state.token,
		isLogin: (state): boolean => !!state.token,
		getStuname: (state) => state.stuname,
		getStuindustry: (state) => state.stuindustry,
	},
	actions: {
		initToken() {
			this.token = getCache<string>(TOKEN_KEY) || undefined;
		},
		setToken(token: string | undefined) {
			setCache(TOKEN_KEY, token);
			this.token = token;
		},
		setStuname(stuname: string | undefined) {
			this.stuname = stuname;
		},
		setStuindus(stuindustry: Array<string> | undefined) {
			this.stuindustry = stuindustry;
		},

		/**
		 * @description 登录
		 */
		async login(params: LoginParams): Promise<LoginModel> {
			try {
				const { data } = await login(params);
				this.setToken(data.accessToken);
				this.setStuname(data.stuname);
				this.setStuindus(data.stuindustry);
				console.log(data);
				return Promise.resolve(data);
			} catch (err: any) {
				return Promise.reject(err);
			}
		},
		/**
		 * @description 登出
		 */
		async loginOut(): Promise<any> {
			try {
				// const res = await logout();
				removeCache(TOKEN_KEY);
				this.setToken(undefined);
				// return Promise.resolve(res);
			} catch (err: any) {
				return Promise.reject(err);
			}
		},
		/**
		 * @description 刷新token
		 */
		async refreshToken(): Promise<LoginModel> {
			try {
				const { data } = await refreshToken();
				this.setToken(data.token);
				return Promise.resolve(data);
			} catch (err: any) {
				return Promise.reject(err);
			}
		},
	},
});
