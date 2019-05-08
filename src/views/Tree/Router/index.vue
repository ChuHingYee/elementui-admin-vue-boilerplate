<template>
  <div>
    <el-input
      v-model="searchValue"
      size="small"
      placeholder="请输入路由名称"
      class="search"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
      ></el-button>
    </el-input>
    <el-tree
      ref="tree"
      :data="data"
      node-key="id"
      v-loading="loading"
      :render-content="renderTree"
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
    ></el-tree>
  </div>
</template>

<script>
import { GetRouterList } from '@/apis/router';
// import AddModel from './components/AddModel'
export default {
  name: 'TreeRouter',
  data () {
    return {
      visible: false,
      data: [],
      dataList: [],
      loading: true,
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      cVisible: false,
      currentItem: {}
    };
  },
  components: {
  },
  methods: {
    fetchTreeData () {
      this.loading = true;
      GetRouterList().then((res) => {
        this.loading = false;
        let _dataList = [];
        this.data = Object.freeze(this.formatTreeData(res.data, '', _dataList));
        this.dataList = Object.freeze(_dataList);
      });
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    formatTreeData (list, preKey = '') {
      return list.map((item, index) => {
        const _item = {
          label: item.name,
          key: preKey || preKey === 0 ? `${preKey}-${index}` : `${index}`,
          id: item.uniName,
          type: item.type,
          scopedSlots: { title: item.type === 0 ? 'page' : 'btn' }
        };
        if (item.children && item.children.length > 0) {
          _item.children = this.formatTreeData(item.children, _item.key);
        }
        return _item;
      });
    },
    renderTree (h, { node, data, store }) {
      return (
        <div class="tree-line">
          <span>{data.label}</span>
          <span>{
            data.type === 0 ? '(类型:页面)' : '(类型:按钮)'
          }</span>
          <span class="tree-line-btn">
            <span class="btn-txt">新增</span>
            <span class="btn-txt">修改</span>
            <span class="btn-txt">删除</span>
          </span>

        </div >);
    }
  },
  watch: {
    searchValue (val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
    this.fetchTreeData();
    console.log(this.$route);
  }
};
</script>

<style lang="scss">
.placeholder {
  height: 500px;
  background: #eee;
}
.search {
  width: 200px;
}
.tree-line {
  @include flex-start-center;
  cursor: auto;
  flex: 1;
  font-size: 14px;
  &-btn {
    @include flex-around-center;
    border-radius: 5px;
    border: 1px solid rgba(204, 204, 204, 1);
    height: 18px;
    padding: 0 11px;
    margin-left: 5px;
    .btn-txt {
      display: inline-block;
      padding: 0 5px;
      border-right: 1px solid #cccccc;
      height: 100%;
      line-height: 18px;
      font-size: 12px;
      cursor: pointer;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
        border: 0;
      }
    }
  }
}
</style>
