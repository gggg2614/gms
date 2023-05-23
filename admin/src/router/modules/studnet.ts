export default {
  path: "/student",
  redirect: "/student/List",
  meta: {
    icon: "twemoji:billed-cap",
    title: "毕业生管理",
    // showLink: false,
    rank: 1,
  },
  children: [
    {
      path: "/student/add",
      name: "studentAdd",
      showParent: true,
      component: () => import("@/views/student/studentAdd.vue"),
      meta: {
        title: "新增毕业生"
      }
    },
    {
      path: "/student/list",
      name: "studentList",
      showParent: true,
      component: () => import("@/views/student/studentList.vue"),
      meta: {
        title: "毕业生列表"
      }
    },
    {
      path: "/student/chart",
      name: "studentChart",
      showParent: true,
      component: () => import("@/views/student/studentChart.vue"),
      meta: {
        title: "毕业生信息分析"
      }
    },
  ]
} as unknown as RouteConfigsTable;
