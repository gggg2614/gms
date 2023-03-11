<template name="workCard">
	<van-pull-refresh :refreshing="refreshing" @update:refreshing="(newValue: () => boolean) => refreshing= newValue" @refresh="$emit('onRefresh')">
		<van-list
			@load="$emit('onLoad')"
			finished-text="没有更多了"
			:loading="loading"
			:finished="finished"
			@update:loading="(newValue) => (loading = newValue)"
		>
			<van-cell v-if="loading === false" style="border-radius: 5%" v-for="item in list" :key:any="item" class="_u_mt-2" @click="goDetail(item)">
				<div style="font-size: 1.2em" class="_u_flex-1">
					<div class="_u_float-left _u_c-black _u_font-1000">{{ item.comjob }}</div>
					<div class="_u_float-right _u_mr-3 _u_c-indigo-3">{{ item.comsalary }}</div>
					<div v-if="useAuthStore().stuindustry?.toString() === item.industry?.toString()&&useAuthStore().stuindustry?.toString() !==undefined" class="_u_mr-13">
						<van-icon name="star" class="_u_color-red" />
					</div>
				</div>
				<div class="_u_clear-both">
					<div class="_u_float-left">{{ item.comname }}</div>
					<div class="_u_float-right _u_mr-3">{{ item.comaria.map((d: string | number) => CodeToText[d]).toString() }}</div>
				</div>
			</van-cell>
		</van-list>
	</van-pull-refresh>
</template>

<script setup lang="ts">
import { useRouter } from '../../hooks/router';
import { regionData, CodeToText } from 'element-china-area-data';
import { useAuthStore } from '../../state/modules/auth';

// const router = useRouter();
defineProps({
	list: Array,
	comjob: String,
	comname: String,
	comsalary: String,
	comaria: Array,
	finished: Boolean,
	loading: Boolean,
	refreshing: Boolean,
});
defineEmits(['update:refreshing', 'onRefresh', 'onLoad', 'update:loading']);
const goDetail = (e: { _id: any }) => {
	uni.navigateTo({ url: '/pages/company/detail/index?_id=' + e._id });
};
</script>

<style scoped></style>
