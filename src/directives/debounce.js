import debounce from 'lodash.debounce';
export default {
  inserted: function (el, binding, vnode) {
    el.addEventListener(
      'click',
      debounce(() => {
        binding.value();
      }, binding.arg)
    );
  }
};
