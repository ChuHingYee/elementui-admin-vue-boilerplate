<template>
  <el-row id="userList">
    <el-col :span="12" class="tree">
      <h2 class="page-title tree-title">分布树</h2>
      <el-tree
        :style="computedHeight"
        class="tree"
        :props="treeProp"
        :load="loadNode"
        lazy
        @node-click="handleNodeClick"
        :render-content="renderTree"
        :expand-on-click-node="false"
        v-loading="isLoading"
      ></el-tree>
    </el-col>
    <el-col :span="12" class="info">
      <h2 class="page-title info-title">信息</h2>
      <Skeleton :paragraph="[3,5,6,8,9]" :loading="!currentItem._id">
        <div class="info-container">
          <img :src="currentItem.ava" class="info-container-ava">
          <el-row class="info-container-main">
            <el-col :span="12">
              <p>
                <span>地址:</span>
                {{currentItem.address}}
              </p>
              <p>
                <span>日期:</span>
                {{currentItem.timestamp}}
              </p>
              <p>
                <span>姓名:</span>
                {{currentItem.name}}
              </p>
              <p>
                <span>题目:</span>
                {{currentItem.title}}
              </p>
            </el-col>
            <el-col :span="12">
              <p>
                <span>网址:</span>
                {{currentItem.web}}
              </p>
              <p>
                <span>字母:</span>
                {{currentItem.letter}}
              </p>
              <p>
                <span>id:</span>
                {{currentItem.key}}
              </p>
            </el-col>
          </el-row>
        </div>
      </Skeleton>
    </el-col>
  </el-row>
</template>

<script>
import { GetTreeList } from '@/apis/tree';
import { mapGetters } from 'vuex';
import Skeleton from '@/components/Skeleton';
export default {
  name: 'TreeRelevance',
  data () {
    return {
      currentItem: {},
      treeProp: {
        label: 'name',
        children: 'children',
        isLeaf: 'leaf'
      },
      isLoading: false
    };
  },
  components: {
    Skeleton
  },
  mixins: [],
  computed: {
    ...mapGetters(['clientHeight']),
    computedHeight () {
      return {
        height: `${this.clientHeight - 280}px`
      };
    }
  },
  methods: {
    handleNodeClick (data) {
      this.currentItem = data;
    },
    async loadNode (node, resolve) {
      const { data } = node;
      const result = await this.getTreeData(data && data._id ? data._id : '');
      return resolve(result);
    },
    formatData (list) {
      return list.map(item => {
        return {
          title: item.name,
          _id: item._id,
          timestamp: item.timestamp,
          ava: item.ava,
          web: item.web,
          letter: item.letter,
          address: item.address,
          name: item.name,
          children: item.child.length > 0 ? this.formatData(item.child) : [],
          childCount: item.childCount,
          scopedSlots: { title: 'item' }
        };
      });
    },
    getTreeData (id) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        GetTreeList({
          id
        })
          .then(res => {
            resolve(this.formatData(res.list));
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
    },
    renderTree (h, { node, data, store }) {
      return (
        <div
          class={
            this.currentItem._id === data._id
              ? 'tree-item tree-item-current'
              : 'tree-item'
          }
        >
          <span>{data.name}</span>
          <span>(朋友数量{data.childCount})</span>
        </div>
      );
    }
  },
  mounted () {}
};
</script>

<style lang="scss">
#userList {
  width: 100%;
  .tree {
    padding: 0 12px;
    background: #f9f9f9;
    overflow: auto;
    &-title {
      border-bottom: 1px solid #ccc;
    }
    &-item {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      &:hover {
        background: #bae7ff;
      }
      &-current {
        background: #bae7ff;
      }
    }
  }
  .info {
    padding: 0 12px;
    &-title {
      font-size: 16px;
      font-weight: 600;
    }
    &-container {
      display: flex;
      &-ava {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        margin-right: 14px;
      }
      &-main {
        flex: 1;
        padding-bottom: 20px;
        border-bottom: 2px solid #eee;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .page-title {
    line-height: 52px;
    height: 52px;
    font-size: 16px;
    font-weight: 600;
  }
  .el-tree-node__content:hover {
    background-color: #f9f9f9;
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: #f9f9f9;
  }
}
</style>
