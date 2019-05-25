<template>
  <aside class="aside" :width="asideWidth">
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
  background: #1a355b;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  &-scroll {
    max-height: calc(100vh - 47px);
  }
  &-logo {
    height: 30px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  .el-scrollbar__bar.is-horizontal {
    display: none !important;
  }
}
</style>
