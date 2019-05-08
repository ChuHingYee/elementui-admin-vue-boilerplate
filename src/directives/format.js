export default {
  bind: function (el, binding, vNode) {
    const len = binding.arg ? binding.arg : 0;
    const element = el.getElementsByTagName('input')[0];
    element.handleKeyup = () => {
      element.value = element.value.replace(/[^0-9|.]/gi, '');
    };
    element.handleBlur = () => {
      let value = Number(element.value).toFixed(len);
      if (isNaN(value)) {
        vNode.data.model.callback(0);
      } else {
        vNode.data.model.callback(value);
        element.value = value;
      }
    };
    element.addEventListener('keyup', element.handleKeyup);
    element.addEventListener('blur', element.handleBlur);
  },
  unbind: function (el) {
    const element = el.getElementsByTagName('input')[0];
    element.removeEventListener('keyup', element.handleKeyup);
    element.removeEventListener('blur', element.handleBlur);
  }
};
