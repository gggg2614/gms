<template>
	<van-search :placeholder="placeholder"  show-action :clearable="false" @search="onSearch" @update:modelValue="onUpdateModelValue">
		<template #action>
			<div @click="onSearch">搜索</div>
		</template>
	</van-search>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const emit = defineEmits<{
	(e: 'search', value: string): void;
	(e: 'update:modelValue', value: string): void;
}>();

const props = defineProps({
	value: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '请输入公司名',
	},
});

const searchValue = ref(props.value);

const onSearch = () => {
	emit('search', searchValue.value);
};

const onUpdateModelValue = (value: string) => {
	searchValue.value = value;
	emit('update:modelValue', searchValue.value);
};
</script>
