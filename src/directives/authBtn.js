export default {
  inserted: function (el, binding, vnode) {
    const actionName = binding.arg;
    const roleAuths = vnode.context.$route.meta.auth;
    if (roleAuths.length) {
      let currentIndex = roleAuths.findIndex(auth => {
        return auth.uniName === actionName;
      });
      if (currentIndex === -1) {
        handleRemove(el);
      }
    } else {
      handleRemove(el);
    }
    function handleRemove (el) {
      el.parentNode.removeChild(el);
    }
  }
};
