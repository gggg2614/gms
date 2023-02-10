<template>
  <div>
    {{ counter }}
    {{ a }}
  <el-button type="primary" size="default" @click="clicka">a</el-button>
  <el-button type="primary" size="default" @click="clickb">b</el-button>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCounterStore } from "../stores/counter";
let counter = useCounterStore();
let a = ref(0);
function clicka() {
  counter.increment();
}
function clickb() {
  a.value++;
}
</script>

<style scoped></style>
