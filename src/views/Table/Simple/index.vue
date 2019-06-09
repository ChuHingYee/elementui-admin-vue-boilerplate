<template>
  <div>
    <div class="custom-table-header">
      <el-form :inline="true" :model="searchForm">
        <el-form-item label="审批人">
          <el-input
            v-model="searchForm.user"
            placeholder="审批人"
            size="small"
            v-formatK:2="searchForm.user"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" v-debounce:500="test">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="export2Excel('#table')">导出</el-button>
        </el-form-item>
        <el-form-item v-authBtn:TableSimpleTest1>
          <el-button type="primary" size="small">测试按钮1</el-button>
        </el-form-item>
        <el-form-item v-authBtn:TableSimpleTest2>
          <el-button type="primary" size="small">测试按钮2</el-button>
        </el-form-item>
        <el-form-item v-authBtn:TableSimpleTest8>
          <el-button type="primary" size="small">测试按钮8</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Table
      :data="loadData"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      ref="table"
      id="table"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="custom-table-expand">
            <div class="custom-table-expand-item">
              <div class="item-label">haha</div>
              <div class="item-container">{{props.row.user}}</div>
            </div>
            <div class="custom-table-expand-item">
              <div class="item-label">haha</div>
              <div class="item-container">{{props.user}}</div>
            </div>
            <div class="custom-table-expand-item">
              <div class="item-label">haha</div>
              <div class="item-container">{{props.user}}</div>
            </div>
            <div class="custom-table-expand-item">
              <div class="item-label">haha</div>
              <div class="item-container">{{props.user}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="no" label="日期" width="80" sortable="custom"></el-table-column>
      <el-table-column prop="picUrl" label="姓名" width="350" sortable="custom"></el-table-column>
      <el-table-column prop="reviewer" label="地址"></el-table-column>
      <el-table-column prop="timestamp" label="地址"></el-table-column>
      <el-table-column prop="title" label="地址" width="450"></el-table-column>
      <el-table-column :fixed="columnFixed" label="操作" width="100" v-if="showOpenration">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="()=>centerDialogVisible=true">编辑</el-button>
        </template>
      </el-table-column>
    </Table>
    <Dialog :show.sync="isShowDialog"></Dialog>
  </div>
</template>

<script>
import { GetTableList } from '@/apis/table';
import customTableMixin from '@/mixins/customTable';
import custom2ExcelMixin from '@/mixins/custom2Excel';
import Table from '@/components/Table';
import Dialog from './components/Dialog';
export default {
  name: 'TableSimple',
  data () {
    return {
      isShowDialog: false,
      centerDialogVisible: false,
      searchForm: {
        user: ''
      },
      testLoading: false,
      now: new Date().getTime(),
      columnFixed: 'right',
      showOpenration: true
    };
  },
  mixins: [customTableMixin, custom2ExcelMixin],
  computed: {},
  watch: {},
  components: {
    Table,
    Dialog
  },
  methods: {
    test () {
      console.log('test');
    },
    handleSelectionChange (val) {
      console.log(val);
    },
    loadData (parameter) {
      return new Promise((resolve, reject) => {
        GetTableList(parameter).then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    handleClick () {
      this.isShowDialog = true;
    },
    hello () {
      this.testLoading = true;
      setTimeout(() => {
        this.testLoading = false;
      }, 3200);
    },
    handleSearch () {
      this.$refs.table.reloadWithQuery({ ...this.searchForm }, true);
    },
    handleSortChange ({ column, prop, order }) {
      const _params = {
        ...this.searchForm,
        [prop]: order
      };
      this.$refs.table.reloadWithQuery(_params, true);
    }
  },
  mounted () {}
};
</script>

<style lang="scss">
</style>
