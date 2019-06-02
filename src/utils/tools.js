import dayjs from 'dayjs';
/**
 * 数字千分位格式化
 * @param {number} num
 * @param {number} dot
 */
export function toThousands (num, dot = 2) {
  let _str = num.toFixed(dot);
  if (dot === 0) {
    _str += '.';
  }
  return _str
    .replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ',';
    })
    .replace(/\.$/, '');
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
 * 格式化富文本图片
 * @param {string} richtxt
 */
export function formatRichText (richtxt) {
  return richtxt.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match) {
    return match
      .replace(/style="max-width:100%;height:auto"/g, '')
      .replace(/<img/gi, '<img style="max-width:100%;height:auto"');
  });
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
 * @param {number} dataStr
 */
export function formatTime (dataStr) {
  return dayjs(dataStr).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 格式化时间 年月日
 * @param {number} dataStr
 */
export function formatDay (dataStr) {
  return dayjs(dataStr).format('YYYY-MM-DD');
}

/**
 * 格式化时间 年月
 * @param {number} dataStr
 */
export function formatMonth (dataStr) {
  return dayjs(dataStr).format('YYYY-MM');
}

/**
 * 格式化时间 日
 * @param {number} dataStr
 */
export function formatYear (dataStr) {
  return dayjs(dataStr).format('YYYY');
}
