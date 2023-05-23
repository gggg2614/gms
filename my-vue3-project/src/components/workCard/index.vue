<template name="workCard">
	<van-pull-refresh style="height:100%" :refreshing="refreshing" @update:refreshing="(newValue: () => boolean) => refreshing= newValue" @refresh="$emit('onRefresh')">
		<van-skeleton :loading="loading" row="3">
			<van-list
				@load="$emit('onLoad')"
				finished-text="没有更多了"
				:loading="loading"
				:finished="finished"
				@update:loading="(newValue) => (loading = newValue)"
			>
				<van-cell
					v-if="loading === false"
					style="border-radius: 5%"
					v-for="(item, index) in list"
					:class="['list-item', { active: activeIndex === index }]"
					:key:any="item"
					class="_u_mt-2"
					@click="
						goDetail(item);
						onItemClick(index);
					"
				>
					<div style="font-size: 1.2em" class="_u_flex-1">
						<div class="_u_float-left _u_c-black _u_font-1000">{{ item.comjob[2] }}</div>
						<div class="_u_float-right _u_mr-3 _u_c-indigo-3">{{ item.comsalary }}</div>
						<div
							v-if="useAuthStore().stuindustry?.toString() === item.industry?.toString() && useAuthStore().stuindustry?.toString() !== undefined"
							class="_u_mr-13"
						>
							<van-icon name="star" class="_u_color-red" />
						</div>
					</div>
					<div class="_u_clear-both">
						<div class="_u_float-left">{{ item.comname }}</div>
						<div class="_u_float-right _u_mr-3">{{ item.comaria.map((d: string | number) => CodeToText[d]).toString() }}</div>
					</div>
				</van-cell>
			</van-list>
		</van-skeleton>
	</van-pull-refresh>
</template>

<script setup lang="ts">
import { CodeToText } from 'element-china-area-data';
import { useAuthStore } from '../../state/modules/auth';
import { ref } from 'vue';
// const router = useRouter();
const activeIndex = ref(-1);
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

const onItemClick = (index: any) => {
	console.log(index);
};
const goDetail = (e: { _id: any }) => {
	uni.navigateTo({ url: '/pages/company/detail/index?_id=' + e._id });
};
</script>

<style scoped>
.list-item :active {
	/* 默认样式 */
	background-color: #f5f5f5;
}
.list-item.active {
	background-color: #f5f5f5;
}
</style>
