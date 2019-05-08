<template>
  <div class="layout">
    <Sider class="layout-sider" ref="layoutSide"></Sider>
    <Header class="layout-header" :style="computedAbsoluteStyle"></Header>
    <div class="layout-tabs" :style="computedAbsoluteStyle">
      <Tabs></Tabs>
    </div>
    <div class="layout-content" :style="computedAbsoluteStyle">
      <el-scrollbar wrap-class="layout-content-main" view-style="padding:20px;">
        <keep-alive :include="cacheRouters">
          <router-view @scroll-top="handlePageScroll"></router-view>
        </keep-alive>
      </el-scrollbar>
    </div>
    <Footer class="layout-footer" :style="computedAbsoluteStyle"></Footer>
  </div>
</template>
<script>
import Sider from './sider';
import Header from './header';
import Footer from './footer';
import Tabs from '@/components/Tabs';
import { mapGetters } from 'vuex';
export default {
  name: 'GlobalLayout',
  components: {
    Sider,
    Header,
    Footer,
    Tabs
  },
  data () {
    return {
      marginRight: 0
    };
  },
  computed: {
    ...mapGetters([
      'isSiderCollapsed',
      'scrollBarWitdh',
      'cacheRouters',
      'clientHeight',
      'resizeFlag'
    ]),
    computedAbsoluteStyle () {
      return {
        left: this.isSiderCollapsed ? '64px' : '200px'
      };
    },
    computedMarginStyle () {
      return {
        marginLeft: this.isSiderCollapsed ? '64px' : '200px'
      };
    }
  },
  watch: {
    tinymceHtml (val) {
      console.log(val);
    }
  },
  methods: {
    handleToggleTableFixed () {
      const operationColumn = this.columns.find(col => {
        return col.key === 'operation';
      });
      if (operationColumn) {
        if (operationColumn.fixed) {
          operationColumn.fixed = false;
        } else {
          operationColumn.fixed = 'right';
        }
      }
    },
    handleSelecedRowChange (rows) {
      console.log(rows);
    },
    handlePageScroll () {
      // this.$refs.layoutContainer.$el.scrollIntoView();
    }
  },
  mounted () {
    this.isTableLoading = true;
    setTimeout(() => {
      this.isTableLoading = false;
    }, 3000);
  }
};
</script>
<style lang="scss">
.layout {
  height: 100%;
  flex-direction: column;
  &-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: all 0.2s;
    z-index: 88;
  }
  &-tabs {
    position: fixed;
    top: 64px;
    right: 0;
    z-index: 88;
    padding: 10px 22px 0;
    background: #f0f2f5;
    @include transition-common;
  }
  &-content {
    transition: all 0.2s;
    position: absolute;
    top: 106px;
    left: 200px;
    bottom: 44px;
    right: 0;
    background: #f0f2f5;
    padding: 0 22px 10px;
    .el-scrollbar {
      height: 100%;
      &__wrap {
        overflow-x: hidden;
      }
    }
    &-main {
      background: #fff;
      border: 1px solid #e8e8e8;
      border-top: 0;
    }
  }
  &-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
}

.layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
