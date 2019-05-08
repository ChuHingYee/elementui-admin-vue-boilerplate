import Mock from 'mockjs';

const List = [
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
    name: '用户',
    uniName: 'Users',
    type: 0,
    children: [
      {
        name: '用户等级',
        uniName: 'UsersLevels',
        type: 0,
        children: [
          {
            name: '新增',
            uniName: 'UsersLevelsAdd',
            type: 1
          },
          {
            name: '删除',
            uniName: 'UsersLevelsDel',
            type: 1
          }
        ]
      },
      {
        name: '用户列表',
        uniName: 'UsersList',
        type: 0,
        children: [
          {
            name: '新增',
            uniName: 'UsersListAdd',
            type: 1
          },
          {
            name: '删除',
            uniName: 'UsersListDel',
            type: 1
          }
        ]
      }
    ]
  },
  {
    name: '产品',
    uniName: 'Products',
    type: 0,
    children: [
      {
        name: '产品列表',
        uniName: 'ProductsList',
        type: 0,
        children: [
          {
            name: '新增',
            uniName: 'ProductsListAdd',
            type: 1
          }
        ]
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
        type: 0,
        children: []
      }
    ]
  }
];

export default {
  getTree: config => {
    const flag = Mock.Random.boolean();
    if (flag) {
      return {
        success: true,
        data: {
          data: List
        }
      };
    } else {
      console.log(List);
      return {
        success: true,
        data: {
          data: List
        }
      };
    }
  },
  edit: config => {
    const flag = Mock.Random.boolean();
    console.log(flag, 'flag');
    return {
      success: flag,
      data: {
        message: flag ? '修改成功' : '修改失败'
      }
    };
  },
  del: config => {
    const flag = Mock.Random.boolean();
    console.log(flag, 'flag');
    return {
      success: flag,
      data: {
        message: flag ? '删除成功' : '删除失败'
      }
    };
  }
};
