<script setup lang="ts">
import AppProvider from '@/components/AppProvider/inedx.vue';
import { onMounted, ref } from 'vue';
import { findAllCompany } from '@/services/api/user';
import workCard from '@/components/workCard';
import { useRouter } from '../../hooks/router';
import { onLoad } from '@dcloudio/uni-app';
import { showConfirmDialog, showDialog, showToast } from 'vant';
const router = useRouter();

let res: any = ref([]);
let list: any = ref([
	{
		comname: '',
		comaria: [],
	},
]);
const loading = ref(true);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = async () => {
	try {
		res.value = await findAllCompany();
		if (refreshing.value) {
			list.value = [];
			loading.value = false;
			refreshing.value = false;
		}
		list.value = res.value;
		if (list.value) {
			finished.value = true;
			loading.value = false;
			refreshing.value = false;
		}
	} catch (err) {
		finished.value = true;
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
			});
	}
};
onLoad(() => {});
const onRefresh = () => {
	// 清空列表数据
	try {
		finished.value = false;
		showToast('刷新成功');
		loading.value = true;
		onLoad();
	} catch (error) {
		finished.value = true;
		loading.value = false;
		console.log(error);
	}
};
</script>
<template>
	<AppProvider>
		<workCard
			class="_u_mr-1 _u_ml-1"
			@onLoad="onLoad"
			:finished="finished"
			:loading="loading"
			:list="list"
			@onRefresh="onRefresh"
			v-model="refreshing"
		></workCard>
	</AppProvider>
</template>

