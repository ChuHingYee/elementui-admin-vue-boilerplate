import Mock from 'mockjs';

export default {
  upload: config => {
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: {
          url: Mock.Random.image('200x100', Mock.Random.color())
        }
      };
    } else {
      return {
        success: flag,
        data: {
          message: '登陆失败'
        }
      };
    }
  }
};
