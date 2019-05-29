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
      { path: '/Paying', component: () => import('@/views/home/Paying') },
      { path: '/payCancel', component: () => import('@/views/home/payCancel') },
      { path: '/canceled', component: () => import('@/views/home/canceled') },
      { path: '/address', component: () => import('@/views/home/address') },
      { path: '/person', component: () => import('@/views/home/person') },
      { path: '/express', component: () => import('@/views/home/express') }
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
    path: '/notify',
    component: Layout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '用户中心', icon: 'table' }
      }
    ]
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
    path: '/order',
    component: Layout,
    redirect: '/order/paying',
    name: 'Order',
    meta: { title: '订单管理', icon: 'goods' },
    children: [
      {
        path: 'paying',
        name: 'paying',
        component: () => import('@/views/admin/order/paying'),
        meta: { title: '待处理订单', icon: 'table' }
      },
      {
        path: 'express',
        name: 'express',
        component: () => import('@/views/admin/order/express'),
        meta: { title: '已发货订单', icon: 'table' }
      },
      {
        path: 'success',
        name: 'success',
        component: () => import('@/views/admin/order/success'),
        meta: { title: '已完成订单', icon: 'tree' }
      },
      {
        path: 'nopay',
        name: 'nopay',
        component: () => import('@/views/admin/order/nopay'),
        meta: { title: '未支付订单', icon: 'table' }
      },
      {
        path: 'cancel',
        name: 'cancel',
        component: () => import('@/views/admin/order/cancel'),
        meta: { title: '已取消订单', icon: 'tree' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/comment',
    name: 'Comment',
    meta: { title: '评论管理', icon: 'goods' },
    children: [
      {
        path: 'comment',
        name: 'comment',
        component: () => import('@/views/admin/comment/comment'),
        meta: { title: '评论审核', icon: 'table' }
      }
    ]
  },
  {
    path: 'solr',
    component: Layout,
    children: [
      {
        path: '/solr',
        name: 'solr',
        component: () => import('@/views/admin/solr'),
        meta: { title: '同步索引', icon: 'link' }
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/Melankton',
        meta: { title: 'Github', icon: 'link' }
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
