<template name="workCard">
	<van-pull-refresh :refreshing="refreshing" @update:refreshing="(newValue: () => boolean) => refreshing= newValue" @refresh="$emit('onRefresh')">
		<van-list
			@load="$emit('onLoad')"
			finished-text="没有更多了"
			:loading="loading"
			:finished="finished"
			@update:loading="(newValue) => (loading = newValue)"
		>
			<van-cell v-if="loading === false" class="work-card" v-for="item in list" :key:any="item" @click="goDetail(item)">
				<div class="job-info">
					<div class="job-title">{{ item.comjob }}</div>
					<div class="job-salary">{{ item.comsalary }}</div>
					<div
						v-if="useAuthStore().stuindustry?.toString() === item.industry?.toString() && useAuthStore().stuindustry?.toString() !== undefined"
						class="job-industry"
					>
						<van-icon name="star" class="star-icon" />
					</div>
				</div>
				<div class="company-info">
					<div class="company-name">{{ item.comname }}</div>
					<div class="company-area">{{ item.comaria.map((d: string | number) => CodeToText[d]).toString() }}</div>
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

<style scoped>
.work-card {
	border-radius: 5%;
	margin-top: 0.5rem;
	padding: 0.625rem;
	background-color: #fff;
	box-shadow: 0 0.0625rem 0.25rem rgba(0, 0, 0, 0.2);
}

.job-info {
	display: flex;
	justify-content: space-between;
	font-size: 1.2em;
}

.job-title {
	float: left;
	color: #000;
	font-weight: 1000;
}

.job-salary {
	float: right;
	margin-right: 3%;
	color: #3e4f5f;
}

.star-icon {
	color: red;
}

.company-info {
	clear: both;
}

.company-name {
	float: left;
	font-size: 0.875rem;
	color: #000;
}

.company-area {
	float: right;
	margin-right: 3%;
	font-size: 0.875rem;
	color: #3e4f5f;
}
</style>
