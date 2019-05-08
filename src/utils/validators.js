export const checkNumber = (rule, value, callback) => {
  if (value) {
    value = value + '';
    let _value = value.replace(/(^\s*)|(\s*$)/g, '');
    if (_value) {
      _value = _value.replace(/,/g, '') - 0;
    }
    if (!/(^[1-9]\d*(\.\d{1,2})?$)|(^[0]{1}(\.\d{1,2})?$)/.test(_value)) {
      callback(new Error('请输入数字值'));
    } else {
      callback();
    }
  } else {
    callback(new Error('请输入数字值'));
  }
};

export const checkEmpty = (rule, value, callback) => {
  let _value;
  if (value) {
    _value = value.replace(/(^\s*)|(\s*$)/g, '');
    if (!_value) {
      callback(new Error('请输入内容'));
      return;
    }
  } else {
    callback(new Error('请输入内容'));
    return;
  }
  callback();
};

export const checkPWNumber = (rule, value, callback) => {
  if (value) {
    value = (value + '').replace(/(^\s*)|(\s*$)/g, '');
    if (!/^\d{6}$/.test(value)) {
      callback(new Error('请输入数字值'));
    } else {
      callback();
    }
  } else {
    callback(new Error('请输入数字值'));
  }
};

export const checkLoginNumber = (rule, value, callback) => {
  if (value) {
    value = (value + '').replace(/(^\s*)|(\s*$)/g, '');
    if (!/^[a-zA-Z0-9]{6,19}$/.test(value)) {
      callback(new Error('请输入6-19数字或字母'));
    } else {
      callback();
    }
  } else {
    callback(new Error('请输入数字或字母'));
  }
};

export const checkNo = (rule, value, callback) => {
  if (value) {
    value = (value + '').replace(/(^\s*)|(\s*$)/g, '');
    if (!/^[a-zA-Z0-9]{1,5}$/.test(value)) {
      callback(new Error('请输入1-5数字或字母'));
    } else {
      callback();
    }
  } else {
    callback(new Error('请输入数字或字母'));
  }
};
export const checkNick = (rule, value, callback) => {
  if (value) {
    value = (value + '').replace(/(^\s*)|(\s*$)/g, '');
    if (!/^[a-zA-Z0-9]{1,16}$/.test(value)) {
      callback(new Error('请输入1-16数字或字母'));
    } else {
      callback();
    }
  } else {
    callback(new Error('请输入数字或字母'));
  }
};

export const checkRealName = (rule, value, callback) => {
  if (value) {
    if (value.length < 2 || value.length > 25) {
      callback(new Error('真实名字长度为2-25位'));
    }
    if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/g.test(value)) {
      callback(new Error('真实姓名只能输入中文或英文或数字'));
    }
    callback();
  } else {
    callback(new Error('请输入真实姓名'));
  }
};

export const check6Num = (rule, value, callback) => {
  if (value) {
    if (!/^\d{6}$/g.test(value)) {
      callback(new Error('密码格式不对，请重新输入密码(密码为六位数字)'));
    }
    callback();
  } else {
    callback(new Error('请输入密码(密码为六位数字)'));
  }
};
