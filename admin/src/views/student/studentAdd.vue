<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { validEmail, validPhone, validName } from "@/utils/validate";
import { addStu } from "../../api/student";
import { useRouter } from "vue-router";
import { findAllcom } from "../../api/company";
import aria from '@/assets/json/aria.json';
import injson from "@/assets/json/industry.json";
import job from '@/assets/json/job.json';
import major from '@/assets/json/major.json';

let inoptions = ref();
let joboptions = ref();
let companyOptions = ref([]);
const router = useRouter();
const ruleFormRef = ref<FormInstance>();
const ruleForm = ref({
  stuname: "",
  address: [],
  gender: ref(""),
  stuclass: null,
  // idcard: null,
  // stuprofession: "",
  email: "",
  workplace: "",
  job: "",
  salary: null,
  industry: "",
  phone: null,
  company: "",
  major: [],
  leaveTime: '',
  workStatus: ref(''),
});

onMounted(async () => {
  inoptions.value = injson;
  joboptions.value = job
  let value: any = await findAllcom();
  companyOptions.value = value.map(v => ({
    value: v.comname,
    label: v.comname
  }));
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
        router.push("/student/list");
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

const validateLeaveTimeRule = (rule: any, value: string, callback: any) => {
  if (Number(value) <= 2023) {
    callback();
  } else {
    callback(new Error("请输入正确的时间"));
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
  workStatus: [{ required: true, message: "请选择毕业状态", trigger: "blur" }],
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
  industry: [{ required: true, message: "请输入行业", trigger: "blur" }],
  job: [{ required: true, message: "请输入岗位", trigger: "blur" }],
  company: [{ required: true, message: "请输入公司", trigger: "blur" }],
  major: [{ required: true, message: "请输入专业", trigger: "blur" }],
  leaveTime: [{ required: true, message: "请输入毕业时间", trigger: "blur" },
  { validator: validateLeaveTimeRule }]
});
</script>

<template>
  <ElForm :model="ruleForm" ref="ruleFormRef" :rules="rules" label-width="80px" :inline="false" size="default">
    <ElFormItem label="姓名" prop="stuname">
      <ElInput v-model.trim="ruleForm.stuname"></ElInput>
    </ElFormItem>

    <ElFormItem label="性别" prop="gender">
      <ElRadioGroup v-model="ruleForm.gender">
        <ElRadioButton label="男" />
        <ElRadioButton label="女" />
      </ElRadioGroup>
    </ElFormItem>

    <ElFormItem label-width="auto" label="是否就业(毕业前)" prop="workStatus">
      <ElRadioGroup v-model="ruleForm.workStatus">
        <ElRadioButton label="是" />
        <ElRadioButton label="否" />
      </ElRadioGroup>
    </ElFormItem>

    <ElFormItem label="专业" prop="major">
      <el-cascader :options="major" v-model="ruleForm.major" clearable filterable :show-all-levels="false">
      </el-cascader>
    </ElFormItem>

    <ElFormItem label="行业" prop="industry">
      <el-cascader :options="inoptions" v-model="ruleForm.industry" clearable filterable :show-all-levels="false">
      </el-cascader>
    </ElFormItem>
    <ElFormItem label="班级" prop="stuclass" style="width: 400px;">
      <el-slider v-model="ruleForm.stuclass" show-input :min="1" :max="12" />
      <!-- <ElInput v-model="ruleForm.stuclass"></ElInput> -->
    </ElFormItem>
    <ElFormItem label="手机号" prop="phone">
      <ElInput v-model.trim="ruleForm.phone" maxlength="11"></ElInput>
    </ElFormItem>

    <ElFormItem label-width="auto" label="毕业时间(年)" prop="leaveTime">
      <ElInput v-model.trim="ruleForm.leaveTime" placeholder="例如:2023" maxlength="4"></ElInput>
    </ElFormItem>
    <ElFormItem label="邮箱" prop="email">
      <ElInput v-model.trim="ruleForm.email"></ElInput>
    </ElFormItem>

    <template v-if="ruleForm.workStatus === '是'">
      <ElFormItem label="薪资(月)" prop="salary">
        <ElInput v-model.trim="ruleForm.salary" placeholder="例如:8k "></ElInput>
      </ElFormItem>
      <ElFormItem label="岗位" prop="job">
        <el-cascader :options="joboptions" v-model="ruleForm.job" clearable filterable :show-all-levels="false">
        </el-cascader>
      </ElFormItem>
      <ElFormItem label="公司" prop="company">
        <el-cascader :options="companyOptions" v-model="ruleForm.company" clearable filterable :show-all-levels="false">
        </el-cascader>
      </ElFormItem>
      <ElFormItem label="工作地点" prop="workplace">
        <ElCascader :options="aria" v-model="ruleForm.workplace" clearable filterable>
        </ElCascader>
      </ElFormItem>
    </template>
    <ElFormItem label="住址" prop="address">
      <ElCascader :options="aria" v-model="ruleForm.address" clearable filterable>
      </ElCascader>
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="onSubmit()">立即创建</ElButton>
      <ElButton>取消</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<style scoped>
::v-deep .el-input {
  width: 200px;
}
</style>
