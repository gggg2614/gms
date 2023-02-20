<template>
  <div>
    <el-dialog title="编辑学生信息" v-model="dialogVisible" width="30%">
      <span slot="footer">
        <ElForm
          :model="editData"
          ref="ruleFormRef"
          label-width="80px"
          :inline="false"
          size="default"
        >
          <ElFormItem label="姓名" prop="stuname">
            <ElInput v-model="editData.stuname"></ElInput>
          </ElFormItem>
          <ElFormItem label="性别" prop="gender">
            <ElRadioGroup v-model="editData.gender">
              <ElRadioButton label="男" />
              <ElRadioButton label="女" />
            </ElRadioGroup>
          </ElFormItem>
          <ElFormItem label="班级" prop="stuclass">
            <ElInput v-model="editData.stuclass"></ElInput>
          </ElFormItem>
          <ElFormItem label="手机号" prop="phone">
            <ElInput v-model="editData.phone" maxlength="11"></ElInput>
          </ElFormItem>
          <ElFormItem label="专业" prop="industry">
            <ElInput v-model="editData.industry"></ElInput>
          </ElFormItem>
          <ElFormItem label="薪资" prop="salary">
            <ElInput v-model="editData.salary"></ElInput>
          </ElFormItem>
          <ElFormItem label="邮箱" prop="email">
            <ElInput v-model="editData.email"></ElInput>
          </ElFormItem>
          <ElFormItem label="岗位" prop="job">
            <ElInput v-model="editData.job"></ElInput>
          </ElFormItem>
          <ElFormItem label="工作地点" prop="workplace">
            <ElCascader
              :options="options"
              v-model="editData.workplace"
              clearable
              filterable
            >
            </ElCascader>
          </ElFormItem>
          <ElFormItem label="住址" prop="address">
            <ElCascader
              :options="options"
              v-model="editData.address"
              clearable
              filterable
            >
            </ElCascader>
          </ElFormItem>
        </ElForm>
        <div style="display: flex; justify-content: center">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleEdit">提交</el-button>
        </div>
      </span>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column prop="_id" label="id" width="180" /> -->
      <el-table-column prop="stuname" label="名字" />
      <el-table-column prop="gender" label="性别" />
      <el-table-column prop="stuclass" label="班级" />
      <el-table-column prop="phone" label="手机号" width="110" />
      <el-table-column prop="industry" label="专业" width="110" />
      <el-table-column prop="salary" label="薪资" />
      <el-table-column prop="email" label="邮箱" width="180" />
      <el-table-column prop="job" label="岗位" />
      <el-table-column label="住址">
        <template v-slot="scope">
          {{ scope.row.address.map(d => CodeToText[d]).toString() }}
        </template>
      </el-table-column>
      <el-table-column label="工作地点">
        <template v-slot="scope">
          {{ scope.row.workplace.map(d => CodeToText[d]).toString() }}
        </template>
      </el-table-column>
      <el-table-column v-slot="scope" width="160">
        <el-button type="primary" size="default" @click="dialogOpen(scope.row)"
          >编辑</el-button
        >
        <el-button type="danger" size="default" @click="deleteClick(scope.row)"
          >删除</el-button
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { findAllstu } from "@/api/student";
import { ref } from "vue";
import { delStu, editStu } from "@/api/student";
import { regionData, CodeToText } from "element-china-area-data";
const options = regionData;
let tableData = ref();
let dialogVisible = ref(false);
let editData = ref({
  _id: "",
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
onMounted(async () => {
  tableData.value = await findAllstu();
});
const deleteClick = async row => {
  const res = await delStu(row._id);
};
const dialogOpen = async row => {
  dialogVisible.value = true;
  editData = ref(Object.assign({}, row));
};

const handleEdit = async () => {
  const res = await editStu(editData.value._id, editData.value);
  tableData.value = await findAllstu();
};
const handleClose = () => {
  dialogVisible.value = false;
};
</script>
