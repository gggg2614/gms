<template>
  <div>
    <div style="margin-bottom: 10px">
      <el-input style="width: 200px" v-model="phoneFind" placeholder="请输入手机号" size="default" clearable></el-input>
      <el-button type="primary" size="default" @click="handleFindPhone" v-btn-debounce>查找</el-button>
      <el-button @click="clearFilter" type="primary" size="default">重置筛选</el-button>
      <el-button type="primary" size="default" @click="exportExcel">导出Excel</el-button>
      <el-button type="primary" size="default" @click="exportExcelSel"
        :disabled="selectedStu.length === 0">导出选中Excel</el-button>
    </div>
    <el-dialog title="编辑学生信息" v-model="dialogVisible" width="30%">
      <span slot="footer">
        <ElForm :model="editData" ref="ruleFormRef" label-width="80px" :inline="false" size="default" :rules="rules">
          <ElFormItem label="姓名" prop="stuname">
            <ElInput v-model="editData.stuname"></ElInput>
          </ElFormItem>
          <ElFormItem label="性别" prop="gender">
            <ElRadioGroup v-model="editData.gender">
              <ElRadioButton label="男" />
              <ElRadioButton label="女" />
            </ElRadioGroup>
          </ElFormItem>
          <ElFormItem label-width="auto" label="是否就业(毕业前)" prop="workStatus">
            <ElRadioGroup v-model="editData.workStatus">
              <ElRadioButton label="是" />
              <ElRadioButton label="否" />
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
            <el-cascader :options="injson" v-model="editData.industry" clearable filterable :show-all-levels="false">
            </el-cascader>
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
            <ElCascader :options="aria" v-model="editData.address" clearable filterable>
            </ElCascader>
          </ElFormItem>
          <ElFormItem label="工作地点" prop="workplace">
            <ElCascader :options="aria" v-model="editData.workplace" clearable filterable>
            </ElCascader>
          </ElFormItem>
        </ElForm>
        <div style="display: flex; justify-content: center">
          <el-button @click="handleClose">取消</el-button>
          <el-button v-btn-debounce type="primary" @click="handleEdit">提交</el-button>
        </div>
      </span>
    </el-dialog>

    <el-table :cell-style="{ height: '116px' }" height="800" ref="tableRef" :data="getPaginatedData" style="width: 100%"
      v-loading="tableLoading" @selection-change="handleSelectionChange" :row-key="row => row._id">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="stuname" label="名字" />
      <el-table-column prop="gender" label="性别" :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
        :filter-method="filterGender" />
      <el-table-column prop="stuclass" label="班级" width="110" :filters="classNum" :filter-method="filterClass"
        align="center">
        <template #default="scope">
          {{ scope.row.major[2] + '' + scope.row.stuclass + '班' }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="110" align="center" />
      <el-table-column prop="major[2]" label="专业" width="110" :filters="major" :filter-method="filterMajor" align="center"
        show-overflow-tooltip />
      <el-table-column prop="industry" label="行业" width="110" show-overflow-tooltip />
      <el-table-column prop="salary" sortable label="薪资(月)" width="100" />
      <el-table-column prop="leaveTime" label="毕业时间" width="99" :filters="leaveYear" :filter-method="filterYear" />
      <el-table-column prop="email" label="邮箱" width="155" align="center" />
      <el-table-column prop="workStatus" label="是否就业" width="99"
        :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]" :filter-method="filterWorkStatus"
        align="center">
        <template v-slot="scope">
          <span v-if="scope.row.workStatus === '是'">
            <el-icon style="color:#67C23A">
              <Check />
            </el-icon>
          </span>
          <span v-else>
            <el-icon style="color:#F56C6C">
              <Close />
            </el-icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="job[1]" label="岗位" :filters="job" :filter-method="filterJob" align="center" />
      <el-table-column prop="company" label="公司" align="center" />
      <el-table-column label="住址" prop="address" :filters="aria" :filter-method="filterAddress" show-overflow-tooltip />
      <el-table-column label="工作地点" width="99" prop="workplace" :filters="aria" :filter-method="filterWorkplace"
        show-overflow-tooltip />
      <el-table-column label="操作" v-slot="scope" width="158" align="center">
        <el-button v-btn-debounce type="primary" size="default" @click="dialogOpen(scope.row)">编辑</el-button>
        <el-button type="danger" size="default" @click="deleteClick(scope.row)">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination style="float: right" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :total="tableData.length"
      layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ref, reactive, computed } from "vue";
import { delStu, editStu, findStu } from "@/api/student";
import { nextTick } from "vue";
import { ElMessage, ElMessageBox, FormInstance, FormRules, TableInstance } from "element-plus";
import job from '@/assets/json/job.json';
import aria from '@/assets/json/aria.json';
import major from '@/assets/json/major.json';
import leaveYear from '@/assets/json/year.json';
import injson from "@/assets/json/industry.json";
import { validEmail, validPhone, validName } from "@/utils/validate";
import * as XLSX from "xlsx";

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

const ruleFormRef = ref<FormInstance>();
const tableRef = ref<TableInstance>()
let tableData = ref([]);
let dialogVisible = ref(false);
let tableLoading = ref(true);
let phoneFind = ref("");
let classNum = [{ text: '1', value: 1 }, { text: '2', value: 2 }, { text: '3', value: 3 }, { text: '4', value: 4 }, { text: '5', value: 5 }, { text: '6', value: 6 }, { text: '7', value: 7 }, { text: '8', value: 8 }, { text: '9', value: 9 }, { text: '10', value: 10 }, { text: '11', value: 11 }, { text: '12', value: 12 }];
let selectedStu = ref([])
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
  leaveTime: '',
  workStatus: '',
});
let currentPage = ref(1);
let pageSize = ref(10);

const exportExcel = () => {
  const dataFormat = tableData.value.map(item => ({
    ...item,
    job: Array.isArray(item.job) ? item.job.join(", ") : item.job,
    workplace: Array.isArray(item.workplace) ? item.workplace.join(", ") : item.workplace,
    company: Array.isArray(item.company) ? item.company.join(", ") : item.company,
    major: Array.isArray(item.major) ? item.major.join(" , ") : item.major
  })).map(item => {
    const { _id, __v, ...rest } = item
    return rest
  });
  const worksheet = XLSX.utils.json_to_sheet(dataFormat);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "学生信息");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });
  saveAsExcel(excelBuffer, "学生信息.xlsx");
};
const exportExcelSel = () => {
  const dataFormat = selectedStu.value.map(item => ({
    ...item,
    job: Array.isArray(item.job) ? item.job.join(", ") : item.job,
    workplace: Array.isArray(item.workplace) ? item.workplace.join(", ") : item.workplace,
    company: Array.isArray(item.company) ? item.company.join(", ") : item.company,
    major: Array.isArray(item.major) ? item.major.join(" , ") : item.major
  })).map(item => {
    const { _id, __v, ...rest } = item
    return rest
  });
  const worksheet = XLSX.utils.json_to_sheet(dataFormat);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "学生信息");
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });
  saveAsExcel(excelBuffer, "学生信息.xlsx");
};

const saveAsExcel = (buffer, fileName) => {
  const data = new Blob([buffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(data);
  link.download = fileName;
  link.click();
};

const handleSelectionChange = (val) => {
  selectedStu.value = val
}
// 当每页显示数量改变时触发
const handleSizeChange = (val) => {
  pageSize.value = val;
  currentPage.value = 1; // 重置当前页为第一页
};

// 当页码改变时触发
const handleCurrentChange = (val) => {
  currentPage.value = val;
};

const getPaginatedData = computed(() => {
  const offset = (currentPage.value - 1) * pageSize.value;
  return tableData.value.slice(offset, offset + pageSize.value);
});

const fetchData = async () => {
  tableLoading.value = true;
  try {
    // 请求学生数据并更新tableData数组
    // 注意：这里的findStu方法需要根据自己的实际情况实现，可以是从本地存储或其他方式获取数据
    tableData.value = await findStu();
  } catch (error) {
    ElMessage({ message: error });
  }
  tableLoading.value = false;
};

const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter()
}
async function handleFindPhone() {
  tableData.value = await findStu(phoneFind.value);
  tableRef.value!.clearFilter()

  console.log(phoneFind);
}

const filterClass = (value, row) => {
  if (row.stuclass.indexOf(value) > -1) {
  }
  return row.stuclass.indexOf(value) > -1
}
const filterWorkplace = (value, row) => {
  return row.workplace.indexOf(value) > -1
}
const filterAddress = (value, row) => {
  return row.address.indexOf(value) > -1
}
const filterYear = (value, row) => {
  return row.leaveTime.indexOf(value) > -1
}
const filterWorkStatus = (value, row) => {
  return row.workStatus.indexOf(value) > -1
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
  await fetchData()
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
  ruleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      res = await editStu(editData.value._id, editData.value);
      tableData.value = await findStu();
      tableLoading.value = false;
      dialogVisible.value = false;
      if (res._id) {
        ElMessage({ message: "修改成功", type: "success" });
      } else {
        ElMessage({ type: "error", message: res?.msg || "网络异常，请稍后重试" });
      }
    }
  })
};
const handleClose = () => {
  dialogVisible.value = false;
};
</script>
