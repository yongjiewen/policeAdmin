import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*布局页面公共部分 */
import Layout from '@/layout'

/**
 * hidden: true                  是否显示在侧边栏中(默认false显示)
 * redirect: noRedirect          
 * name:'router-name'             
 * meta : {
    roles: ['admin','editor']   控制页面角色(可以设置多个角色)
    title: 'title'               标题
    icon: 'svg-name'/'el-icon-x' 图标
    breadcrumb: false            是否显示在面包屑（默认true显示）
    affix: true //快速导航不可关闭
  }
 */

/**
// 通用页面, 这里的配置不需要权限
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard', affix: true }
    }]
  },

  {
    path: '/police',
    component: Layout,
    redirect: '/police/index',
    name: 'Police',
    meta: { title: '预警信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Police',
        component: () => import('@/views/police/index'),
        meta: { title: '预警信息', icon: 'table' }
      },
    ]
  },
  // 404 
  { path: '*', redirect: '/404', hidden: true }
]

// 需要根据用户角色动态加载的路由
export const asyncRoutes = [
  // {
  //   path: '/analyze',
  //   component: Layout,
  //   redirect: '/goods/index',
  //   meta: {
  //     title: "数据分析",
  //     icon: 'el-icon-s-marketing',
  //     hidden: false
  //   },
  //   children: [
  //     {
  //       path: 'analyzeindex',
  //       component: () => import('@/views/table/index'),
  //       name: 'analyzeindex',
  //       meta: {
  //         title: "主控数据",
  //         icon: 'el-icon-tickets',
  //         hidden: false,
  //         roles: ['admin', 'jerry']
  //       }
  //     },
  //     {
  //       path: 'analyzemonitor',
  //       component: () => import('@/views/table/index'),
  //       name: 'analyzemonitor',
  //       meta: {
  //         title: "监控数据",
  //         icon: 'el-icon-tickets',
  //         hidden: false,
  //         roles: ['admin', 'jerry']
  //       }
  //     },
  //   ]
  // },
]


const createRouter = () => new Router({
  // mode: 'history', // 路由模式 hash(默认)  ‘history’需要服务端配合
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
