import BaseLayout from '@/components/PageLayout/layout';

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
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/Login/Login/index.vue')
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
      isRoute: false
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
          isRoute: true
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
      isRoute: false
    },
    children: [
      {
        path: 'simple',
        component: () =>
          import(/* webpackChunkName: "form" */ '@/views/Form/Simple/index.vue'),
        name: 'FormSimple',
        meta: {
          icon: 'icon-ad',
          title: '简单表单',
          auth: [],
          isRoute: true,
          noCache: true
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
      isRoute: false
    },
    children: [
      {
        path: 'simple',
        component: () =>
          import(/* webpackChunkName: "products" */ '@/views/Table/Simple/index.vue'),
        name: 'TableSimple',
        meta: {
          icon: 'icon-ad',
          title: '简单表格',
          auth: [],
          isRoute: true
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
      isRoute: false
    },
    children: [
      {
        path: 'relevance',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/Tree/Relevance/index.vue'),
        name: 'TreeRelevance',
        meta: {
          icon: 'icon-ad',
          title: '树关联',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'router',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/Tree/Router/index.vue'),
        name: 'TreeRouter',
        meta: {
          icon: 'icon-ad',
          title: '树路由',
          auth: [],
          isRoute: true
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
      isRoute: false
    },
    children: [
      {
        path: 'detail',
        component: () =>
          import(/* webpackChunkName: "acticle" */ '@/views/Article/Detail/index.vue'),
        name: 'ArticleDetail',
        meta: {
          icon: 'icon-ad',
          title: '文章详情',
          auth: [],
          isRoute: true
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
      isRoute: false
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
          isRoute: true
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
      isRoute: false
    },
    children: [
      {
        path: 'a',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockA',
        meta: {
          icon: 'icon-ad',
          title: 'MockAMockAMockAMockA',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'b',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockB',
        meta: {
          icon: 'icon-ad',
          title: 'MockBMockBMockBMockBMockBMockBMockB',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'c',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockC',
        meta: {
          icon: 'icon-ad',
          title: 'MockCMockCMockCMockCMockCMockCMockC',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'd',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockD',
        meta: {
          icon: 'icon-ad',
          title: 'MockDMockDMockDMockDMockDMockD',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'e',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockE',
        meta: {
          icon: 'icon-ad',
          title: 'MockEMockEMockEMockEMockEMockE',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'f',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockF',
        meta: {
          icon: 'icon-ad',
          title: 'Mockf',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'g',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockG',
        meta: {
          icon: 'icon-ad',
          title: 'Mockg',
          auth: [],
          root: 'Mock',
          isRoute: true
        }
      },
      {
        path: 'h',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockH',
        meta: {
          icon: 'icon-ad',
          title: 'Mockh',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'i',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockI',
        meta: {
          icon: 'icon-ad',
          title: 'Mocki',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'j',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockJ',
        meta: {
          icon: 'icon-ad',
          title: 'Mockj',
          auth: [],
          root: 'Mock',
          isRoute: true
        }
      },
      {
        path: 'k',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockK',
        meta: {
          icon: 'icon-ad',
          title: 'Mockk',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'l',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockL',
        meta: {
          icon: 'icon-ad',
          title: 'Mockl',
          auth: [],
          root: 'Mock',
          isRoute: true
        }
      },
      {
        path: 'm',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockM',
        meta: {
          icon: 'icon-ad',
          title: 'Mockm',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'n',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockN',
        meta: {
          icon: 'icon-ad',
          title: 'Mockn',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'o',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockO',
        meta: {
          icon: 'icon-ad',
          title: 'Mocko',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'p',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockP',
        meta: {
          icon: 'icon-ad',
          title: 'Mockp',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'q',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockQ',
        meta: {
          icon: 'icon-ad',
          title: 'Mockq',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'r',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockR',
        meta: {
          icon: 'icon-ad',
          title: 'Mockr',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 's',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockS',
        meta: {
          icon: 'icon-ad',
          title: 'Mocks',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 't',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockT',
        meta: {
          icon: 'icon-ad',
          title: 'Mockt',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'u',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockU',
        meta: {
          icon: 'icon-ad',
          title: 'Mocku',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'v',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockV',
        meta: {
          icon: 'icon-ad',
          title: 'Mockv',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'w',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockW',
        meta: {
          icon: 'icon-ad',
          title: 'Mockw',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'x',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockX',
        meta: {
          icon: 'icon-ad',
          title: 'Mockx',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'y',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockY',
        meta: {
          icon: 'icon-ad',
          title: 'MockY',
          auth: [],
          isRoute: true
        }
      },
      {
        path: 'z',
        component: () =>
          import(/* webpackChunkName: "mock" */ '@/views/Mock/A/index.vue'),
        name: 'MockZ',
        meta: {
          icon: 'icon-ad',
          title: 'MockZ',
          auth: [],
          isRoute: true
        }
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
          import(/* webpackChunkName: "home" */ '@/views/Exception/403/index.vue'),
        name: '403Page',
        meta: {}
      }
    ]
  }
];
