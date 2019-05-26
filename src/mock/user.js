import Mock from 'mockjs';

const routes = [
  {
    name: '首页',
    uniName: 'Home',
    type: 0,
    children: [
      {
        name: '管理员首页',
        uniName: 'HomeAdmin',
        type: 0
      }
    ]
  },
  {
    name: '表单',
    uniName: 'Form',
    type: 0,
    children: [
      {
        name: '简单表单',
        uniName: 'FormSimple',
        type: 0
      }
    ]
  },
  {
    name: '树形控件',
    uniName: 'Tree',
    type: 0,
    children: [
      {
        name: '树关联',
        uniName: 'TreeRelevance',
        type: 0
      },
      {
        name: '路由树',
        uniName: 'TreeRouter',
        type: 0
      }
    ]
  },
  {
    name: '表格',
    uniName: 'Table',
    type: 0,
    children: [
      {
        name: '简单表格',
        uniName: 'TableSimple',
        type: 0,
        children: [
          {
            name: '测试按钮1',
            uniName: 'TableSimpleTest1',
            type: 1
          },
          {
            name: '测试按钮2',
            uniName: 'TableSimpleTest2',
            type: 1
          },
          {
            name: '测试按钮3',
            uniName: 'TableSimpleTest3',
            type: 1
          }
        ]
      }
    ]
  },
  {
    name: 'mock',
    uniName: 'Mock',
    type: 0,
    children: [
      {
        name: 'A',
        uniName: 'MockA',
        type: 0
      },
      {
        name: 'B',
        uniName: 'MockB',
        type: 0
      },
      {
        name: 'C',
        uniName: 'MockC',
        type: 0
      },
      {
        name: 'D',
        uniName: 'MockD',
        type: 0
      },
      {
        name: 'E',
        uniName: 'MockE',
        type: 0
      },
      {
        name: 'F',
        uniName: 'MockF',
        type: 0
      },
      {
        name: 'G',
        uniName: 'MockG',
        type: 0
      },
      {
        name: 'H',
        uniName: 'MockH',
        type: 0
      },
      {
        name: 'I',
        uniName: 'MockI',
        type: 0
      },
      {
        name: 'J',
        uniName: 'MockJ',
        type: 0
      },
      {
        name: 'K',
        uniName: 'MockK',
        type: 0
      },
      {
        name: 'L',
        uniName: 'MockL',
        type: 0
      },
      {
        name: 'M',
        uniName: 'MockM',
        type: 0
      },
      {
        name: 'N',
        uniName: 'MockN',
        type: 0
      },
      {
        name: 'O',
        uniName: 'MockO',
        type: 0
      },
      {
        name: 'P',
        uniName: 'MockP',
        type: 0
      },
      {
        name: 'Q',
        uniName: 'MockQ',
        type: 0
      },
      {
        name: 'R',
        uniName: 'MockR',
        type: 0
      },
      {
        name: 'S',
        uniName: 'MockS',
        type: 0
      },
      {
        name: 'T',
        uniName: 'MockT',
        type: 0
      },
      {
        name: 'U',
        uniName: 'MockU',
        type: 0
      },
      {
        name: 'V',
        uniName: 'MockV',
        type: 0
      },
      {
        name: 'W',
        uniName: 'MockW',
        type: 0
      },
      {
        name: 'X',
        uniName: 'MockX',
        type: 0
      },
      {
        name: 'Y',
        uniName: 'MockY',
        type: 0
      },
      {
        name: 'Z',
        uniName: 'MockZ',
        type: 0
      }
    ]
  },
  {
    name: '文章',
    uniName: 'Article',
    type: 0,
    children: [
      {
        name: '文章详情',
        uniName: 'ArticleDetail',
        type: 0
      }
    ]
  },
  {
    name: '图表',
    uniName: 'Chart',
    type: 0,
    children: [
      {
        name: '图表1',
        uniName: 'ChartOne',
        type: 0
      },
      {
        name: '图表2',
        uniName: 'ChartTwo',
        type: 0
      }
    ]
  }
];
const color = Mock.Random.color();
const user = Mock.mock({
  _id: '@increment',
  expireTime: new Date(),
  name: '@first',
  roleID: 'mockRoleId',
  token: '@increment',
  ava: Mock.Random.image('200x100', color)
});
export default {
  reg: config => {
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        message: '注册成功'
      };
    } else {
      return {
        success: flag,
        data: {
          message: '注册失败'
        }
      };
    }
  },
  login: config => {
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: user
      };
    } else {
      return {
        success: flag,
        data: {
          message: '登陆失败'
        }
      };
    }
  },
  logout: config => {
    const flag = Mock.Random.boolean();
    return {
      success: flag,
      data: {
        message: flag ? '退出成功' : '退出失败'
      }
    };
  },
  routes: config => {
    console.log(config.body);
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: {
          routes
        }
      };
    } else {
      return {
        success: flag,
        data: {
          message: '获取失败'
        }
      };
    }
  }
};
