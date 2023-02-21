<script setup lang="ts">
import { ref, reactive } from "vue";
import { regionData } from "element-china-area-data";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { validEmail, validPhone, validName } from "@/utils/validate";
import { addCom } from "../../api/company";
import { useRouter } from "vue-router";

const options = regionData;
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  comname: "",
  comaria: [],
  comsalary: ref(""),
  comjob: "",
  industry: "",
  phone: null
});
//提交
const onSubmit = async () => {
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res: any = await addCom(ruleForm.value);
      console.log(ruleForm.value);
      console.log(res);
      if (res._id) {
        ElMessage({ type: "success", message: "添加成功" });
        router.push("/company/list");
      } else {
        ElMessage({
          type: "error",
          message: res?.msg || "网络异常，请稍后重试！"
        });
      }
    }
  });
};

const validateNameRule = (rule: any, value: string, callback: any) => {
  if (validName(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的名字"));
  }
};

const validateEmailRule = (rule: any, value: string, callback: any) => {
  if (validEmail(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的邮箱"));
  }
};
//验证手机号
const validatePhoneRule = (rule: any, value: string, callback: any) => {
  if (validPhone(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的手机号"));
  }
};

//验证
const rules = reactive<FormRules>({
  comname: [
    { required: true, message: "请输入名字", trigger: "blur" },
    { validator: validateNameRule, trigger: "blur" }
  ],
  comaria: [{ required: true, message: "请选择工作地", trigger: "blur" }],
  comjob: [{ required: true, message: "请输入岗位", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: validatePhoneRule, trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { validator: validateEmailRule, trigger: "blur" }
  ],
  comsalary: [{ required: true, message: "请输入薪资", trigger: "blur" }],
  industry: [{ required: true, message: "请输入行业", trigger: "blur" }],
});
</script>

<template>
  <ElForm
    :model="ruleForm"
    ref="ruleFormRef"
    :rules="rules"
    label-width="80px"
    :inline="false"
    size="default"
  >
    <ElFormItem label="公司名字" prop="comname">
      <ElInput v-model="ruleForm.comname"></ElInput>
    </ElFormItem>

    <ElFormItem label="岗位" prop="comjob">
      <ElInput v-model="ruleForm.comjob"></ElInput>
    </ElFormItem>

    <ElFormItem label="行业" prop="industry">
      <ElInput v-model="ruleForm.industry"></ElInput>
    </ElFormItem>
    <ElFormItem label="薪资" prop="comsalary">
      <ElInput v-model="ruleForm.comsalary"></ElInput>
    </ElFormItem>
    <!-- <ElFormItem label="邮箱" prop="email">
      <ElInput v-model="ruleForm.email"></ElInput>
    </ElFormItem> -->

    <ElFormItem label="地址" prop="comaria">
      <ElCascader
        :options="options"
        v-model="ruleForm.comaria"
        clearable
        filterable
      >
      </ElCascader>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="onSubmit()">立即创建</ElButton>
      <ElButton>取消</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<style scoped></style>
