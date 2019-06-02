<template>
  <div class="layout">
    <Sider class="layout-sider" ref="layoutSide"></Sider>
    <Header class="layout-header" :style="computedAbsoluteStyle"></Header>
    <div class="layout-content" :style="computedAbsoluteStyle">
      <el-scrollbar wrap-class="layout-content-main">
        <keep-alive :include="cacheRouters">
          <router-view></router-view>
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
import { mapGetters } from 'vuex';
export default {
  name: 'BaseLayout',
  components: {
    Sider,
    Header,
    Footer
  },
  data () {
    return {
      marginRight: 0
    };
  },
  computed: {
    ...mapGetters([
      'isSiderCollapsed',
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
    }
  },
  mounted () {}
};
</script>
<style lang="scss" scoped>
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
    top: 60px;
    right: 0;
    z-index: 88;
    background: #f0f2f5;
    @include transition-common;
  }
  &-content {
    transition: all 0.2s;
    position: absolute;
    top: 95px;
    left: 200px;
    bottom: 45px;
    right: 0;
    background: #fff;
    padding: 20px;
    .el-scrollbar {
      height: 100%;
    }
    /deep/.el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  &-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
}
</style>
