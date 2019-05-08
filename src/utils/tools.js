import dayjs from 'dayjs';
export function toThousands (num, dot) {
  let _dot = (dot || dot === 0) && dot < 20 ? dot : 2;
  let _s = '';
  _s = parseFloat((num + '').replace(/[^\d.-]/g, '')).toFixed(_dot) + '';
  let l = _s
    .split('.')[0]
    .split('')
    .reverse();
  let r = _s.split('.')[1];
  r = r == null ? '' : '.' + r;
  let t = '';
  if (l[l.length - 1] === '-') {
    // 负数不需要分隔号,

    for (let i = 0; i < l.length; i++) {
      if (l[i] === '-') {
        t += l[i] + '';
        continue;
      }
      // 不是数组的倒数第二个元素才加"," ["0", "4", "5", "-"]
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length - 1 ? ',' : '');

      // i + 1 != l.length会变成-,540.00,因为在5时元素位置2+1为3非数组长度
      // t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
    }
  } else {
    for (let k = 0; k < l.length; k++) {
      t += l[k] + ((k + 1) % 3 === 0 && k + 1 !== l.length ? ',' : '');
    }
  }
  return (
    t
      .split('')
      .reverse()
      .join('') + r
  );
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, true);
  event.eventType = 'message';
  window.dispatchEvent(event);
}

/**
 *
 *格式化富文本图片
 *
 */
export function formatRichText (richtxt) {
  return richtxt.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match) {
    return match
      .replace(/style="max-width:100%;height:auto"/g, '')
      .replace(/<img/gi, '<img style="max-width:100%;height:auto"');
  });
}

/**
 *获取浏览器名称
 *
 */
export function getUserAgent () {
  const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
  const isOpera = userAgent.indexOf('Opera') > -1;
  // 判断是否Opera浏览器
  if (isOpera) {
    return 'USERAGENT_OPERA';
  }
  // 判断是否Firefox浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'USERAGENT_FF';
  }
  // 判断是否chorme浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'USERAGENT_CHROME';
  }
  // 判断是否Safari浏览器
  if (userAgent.indexOf('Safari') > -1) {
    return 'USERAGENT_SAFARI';
  }
  // 判断是否IE浏览器
  if (
    userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 &&
    !isOpera
  ) {
    return 'USERAGENT_IE';
  }
  // 判断是否Edge浏览器
  if (userAgent.indexOf('Trident') > -1) {
    return 'USERAGENT_EDGE';
  }
}

/**
 *获取滚动滚动条宽度
 *
 * @export
 * @returns
 */
export function getScrollBarWidth () {
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    ' width: 100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;'
  );
  document.body.appendChild(scrollDiv);
  // Get the scrollbar width
  const _scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  // Delete the DIV
  document.body.removeChild(scrollDiv);
  return _scrollbarWidth;
}

/**
 *ant-design-vue-pro
 *
 * @export
 * @returns
 */
export function timeFix () {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好';
}
/**
 * 格式化时间 年月日时分秒
 * @param {*} dataStr
 * @param {*} pattern
 */
export function formatTime (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(dataStr).format(pattern);
}

/**
 * 格式化时间 年月日
 * @param {*} dataStr
 * @param {*} pattern
 */
export function formatDay (dataStr, pattern = 'YYYY-MM-DD') {
  return dayjs(dataStr).format(pattern);
}

/**
 * 格式化时间 年月
 * @param {*} dataStr
 * @param {*} pattern
 */
export function formatMonth (dataStr, pattern = 'YYYY-MM') {
  return dayjs(dataStr).format(pattern);
}

/**
 * 格式化时间 日
 * @param {*} dataStr
 * @param {*} pattern
 */
export function formatYear (dataStr, pattern = 'YYYY') {
  return dayjs(dataStr).format(pattern);
}
