<template>
	<div class="job-details-container">
		<div class="job-details-header">
			<div class="job-title">{{ detail.comjob }}</div>
			<div class="job-salary">{{ detail.comsalary }}</div>
		</div>
		<div class="job-details-aria">{{ comariaText }}</div>
		<div class="job-details-content" v-html="detail.detail"></div>
	</div>
</template>

<script setup lang="ts">
import { onLoad, onShow } from '@dcloudio/uni-app';
import { findById } from '../../../services/api/user';
import { computed, ref } from 'vue';
import { onMounted } from 'vue';
import { CodeToText } from 'element-china-area-data';

let res = ref();
let detail = ref({
	comname: '',
	comjob: '',
	comaria: [],
	detail: '',
	comsalary: '',
});

const comariaText = computed(() => {
	return detail.value.comaria.map((d) => CodeToText[d]).join(', ');
});
onLoad(async (options) => {
	res.value = await findById(options._id);
	detail.value = res.value[0];
	uni.setNavigationBarTitle({
		title: detail.value.comname,
	});
});
onShow(() => {
});
onMounted(() => {});
</script>

<style scoped>
.job-details-container {
	padding: 10px;
	border-radius: 5px;
	background-color: #fff;
	/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif;
}

.job-details-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
}

.job-title {
	font-size: 18px;
	font-weight: bold;
	color: #333;
}

.job-salary {
	font-size: 16px;
	font-weight: bold;
	color: #4b0082;
}

.job-details-aria {
	font-size: 14px;
	color: #999;
	margin-bottom: 20px;
}

.job-details-content {
	font-size: 16px;
	line-height: 1.5;
	color: #333;
}
</style>
