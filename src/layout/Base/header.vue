<template>
  <header class="header">
    <i
      class="iconfont"
      :class="isSiderCollapsed?'icon-menu-fold':'icon-menu-fold1'"
      @click="trggleSiderType"
    ></i>
    <div class="header-menu">
      <div class="header-menu__search" @click.stop="SetIsAutocompleteShow(true)">
        <el-tooltip effect="dark" content="站内搜索" placement="bottom">
          <i class="iconfont icon-search search-icon"></i>
        </el-tooltip>
        <el-autocomplete
          class="search-input"
          :class="isAutocompleteShow?'search-input__active':''"
          v-model="key"
          :fetch-suggestions="querySearch"
          placeholder="页面搜索"
          :trigger-on-focus="false"
          @select="handleSelectRoute"
        ></el-autocomplete>
      </div>

      <el-dropdown>
        <div class="header-menu__info">
          <img :src="userInfo.ava" v-if="userInfo.ava" class="info-ava">
          <img src v-else>
          <span>{{userInfo.name}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleClick">
            <i class="el-icon-time"></i>
            <span>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="handleLogout">
            <i class="el-icon-time"></i>
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <Dialog :show.sync="isShowDialog"></Dialog>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Dialog from './components/Dialog';

export default {
  name: 'BaseLayoutHeader',
  data () {
    return {
      isShowDialog: false,
      key: ''
    };
  },
  components: {
    Dialog
  },
  computed: {
    ...mapGetters([
      'isSiderCollapsed',
      'userInfo',
      'roleRoutersArr',
      'isAutocompleteShow',
      'visitedRoutes'
    ])
  },
  methods: {
    ...mapActions([
      'SetSiderType',
      'Logout',
      'SetIsAutocompleteShow',
      'TriggerResize'
    ]),
    trggleSiderType () {
      this.SetSiderType(!this.isSiderCollapsed);
      this.TriggerResize();
    },
    handleLogout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.Logout();
          this.$router.push('/login');
        })
        .catch(() => {
          console.log('no');
        });
    },
    handleClick () {
      this.isShowDialog = true;
    },
    querySearch (queryString, cb) {
      const roleRouters = [...this.roleRoutersArr];
      const results = queryString
        ? roleRouters.filter(item => {
          return (
            item.value
              .toLocaleLowerCase()
              .indexOf(queryString.toLocaleLowerCase()) >= 0
          );
        })
        : roleRouters;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelectRoute (item) {
      const _cache = this.visitedRoutes.find(route => {
        return route.name === item.routeName;
      });
      if (_cache) {
        this.$router.push({
          name: _cache.name,
          query: _cache.query
        });
      } else {
        this.$router.push({
          name: item.routeName
        });
      }
      this.key = '';
      this.SetIsAutocompleteShow(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  color: #fff;
  background: #1a355b;
  padding: 0 0 0 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  @include flex-between-center;
  &-trigger {
    height: 60px;
    padding: 22px 24px;
    font-size: 20px;
    cursor: pointer;
    @include transition-common;
  }
  &-menu {
    @include flex-end-center;
    &__search {
      padding: 0 12px;
      @include flex-start-center;
      .search-icon {
        padding-right: 8px;
      }
      .search-input {
        transition: width 0.3s, margin-left 0.3s;
        width: 0px;
        /deep/ .el-input__inner {
          border: 0;
          border-bottom: 1px solid #dcdfe6;
          border-radius: 0;
          padding: 0;
        }
        &__active {
          width: 150px;
          /deep/ .el-input__inner {
            padding: 0 15px;
            background: #1a355b;
          }
        }
      }
    }
    &__info {
      padding: 0 12px;
      @include flex-center-center;
      cursor: pointer;
      color: #fff;
      .info-ava {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 12px;
      }
    }
  }
}
</style>
