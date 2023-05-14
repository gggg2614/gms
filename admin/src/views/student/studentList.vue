<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input style="width: 200px" v-model="phoneFind" placeholder="请输入手机号" size="default" clearable></el-input>
      <el-button type="primary" size="default" @click="handleFindPhone" v-btn-debounce>查找</el-button>
    </div>
    <el-dialog title="编辑学生信息" v-model="dialogVisible" width="30%">
      <span slot="footer">
        <ElForm :model="editData" ref="ruleFormRef" label-width="80px" :inline="false" size="default">
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
          <ElFormItem label="专业" prop="major">
            <el-cascader :options="major" v-model="editData.major" clearable filterable :show-all-levels="false">
            </el-cascader>
          </ElFormItem>
          <ElFormItem label="行业" prop="industry">
            <ElInput v-model="editData.industry"></ElInput>
          </ElFormItem>
          <ElFormItem label="毕业时间" prop="leaveTime">
            <ElInput v-model="editData.leaveTime"></ElInput>
          </ElFormItem>
          <ElFormItem label="薪资" prop="salary">
            <ElInput v-model="editData.salary"></ElInput>
          </ElFormItem>
          <ElFormItem label="邮箱" prop="email">
            <ElInput v-model="editData.email"></ElInput>
          </ElFormItem>
          <ElFormItem label="岗位" prop="job">
            <el-cascader :options="job" v-model="editData.job" clearable filterable :show-all-levels="false">
            </el-cascader>
          </ElFormItem>
          <ElFormItem label="公司" prop="company">
            <ElInput v-model="editData.company"></ElInput>
          </ElFormItem>
          <ElFormItem label="住址" prop="address">
            <ElCascader :options="options" v-model="editData.address" clearable filterable>
            </ElCascader>
          </ElFormItem>
          <ElFormItem label="工作地点" prop="workplace">
            <ElCascader :options="options" v-model="editData.workplace" clearable filterable>
            </ElCascader>
          </ElFormItem>
        </ElForm>
        <div style="display: flex; justify-content: center">
          <el-button @click="handleClose">取消</el-button>
          <el-button v-btn-debounce type="primary" @click="handleEdit">提交</el-button>
        </div>
      </span>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
      <!-- <el-table-column prop="_id" label="id" width="180" /> -->
      <el-table-column prop="stuname" label="名字" />
      <el-table-column prop="gender" label="性别" :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
        :filter-method="filterGender" />
      <el-table-column prop="stuclass" label="班级" width="110">
        <template #default="scope">
          {{ scope.row.major[2] + '' + scope.row.stuclass + '班' }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="110" />
      <el-table-column prop="major[2]" label="专业" width="110" :filters="major" :filter-method="filterMajor" />
      <el-table-column prop="industry" label="行业" width="110" />
      <el-table-column prop="salary" label="薪资(月)" />
      <el-table-column prop="leaveTime" label="毕业时间" width="99" :filters="leaveYear" :filter-method="filterYear" />
      <el-table-column prop="email" label="邮箱" width="155" />
      <el-table-column prop="job[1]" label="岗位" :filters="job" :filter-method="filterJob" />
      <el-table-column prop="company" label="公司" />
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
      <el-table-column label="操作" v-slot="scope" width="158">
        <el-button v-btn-debounce type="primary" size="default" @click="dialogOpen(scope.row)">编辑</el-button>
        <el-button type="danger" size="default" @click="deleteClick(scope.row)">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { delStu, editStu, findStu } from "@/api/student";
import { regionData, CodeToText } from "element-china-area-data";
import { nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import job from '@/assets/json/job.json';
import major from '@/assets/json/major.json';
import leaveYear from '@/assets/json/year.json';
const options = regionData;
let tableData = ref();
let dialogVisible = ref(false);
let tableLoading = ref(true);
let phoneFind = ref("");
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
  phone: null,
  company: "",
  major: [],
  leaveTime: ''
});

async function handleFindPhone() {
  tableData.value = await findStu(phoneFind.value);
  console.log(phoneFind);
}

const filterYear = (value, row) => {
  return row.leaveTime.indexOf(value) > -1
}
const filterMajor = (value, row) => {
  return row.major.indexOf(value) > -1
}

const filterJob = (value, row) => {
  return row.job.indexOf(value) > -1
}
const filterGender = (value, row) => {
  return row.gender.indexOf(value) > -1
}

function hideLoading() {
  tableLoading.value = false;
}

function init() {

  nextTick(async () => {
    try {
      tableData.value = await findStu();
    } catch (error) {
      ElMessage({ message: error })
    }
    if (!tableData.value) {
      tableLoading.value = true;
    } else {
      hideLoading();
    }
  });
}

onMounted(async () => {
  init();
});

const deleteClick = async row => {
  await ElMessageBox.confirm(`是否删除姓名为【${row.stuname}】学生？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      const res: any = await delStu(row._id);
      tableLoading.value = true;
      if (res._id) {
        tableLoading.value = false;
        init();
        ElMessage({ message: "删除成功", type: "success" });
      } else {
        ElMessage({
          type: "error",
          message: res?.msg || "网络异常，请稍后重试"
        });
      }
    })
    .catch(() => {
      ElMessage({ type: "error", message: "已取消" });
    });
};

const dialogOpen = async row => {
  dialogVisible.value = true;
  editData = ref(Object.assign({}, row));
};

const handleEdit = async () => {
  let res;
  tableLoading.value = true;
  res = await editStu(editData.value._id, editData.value);
  tableData.value = await findStu();
  tableLoading.value = false;
  dialogVisible.value = false;
  if (res._id) {
    ElMessage({ message: "修改成功", type: "success" });
  } else {
    ElMessage({ type: "error", message: res?.msg || "网络异常，请稍后重试" });
  }
};
const handleClose = () => {
  dialogVisible.value = false;
};
</script>
