<script setup lang="ts">
import { ref, reactive } from "vue";
import { regionData } from "element-china-area-data";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { validEmail, validPhone, validName } from "@/utils/validate";
import { addStu } from "../../api/student";
import {useRouter} from 'vue-router'

const options = regionData;
const router = useRouter()
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  stuname: "",
  address: [],
  gender: ref(""),
  stuclass: "",
  // idcard: null,
  // stuprofession: "",
  email: "",
  workplace: "",
  job: "",
  salary: null,
  industry: "",
  phone: null
});
//提交
const onSubmit = async () => {
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const res: any = await addStu(ruleForm.value);
      console.log(ruleForm.value);
      console.log(res);
      if (res._id) {
        ElMessage({ type: "success", message: "添加成功" });
        router.push('/student/list')
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
  stuname: [
    { required: true, message: "请输入名字", trigger: "blur" },
    { validator: validateNameRule, trigger: "blur" }
  ],
  address: [{ required: true, message: "请选择居住地", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  stuclass: [{ required: true, message: "请输入班级", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { validator: validatePhoneRule, trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { validator: validateEmailRule, trigger: "blur" }
  ],
  workplace: [{ required: true, message: "请输入工作地点", trigger: "blur" }],
  salary: [{ required: true, message: "请输入薪资", trigger: "blur" }],
  industry: [{ required: true, message: "请输入专业", trigger: "blur" }],
  job: [{ required: true, message: "请输入岗位", trigger: "blur" }]
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
    <ElFormItem label="姓名" prop="stuname">
      <ElInput v-model="ruleForm.stuname"></ElInput>
    </ElFormItem>

    <ElFormItem label="性别" prop="gender">
      <ElRadioGroup v-model="ruleForm.gender">
        <ElRadioButton label="男" />
        <ElRadioButton label="女" />
      </ElRadioGroup>
    </ElFormItem>

    <ElFormItem label="班级" prop="stuclass">
      <ElInput v-model="ruleForm.stuclass"></ElInput>
    </ElFormItem>
    <ElFormItem label="手机号" prop="phone">
      <ElInput v-model="ruleForm.phone" maxlength="11"></ElInput>
    </ElFormItem>

    <ElFormItem label="专业" prop="industry">
      <ElInput v-model="ruleForm.industry"></ElInput>
    </ElFormItem>
    <ElFormItem label="薪资" prop="salary">
      <ElInput v-model="ruleForm.salary"></ElInput>
    </ElFormItem>
    <ElFormItem label="邮箱" prop="email">
      <ElInput v-model="ruleForm.email"></ElInput>
    </ElFormItem>
    <ElFormItem label="岗位" prop="job">
      <ElInput v-model="ruleForm.job"></ElInput>
    </ElFormItem>
    <ElFormItem label="工作地点" prop="workplace">
      <ElCascader
        :options="options"
        v-model="ruleForm.workplace"
        clearable
        filterable
      >
      </ElCascader>
    </ElFormItem>

    <ElFormItem label="住址" prop="address">
      <ElCascader
        :options="options"
        v-model="ruleForm.address"
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
