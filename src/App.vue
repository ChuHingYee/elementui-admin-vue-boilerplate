<template>
  <div @click="handleCloseMenu" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getUserAgent, getScrollBarWidth } from '@/utils/tools';
import debounce from 'lodash.debounce';
export default {
  name: 'App',
  data () {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(['isTabsMenuShow', 'isAutocompleteShow'])
  },
  watch: {},
  methods: {
    ...mapActions([
      'SetTabsMenuType',
      'SetScrollBarWitdh',
      'SetSiderType',
      'GetClientAttr',
      'SetIsAutocompleteShow'
    ]),
    handleCloseMenu () {
      if (this.isTabsMenuShow) {
        this.SetTabsMenuType(false);
      }
      if (this.isAutocompleteShow) {
        this.SetIsAutocompleteShow(false);
      }
    }
  },
  mounted () {
    // 获取浏览器滚动条宽度
    const userAgentName = getUserAgent();
    let scrollBarWidth = this.$ls.get(userAgentName);
    if (!scrollBarWidth) {
      scrollBarWidth = getScrollBarWidth();
      this.$ls.set(userAgentName, scrollBarWidth);
      this.SetScrollBarWitdh(scrollBarWidth);
    } else {
      this.SetScrollBarWitdh(scrollBarWidth);
    }
    this.GetClientAttr();
    window.addEventListener('resize', debounce(this.GetClientAttr, 300));
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  min-height: 100vh;
  background: #1a355b;
}
</style>
