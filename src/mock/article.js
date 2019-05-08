import Mock from 'mockjs';

const List = [];
const count = 100;

const baseContent =
  '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const picUrl = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3';
const videoUrl = 'http://vjs.zencdn.net/v/oceans.mp4';

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
      videoUrl,
      no: i
    })
  );
}

export default {
  detail: config => {
    const flag = Mock.Random.boolean();
    // console.log(flag, 'flag')
    // return {
    //   success: flag,
    //   data: {
    //     detail: {
    //       _id: '@increment',
    //       timestamp: +Mock.Random.date('T'),
    //       author: '@first',
    //       reviewer: '@first',
    //       title: '@title(5, 10)',
    //       content_short: '我是测试数据',
    //       content: baseContent,
    //       picUrl,
    //       videoUrl
    //     }
    //   }
    // }
    return {
      success: true,
      data: {
        detail: {
          _id: '@increment',
          timestamp: +Mock.Random.date('T'),
          author: '@first',
          reviewer: '@first',
          title: '@title(5, 10)',
          content_short: '我是测试数据',
          content: baseContent,
          picUrl,
          videoUrl: flag ? videoUrl : '123456',
          poster:
            'https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943'
        }
      }
    };
  }
};
