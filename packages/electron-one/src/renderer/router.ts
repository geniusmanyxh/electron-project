//src/renderer/router.ts
import * as VueRouter from "vue-router";
//路由规则描述数组
const routes = [
  { path: "/", redirect: "/WindowMain/Chat" },
  {
    path: "/WindowMain",
    component: () => import("./Windows/WindowMain.vue"),
    children: [
      {
        path: "Chat",
        component: () => import("./Windows/WindowMain/Chat.vue"),
      },
      {
        path: "Contact",
        component: () => import("./Windows/WindowMain/Contact.vue"),
      },
      {
        path: "Collection",
        component: () => import("./Windows/WindowMain/Collection.vue"),
      },
    ],
  },
  {
    path: "/WindowSetting",
    component: () => import("./Windows/WindowSetting.vue"),
    children: [
      {
        path: "AccountSetting",
        component: () => import("./Windows/WindowSetting/AccountSetting.vue"),
      },
    ],
  },
  {
    path: "/WindowUserInfo",
    component: () => import("./Windows/WindowUserInfo.vue"),
  },
];
//导出路由对象
export let router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});
