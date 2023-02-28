<template>
	<div class="_u_mr-5 _u_ml-5 _u_mt-2">
		<div>
			<div class="_u_float-left _u_font-700">{{ detail.comjob }}</div>
			<div class="_u_float-right _u_mr-5 _u_c-indigo-3">{{ detail.comsalary }}</div>
			<div style="font-size: 0.6em" class="_u_clear-both _u_font-400 _u_mt-500">{{ detail.comaria.map((d) => CodeToText[d]).toString() }}</div>
		</div>
		<div class="_u_clear-both _u_mt-30">
			<div v-html="detail.detail"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { findById } from '../../../services/api/user';
import { ref } from 'vue';
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
onLoad(async (options) => {
	console.log(options);
	res.value = await findById(options._id);
	console.log(res.value);
	detail.value = res.value[0];
});
onMounted(() => {});
</script>
<style scoped></style>
