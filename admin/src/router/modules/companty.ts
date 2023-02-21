export default {
    path: "/company",
    redirect: "/company/List",
    meta: {
      icon: "twemoji:b-button-blood-type",
      title: "公司管理",
      // showLink: false,
      rank: 2
    },
    children: [
      {
        path: "/company/add",
        name: "companyAdd",
        showParent:true,
        component: () => import("@/views/company/companyAdd.vue"),
        meta: {
          title: "新增公司"
        }
      },
      {
        path: "/company/list",
        name: "companyList",
        showParent:true,
        component: () => import("@/views/company/companyList.vue"),
        meta: {
          title: "公司列表"
        }
      },
      
    ]
  } as RouteConfigsTable;
  