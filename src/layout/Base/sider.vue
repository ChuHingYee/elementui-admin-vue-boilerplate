<template>
  <aside class="aside" :style="{width:asideWidth}">
    <div class="aside-logo"/>
    <el-scrollbar wrap-class="aside-scroll">
      <SubMenu :menus="roleRouters" :isSiderCollapsed="isSiderCollapsed"></SubMenu>
    </el-scrollbar>
  </aside>
</template>

<script>
import SubMenu from './siderMenu.js';
import { mapGetters } from 'vuex';
export default {
  name: 'BaseLayoutSider',
  components: {
    SubMenu
  },
  computed: {
    ...mapGetters(['isSiderCollapsed', 'roleRouters']),
    asideWidth () {
      return this.isSiderCollapsed ? '64px' : '200px';
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.aside {
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1888;
  background: #001529;
  @include transition-common();
  &-logo {
    height: 30px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  /deep/.el-scrollbar__wrap {
    max-height: calc(100vh - 62px);
  }
  /deep/.el-scrollbar__bar.is-horizontal {
    display: none !important;
  }
  /deep/.el-menu {
    border-right: 0;
    .iconfont {
      margin-right: 8px;
      color: #fff;
    }
  }
}
</style>
