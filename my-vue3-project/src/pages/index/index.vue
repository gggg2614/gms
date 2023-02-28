<script setup lang="ts">
import AppProvider from '@/components/AppProvider/inedx.vue';
import { onMounted, ref } from 'vue';
import { findAllCompany } from '@/services/api/user';
import workCard from '@/components/workCard';
import { useRouter } from '../../hooks/router';
const router = useRouter();

let res: any = ref([]);
let list: any = ref([
	{
		comname: '',
		comaria: [],
	},
]);
const loading = ref(false);
const finished = ref(false);
onMounted(async () => {});
async function onLoad() {
	res.value = await findAllCompany();
	setTimeout(async () => {
		list.value = res.value;
	}, 1);
	loading.value = false;
}
</script>
<template>
	<AppProvider>
		<workCard class="_u_mr-1 _u_ml-1" @onLoad="onLoad" :finished="finished" :loading="loading" :list="list"></workCard>
	</AppProvider>
</template>

<style lang="scss">
.container {
	padding: 128rpx 0;
	text-align: center;
}
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin: 280rpx auto 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
	margin-bottom: 60rpx;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
