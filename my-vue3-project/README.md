## 简介

- **基于uni-app Vue3 Vite4 pinia2 TypeScript 基础框架** 


### 说明
- 框架完全基于Vue3 SFC `<script setup>` 写法,不支持Vue2;

## 特性

- **最新技术栈**：使用 Vue3/Vite4/pinia ,TypeScript 等前端前沿技术开发;
- **[Unocss](https://github.com/unocss/unocss)**: 原子化CSS, [iconify](https://github.com/iconify/iconify)图标
- **Eslint/Prettier**: 规范代码格式,统一编码;
- **路由拦截**: 基于uni.addInterceptor进行路由拦截;
- **请求拦截**: 核心使用 [luch-request](https://ext.dcloud.net.cn/plugin?id=392),支持请求和响应拦截等;
- **缓存加密**: 使用AES加密缓存,可设置区分在开发或生成环境中是否加密;

## 目录结构

```shell
.
├─ src
│   ├─assets # 静态资源目录
│   │
│   ├─components # 组件目录
│   │   ├─ BasicButton
│   │   │    ├─index.vue
│   │   │    └─prpos.ts
│   │   └─...
│   │ 
│   ├─enums # 枚举/常量
│   │   ├─ cacheEnum.ts
│   │   └─...
│   │ 
│   ├─pages # 页面
│   │   ├─ index
│   │   │    └─index.vue
│   │   └─...
│   │ 
│   ├─services # 接口相关
│   │   ├─ api # api  
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ model # 数据模型  
│   │        ├─authModel.d.ts
│   │        └─...
│   │ 
│   ├─settings # 设置
│   │   └─ encryptionSetting # 加密设置  
│   │
│   ├─state # 状态管理模式(pinia)
│   │   ├─ modules # 数据模块  
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ index.ts
│   │ 
│   ├─static # 静态公共文件
│   │   ├─ images # 图片  
│   │   │    ├─avatar.png
│   │   │    └─...
│   │   │
│   │   └─ ...
│   │   
│   ├─types # 类型文件
│   │   ├─ http.d.ts
│   │   └─ ...
│   │
│   └─utils # 工具类
│       ├─ cache # 缓存相关目录
│       ├─ http  # request相关目录
│       ├─ interceptors  # 拦截器相关目录
│       └─ ...
│
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ favicon.ico
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ tree.txt
├─ tsconfig.json
└─ vite.config.ts

```



## 预览

- H5

## 安装使用

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
# 其他端请查看 package.json script
pnpm dev:h5
```

- 打包

```bash
# 其他端请查看 package.json script
pnpm build:h5
```

- 更新依赖到最新（新手请忽略）

```bash
pnpm up
# 打开HBuilder X alpha桌面程序-->点击上面的帮助-->历次更新说明-->获取最新版本号（如：3.7.2.20230217-alpha）
npx @dcloudio/uvm 3.7.2.20230217-alpha
```
