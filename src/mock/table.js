import Mock from 'mockjs';

const List = [];
const count = 100;

const baseContent =
  '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const picUrl =
  'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      _id: '@increment',
      timestamp: +Mock.Random.date('T'),
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      content_short: '我是测试数据',
      content: baseContent,
      picUrl,
      no: i
    })
  );
}

export default {
  getList: config => {
    console.log(JSON.parse(config.body));
    const { current, size } = JSON.parse(config.body);
    const endCount = current * size;
    const startCount = (current - 1) * size;
    let dataList = List.filter((item, index) => {
      return index > startCount && index <= endCount;
    });
    const flag = Mock.Random.boolean();
    console.log(dataList);
    if (flag) {
      return {
        success: true,
        data: {
          pageIndex: current,
          totalCount: List.length,
          data: dataList
        }
      };
    } else {
      return {
        success: true,
        data: {
          pageIndex: current,
          totalCount: List.length,
          data: dataList
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
  },
  select: config => {
    const flag = Mock.Random.boolean();
    if (flag) {
      return {
        success: flag,
        data: {
          list: [
            {
              label: 'Option 1',
              value: 1
            },
            {
              label: 'Option 2',
              value: 2
            },
            {
              label: 'Option 3',
              value: 3
            }
          ]
        }
      };
    } else {
      return {
        success: flag,
        data: {
          message: 'error'
        }
      };
    }
  }
};
