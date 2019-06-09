import BaseLayout from '@/layout/Base';
import LoginLayout from '@/layout/Login';

/**
 * 公共路由
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
      hiddenChild: true,
      title: '登陆'
    },
    component: LoginLayout,
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/Login/Login/index')
      },
      {
        path: 'reg',
        component: () =>
          import(/* webpackChunkName: "login" */ '@/views/Login/Reg/index')
      }
    ]
  },
  {
    path: '/redirect',
    component: BaseLayout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path*',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Redirect/index')
      }
    ]
  }
];

/**
 * 角色路由
 */
export const asyncRouterMap = [
  {
    path: '/',
    redirect: 'home',
    name: 'Home',
    component: BaseLayout,
    meta: {
      hiddenChild: true,
      title: '首页',
      icon: 'icon-home',
      isRoute: false,
      showNav: false
    },
    children: [
      {
        path: '',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/Home/Admin/index.vue'),
        name: 'HomeAdmin',
        meta: {
          icon: 'icon-home',
          title: '首页',
          auth: [],
          root: 'Home',
          isRoute: true,
          showNav: false
        }
      }
    ]
  },
  {
    path: '/form',
    name: 'Form',
    component: BaseLayout,
    meta: {
      hiddenChild: false,
      title: '表单',
      icon: 'icon-form',
      isRoute: false,
      showNav: true
    },
    children: [
      {
        path: 'simple',
        component: () =>
          import(
            /* webpackChunkName: "form" */ '@/views/Form/Simple/index.vue'
          ),
        name: 'FormSimple',
        meta: {
          icon: 'icon-ad',
          title: '简单表单',
          auth: [],
          isRoute: true,
          noCache: true,
          showNav: true
        }
      }
    ]
  },
  {
    path: '/table',
    name: 'Table',
    component: BaseLayout,
    meta: {
      hiddenChild: false,
      title: '表格',
      icon: 'icon-table',
      isRoute: false,
      showNav: true
    },
    children: [
      {
        path: 'simple',
        component: () =>
          import(
            /* webpackChunkName: "products" */ '@/views/Table/Simple/index.vue'
          ),
        name: 'TableSimple',
        meta: {
          icon: 'icon-ad',
          title: '简单表格',
          auth: [],
          isRoute: true,
          showNav: true
        }
      }
    ]
  },
  {
    path: '/tree',
    name: 'Tree',
    component: BaseLayout,
    meta: {
      hiddenChild: false,
      title: '树形控件',
      icon: 'icon-tree',
      isRoute: false,
      showNav: true
    },
    children: [
      {
        path: 'relevance',
        component: () =>
          import(
            /* webpackChunkName: "tree" */ '@/views/Tree/Relevance/index.vue'
          ),
        name: 'TreeRelevance',
        meta: {
          icon: 'icon-ad',
          title: '树关联',
          auth: [],
          isRoute: true,
          showNav: true
        }
      },
      {
        path: 'router',
        component: () =>
          import(
            /* webpackChunkName: "tree" */ '@/views/Tree/Router/index.vue'
          ),
        name: 'TreeRouter',
        meta: {
          icon: 'icon-ad',
          title: '树路由',
          auth: [],
          isRoute: true,
          showNav: true
        }
      }
    ]
  },
  {
    path: '/article',
    name: 'Article',
    component: BaseLayout,
    meta: {
      hiddenChild: false,
      title: '文章',
      icon: 'icon-ue702article',
      isRoute: false,
      showNav: true
    },
    children: [
      {
        path: 'detail',
        component: () =>
          import(
            /* webpackChunkName: "acticle" */ '@/views/Article/Detail/index.vue'
          ),
        name: 'ArticleDetail',
        meta: {
          icon: 'icon-ad',
          title: '文章详情',
          auth: [],
          isRoute: true,
          showNav: true
        }
      }
    ]
  },
  {
    path: '/chart',
    name: 'Chart',
    component: BaseLayout,
    meta: {
      hiddenChild: false,
      title: '图表',
      icon: 'icon-areachart',
      isRoute: false,
      showNav: true
    },
    children: [
      {
        path: 'one',
        component: () =>
          import(/* webpackChunkName: "Chart" */ '@/views/Chart/One/index.vue'),
        name: 'ChartOne',
        meta: {
          icon: 'icon-ad',
          title: '图表1',
          auth: [],
          isRoute: true,
          showNav: true
        }
      },
      {
        path: 'two',
        component: () =>
          import(/* webpackChunkName: "Chart" */ '@/views/Chart/Two/index.vue'),
        name: 'ChartTwo',
        meta: {
          icon: 'icon-ad',
          title: '图表2',
          auth: [],
          isRoute: true,
          showNav: true
        }
      }
    ]
  },
  {
    path: '/mock',
    name: 'Mock',
    component: BaseLayout,
    meta: {
      hiddenChild: false,
      title: 'mock',
      icon: 'icon-shuju',
      isRoute: false,
      showNav: true
    },
    children: [
      {
        path: 'a',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockA',
        meta: {
          icon: 'icon-ad',
          title: 'MockA',
          auth: [],
          isRoute: true,
          showNav: true
        },
        children: [
          {
            path: 'a1',
            component: () =>
              import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
            name: 'MockA1',
            meta: {
              icon: 'icon-ad',
              title: 'MockAMockAMockAMockA',
              auth: [],
              isRoute: true,
              showNav: true
            }
          }
        ]
      }
    ]
  }
];

/**
 * 错误处理路由
 */
export const exceptionRoutersMap = [
  {
    path: '*',
    name: '403',
    redirect: '403',
    component: BaseLayout,
    meta: {
      hiddenChild: true,
      hidden: true
    },
    children: [
      {
        path: '403',
        component: () =>
          import(
            /* webpackChunkName: "home" */ '@/views/Exception/403/index.vue'
          ),
        name: '403Page',
        meta: {
          realPath: ''
        }
      }
    ]
  }
];
