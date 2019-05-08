import Mock from 'mockjs';

function initList () {
  let count = Mock.mock({
    'number|15-30': 30
  }).number;
  let now = new Date().getTime();
  let _list = [];
  for (let i = 0; i < count; i++) {
    let mockItem = Mock.mock({
      date: now,
      value: Mock.mock({
        'number|1-600': 600
      }).number
    });
    now = now + 86400000;
    _list.push(mockItem);
  }
  return _list;
}

function initTotal () {
  return {
    list: initList(),
    day: Mock.mock({
      'number|1-60': 60
    }).number,
    week: Mock.mock({
      'number|60-600': 600
    }).number,
    month: Mock.mock({
      'number|600-6000': 6000
    }).number,
    year: Mock.mock({
      'number|6000-66666': 66666
    }).number
  };
}

function initPie () {
  let count = Mock.mock({
    'number|3-8': 8
  }).number;
  let _list = [];
  for (let i = 0; i < count; i++) {
    let mockItem = Mock.mock({
      name: '@first',
      value: Mock.mock({
        'number|1-600': 600
      }).number
    });
    _list.push(mockItem);
  }
  return _list;
}

function initHomeMock () {
  const sale = {
    total: Mock.mock({
      'number|1-88888': 88888
    }).number,
    current: Mock.mock({
      'number|1-11111': 11111
    }).number,
    week: (Mock.Random.boolean() ? '' : '-') + Mock.mock({
      'number|1-100': 100
    }).number - 0,
    day: (Mock.Random.boolean() ? '' : '-') + Mock.mock({
      'number|1-100': 100
    }).number - 0
  };
  const access = {
    total: Mock.mock({
      'number|1-88888': 88888
    }).number,
    current: Mock.mock({
      'number|1-11111': 11111
    }).number,
    list: initList()
  };
  const pay = {
    total: Mock.mock({
      'number|1-88888': 88888
    }).number,
    change: Mock.mock({
      'number|1-100': 100
    }).number,
    list: initList()
  };
  const plan = {
    target: Mock.mock({
      'number|1-100': 100
    }).number,
    now: Mock.mock({
      'number|1-100': 100
    }).number,
    week: (Mock.Random.boolean() ? '' : '-') + Mock.mock({
      'number|1-100': 100
    }).number - 0,
    day: (Mock.Random.boolean() ? '' : '-') + Mock.mock({
      'number|1-100': 100
    }).number - 0
  };
  return {
    sale,
    access,
    pay,
    plan
  };
}

export default {
  detail: config => {
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: initTotal()
      };
    } else {
      return {
        success: flag,
        data: {
          message: '获取失败'
        }
      };
    }
  },
  pie: config => {
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: initPie()
      };
    } else {
      return {
        success: flag,
        data: {
          message: '获取失败'
        }
      };
    }
  },
  homeHeader: config => {
    const flag = Mock.Random.boolean(0.9, 0.4, true);
    if (flag) {
      return {
        success: flag,
        data: initHomeMock()
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
