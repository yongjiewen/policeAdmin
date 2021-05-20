// 路由的全局守卫

// 权限控制逻辑
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
//引入nprogress 进度条插件
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 从cookie获取令牌
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// 配置进度条
NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] //排除的路径

router.beforeEach(async (to, from, next) => {
  // 进度条开始
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // 获取令牌判断用户是否登陆
  const hasToken = getToken()
  // 有令牌 表示已经登陆
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      //判断用户是否通过getInfo获取了权限角色
      // const hasGetUserInfo = store.getters.name
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          //注意:角色必须是一个对象数组!例如:['admin']或，['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')
          console.log();
          // 生成角色可访问路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)

          // hack方法来确保addrouds是完整的
          // set the replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          //删除令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有令牌
    if (whiteList.indexOf(to.path) !== -1) {
      //在免费登录白名单中，直接进入
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  //结束进度条
  NProgress.done()
})
