import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/home',
    component: () => import('@/views/home/index'),
    hidden: true,
    children: [
      { path: '', component: () => import('@/views/home/dashboard') },
      { path: '/nopay', component: () => import('@/views/home/noPay') },
      { path: '/Paying', component: () => import('@/views/home/Paying') }
    ]
  },
  { path: '/pay', component: () => import('@/views/pay/pay'), hidden: true },
  { path: '/payPage', component: () => import('@/views/pay/payPage'), hidden: true },
  { path: '/login', component: () => import('@/views/login/login'), hidden: true },
  { path: '/register', component: () => import('@/views/login/register'), hidden: true },
  { path: '/index', component: () => import('@/views/index/index'), hidden: true },
  { path: '/goodsShow', component: () => import('@/views/goods/goodsShow'), hidden: true },
  { path: '/goodsCat', component: () => import('@/views/goods/goodsCat'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/goodsSearch', component: () => import('@/views/goods/goodsSearch'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'table',
        name: 'userTable',
        component: () => import('@/views/admin/user/table'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'userAdd',
        component: () => import('@/views/admin/user/add'),
        meta: { title: '添加用户', icon: 'table' }
      }
    ]
  },
  {
    path: '/goodscat',
    component: Layout,
    redirect: '/goodscat/table',
    name: 'goodscat',
    meta: { title: '类别管理', icon: 'table' },
    children: [
      {
        path: 'table',
        name: 'goodsCatTable',
        component: () => import('@/views/admin/goodsCat/table'),
        meta: { title: '类别列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'goodsCatAdd',
        component: () => import('@/views/admin/goodsCat/add'),
        meta: { title: '类别添加', icon: 'table' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/table',
    name: 'Goods',
    meta: { title: '商品管理', icon: 'goods' },
    children: [
      {
        path: 'table',
        name: 'goodsTable',
        component: () => import('@/views/admin/goods/table'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'goodsAdd',
        component: () => import('@/views/admin/goods/add'),
        meta: { title: '商品添加', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
// 动态加载页面
export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { role: ['admin'] }
  }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
