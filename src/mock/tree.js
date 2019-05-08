import Mock from 'mockjs';

const listObj = {};

const picUrl = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

function addChild (id) {
  let count = Mock.mock({
    'number|1-10': 10
  }).number;
  if (id && listObj[id]) {
    count = listObj[id];
  }
  let _list = [];
  for (let i = 0; i < count; i++) {
    let mockItem = Mock.mock({
      _id: '@id',
      timestamp: Mock.Random.datetime('y-M-d H:m:s'),
      name: '@first',
      ava: picUrl,
      address: '@region',
      cname: '@cname',
      web: '@url',
      letter: '@pick(["a", "e", "i", "o", "u"])',
      childCount: Mock.mock({
        'number|1-10': 10
      }).number,
      child: []
    });
    listObj[mockItem._id] = mockItem.childCount;
    _list.push(mockItem);
  }
  return _list;
}
export default {
  tree: config => {
    let _id = '';
    if (config.body) {
      let _body = JSON.parse(config.body);
      _id = _body.id ? _body.id : '';
    }
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: {
          list: addChild(_id)
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
