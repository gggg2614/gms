<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input
        style="width: 200px"
        v-model="phoneFind"
        placeholder="请输入公司名"
        size="default"
        clearable
      ></el-input>
      <el-button
        type="primary"
        size="default"
        @click="handleFindPhone"
        v-btn-debounce
        >查找</el-button
      >
    </div>
    <el-dialog title="编辑学生信息" v-model="dialogVisible" width="50%">
      <span slot="footer">
        <ElForm
          :model="editData"
          ref="ruleFormRef"
          label-width="80px"
          :inline="false"
          size="default"
        >
          <ElFormItem label="姓名" prop="comname">
            <ElInput v-model="editData.comname"></ElInput>
          </ElFormItem>
          <ElFormItem label="岗位" prop="job">
            <ElInput v-model="editData.comjob"></ElInput>
          </ElFormItem>
          <ElFormItem label="行业" prop="industry">
            <ElInput v-model="editData.industry"></ElInput>
          </ElFormItem>
          <ElFormItem label="薪资" prop="salary">
            <ElInput v-model="editData.comsalary"></ElInput>
          </ElFormItem>
          <ElFormItem label="住址" prop="address">
            <ElCascader
              :options="options"
              v-model="editData.comaria"
              clearable
              filterable
            >
            </ElCascader>
          </ElFormItem>
          <ElFormItem label="细节" prop="detail">
            <div style="border: 1px solid #ccc">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                mode="default"
              />
              <Editor
                style="height: 500px; overflow-y: hidden"
                v-model="editData.detail"
                :defaultConfig="editorConfig"
                mode="default"
                @onCreated="handleCreated"
              />
            </div>
          </ElFormItem>
        </ElForm>
        <div style="display: flex; justify-content: center">
          <el-button @click="handleClose">取消</el-button>
          <el-button v-btn-debounce type="primary" @click="handleEdit"
            >提交</el-button
          >
        </div>
      </span>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
      <!-- <el-table-column prop="_id" label="id" width="180" /> -->
      <el-table-column prop="comname" label="名字" />
      <el-table-column prop="comjob" label="岗位" />
      <el-table-column prop="industry" label="行业" />
      <el-table-column prop="comsalary" label="薪资" />
      <el-table-column label="工作地点">
        <template v-slot="scope">
          {{ scope.row.comaria.map(d => CodeToText[d]).toString() }}
        </template>
      </el-table-column>
      <el-table-column v-slot="scope" width="160">
        <el-button
          v-btn-debounce
          type="primary"
          size="default"
          @click="dialogOpen(scope.row)"
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
import { onMounted, shallowRef } from "vue";
import { ref } from "vue";
import { delCom, editCom, findCom } from "@/api/company";
import { regionData, CodeToText } from "element-china-area-data";
import { nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import "@wangeditor/editor/dist/css/style.css"; // 引入 css

import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const editorRef = shallowRef();

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

const options = regionData;
let tableData = ref();
let dialogVisible = ref(false);
let tableLoading = ref(true);
let phoneFind = ref("");
let editData = ref({
  _id: "",
  comname: "",
  comaria: [],
  comsalary: ref(""),
  comjob: "",
  industry: "",
  detail: ""
});

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

async function handleFindPhone() {
  tableData.value = await findCom(phoneFind.value);
  console.log(phoneFind);
}

function hideLoading() {
  tableLoading.value = false;
}

function init() {
  nextTick(async () => {
    tableData.value = await findCom();
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
  await ElMessageBox.confirm(`是否删除【${row.comname}】？`, "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      const res: any = await delCom(row._id);
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
  console.log(row);
  editData = ref(Object.assign({}, row));
};

const handleEdit = async () => {
  let res;
  tableLoading.value = true;
  res = await editCom(editData.value._id, editData.value);
  tableData.value = await findCom();
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
