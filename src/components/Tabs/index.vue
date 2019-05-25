<template>
  <div class="tabs">
    <el-tooltip
      effect="light"
      :content="route.routerName"
      placement="bottom"
      :open-delay="1500"
      v-for="route in visitedRoutes"
      :key="route.routerName"
    >
      <router-link
        class="tabs-item"
        tag="div"
        :class="currentRoute.name===route.name?'tabs-active':''"
        :to="{name:route.name,query:route.query}"
        @contextmenu.prevent.native="handleOpenMenu(route,$event)"
      >
        <span class="tabs-item__txt">{{route.routerName }}</span>
        <i class="el-icon-close tabs-item__icon" @click.stop="handleCloseTab(route)"></i>
      </router-link>
    </el-tooltip>
    <ul class="contextmenu" v-show="isTabsMenuShow" :style="menuStyles">
      <li @click.stop="handleCloseTab(currentMenuRoute)">关闭</li>
      <li @click.stop="handleCloseNextRoutes(currentMenuRoute)">关闭右侧</li>
      <li @click.stop="handleCloseOtherRoutes(currentMenuRoute)">关闭其他</li>
      <li @click.stop="handleDelAllRoutes">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'CustomTabs',
  data () {
    return {
      left: 0,
      tabsWidth: 0,
      totalWitdh: 0,
      scrollCount: 0,
      maxCount: 0,
      menuInfo: {
        x: 0,
        y: 0
      },
      currentRoute: {},
      currentMenuRoute: {},
      isOver: false
    };
  },
  components: {},
  props: {},
  watch: {
    visitedRoutes: {
      immediate: true,
      handler: function (val) {}
    },
    $route: {
      handler: function () {
        if (this.$route.name) {
          this.AddVisitedRoute(this.$route);
        }
        this.currentRoute = this.$route;
      },
      immediate: true
    },
    isOver (newVal) {
      if (newVal) {
        this.tabsWidth = this.tabsWidth - 60;
      } else {
        this.tabsWidth = this.tabsWidth + 60;
      }
    }
  },
  computed: {
    ...mapGetters([
      'isTabsMenuShow',
      'visitedRoutes',
      'currentTabIndex',
      'cacheRouters',
      'resizeFlag'
    ]),
    menuStyles () {
      return { left: `${this.menuInfo.x}px`, top: `${this.menuInfo.y}px` };
    }
  },
  methods: {
    ...mapActions([
      'SetTabsMenuType',
      'AddVisitedRoute',
      'CloseVisitedRoutes',
      'CloseOthersRoutes',
      'CloseAllRoutes',
      'CloseNextRoutes',
      'UpdateTabWidth'
    ]),
    handleOpenMenu (item, e) {
      this.SetTabsMenuType(true);
      this.currentMenuRoute = item;
      this.menuInfo = {
        x: e.clientX,
        y: e.clientY
      };
    },
    handleCloseTab (route) {
      const currentRouteName = this.$route.name;
      this.handeleIsTabsMenuShow();
      if (route.routerName === '首页' && this.visitedRoutes.length === 1) {
        return;
      }
      this.CloseVisitedRoutes(route);
      if (route.name === currentRouteName) {
        if (this.currentTabIndex === 0 && this.visitedRoutes.length === 0) {
          this.$router.push({
            path: '/'
          });
        } else {
          const nameIndex =
            this.currentTabIndex !== 0 ? this.currentTabIndex - 1 : 0;
          // 判断是否第一个，是的话当前路由应为0
          this.$router.push({
            name: this.visitedRoutes[nameIndex].name
          });
        }
      }
    },
    handleCloseOtherRoutes (route) {
      this.handeleIsTabsMenuShow();
      this.CloseOthersRoutes(route);
      if (route.name !== this.$route.name) {
        this.$router.push({
          name: route.name
        });
      }
    },
    handleCloseNextRoutes (route) {
      this.handeleIsTabsMenuShow();
      this.CloseNextRoutes({
        target: route,
        current: this.currentRoute
      });
      if (this.currentTabIndex !== -1) {
        this.$router.push({
          name: route.name
        });
      }
    },
    handleDelAllRoutes () {
      this.handeleIsTabsMenuShow();
      this.CloseAllRoutes();
      this.$router.push({
        name: 'Home'
      });
    },
    handleUpdateTabWitdh (route) {
      this.UpdateTabWidth(route);
    },
    handeleIsTabsMenuShow () {
      if (this.isTabsMenuShow) {
        this.SetTabsMenuType(false);
      }
    }
  },
  mounted () {}
};
</script>

<style lang="scss" scope>
.tabs {
  width: 100%;
  height: 35px;
  outline: none;
  position: relative;
  background: #1a355b;
  flex: 1;
  @include flex-start-center;
  display: flex;
  &-item {
    height: 100%;
    cursor: pointer;
    text-decoration: none;
    border: 1px solid #091a32;
    border-bottom: 0;
    border-radius: 4px 4px 0 0;
    background: #63758f;
    color: #fff;
    padding: 0 8px;
    user-select: none;
    font-size: 13px;
    flex-shrink: 1;
    flex-wrap: nowrap;
    overflow: hidden;
    @include flex-between-center;
    position: relative;
    transition: all 0.2s;
    &:hover {
      flex-shrink: 0;
      .tabs-item__txt {
        flex-shrink: 0;
      }
      .tabs-item__icon {
        flex-shrink: 0;
      }
    }
    &__txt {
      display: flex;
      flex-shrink: 1;
      flex-wrap: nowrap;
      overflow: hidden;
      height: 100%;
      white-space: nowrap;
      line-height: 31px;
    }
    &__icon {
      color: rgba(0, 0, 0, 0.45);
      transition: all 0.3s;
      font-size: 12px;
      overflow: hidden;
      vertical-align: middle;
      flex-shrink: 1;
      &:hover {
        color: rgba(0, 0, 0, 0.85);
      }
    }

    &:hover {
      color: #333;
    }
  }
  &-active {
    background: #fff;
    border-color: #fff;
    color: #091a32;
    flex-shrink: 0;
    .tabs-item__txt {
      flex-shrink: 0;
      line-height: 33px;
    }
    .tabs-item__icon {
      flex-shrink: 0;
      line-height: 33px;
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 2169;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    border: 1px solid #d2d2d2;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      background: #fff;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
