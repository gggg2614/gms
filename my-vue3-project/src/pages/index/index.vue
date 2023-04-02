<script setup lang="ts">
import AppProvider from '@/components/AppProvider/inedx.vue';
import Search from '@/components/searchCom/Search.vue';
import { onMounted, ref } from 'vue';
import { findAllCompany, findByName } from '@/services/api/user';
import workCard from '@/components/workCard';
import { useRouter } from '../../hooks/router';
import { showConfirmDialog, showToast } from 'vant';
const router = useRouter();

let res: any = ref([]);
let list: any = ref([]);
const loading = ref(true);
const finished = ref(false);
const refreshing = ref(false);
const searchValue = ref();

const onSearch = async (val: string) => {
	try {
		console.log(list.value);
		res.value = await findByName(val);
		if (refreshing.value) {
			// 如果是下拉刷新，清空列表数据
			list.value = [];
			loading.value = false;
			refreshing.value = false;
		}
		list.value = res.value;
		if (list.value) {
			// 如果有数据，设置 finished 和 loading 的值
			finished.value = true;
			loading.value = false;
			refreshing.value = false;
		}
	} catch (err) {
		// 如果出错，设置 finished 和 loading 的值，并弹出提示框
		// finished.value = true;
		loading.value = false;
		showConfirmDialog({
			title: '未登录',
			message: '请先登录',
		})
			.then(() => {
				// on confirm
				router.push('/pages/login/index');
			})
			.catch(() => {
				// on cancel
				router.push('/pages/login/index');
			});
	}
};
// 加载数据
const loadData = async () => {
	try {
		console.log(list.value);
		res.value = await findAllCompany();
		if (refreshing.value) {
			// 如果是下拉刷新，清空列表数据
			list.value = [];
			loading.value = false;
			refreshing.value = false;
		}
		list.value = res.value;
		if (list.value) {
			// 如果有数据，设置 finished 和 loading 的值
			finished.value = true;
			loading.value = false;
			refreshing.value = false;
		}
	} catch (err) {
		// 如果出错，设置 finished 和 loading 的值，并弹出提示框
		// finished.value = true;
		loading.value = false;
		showConfirmDialog({
			title: '未登录',
			message: '请先登录',
		})
			.then(() => {
				// on confirm
				router.push('/pages/login/index');
			})
			.catch(() => {
				// on cancel
				router.push('/pages/login/index');
			});
	}
};
// 组件加载时加载数据
onMounted(() => {
	loadData();
});
// 下拉刷新事件处理函数
const onRefresh = async () => {
	// 清空列表数据
	try {
		finished.value = false;
		showToast('刷新成功');
		loading.value = true;
		await loadData();
	} catch (error) {
		finished.value = true;
		loading.value = false;
		console.log(error);
	}
};
</script>
<template>
	<AppProvider>
		<Search v-model="searchValue" @Search="onSearch"></Search>
		<workCard
			:style="{ height: '90vh' }"
			class="_u_mr-1 _u_ml-1"
			@onLoad="loadData"
			:finished="finished"
			:loading="loading"
			:list="list"
			@onRefresh="onRefresh"
			v-model="refreshing"
		></workCard>
	</AppProvider>
</template>
