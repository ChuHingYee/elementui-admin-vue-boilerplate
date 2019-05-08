import { Table } from 'element-ui';
import './index.scss';
export default {
  data () {
    return {
      localBorder: false,
      localStripe: true,
      localFit: true,
      localCurrentPage: 1,
      localPageSize: 20,
      localTotalCount: 0,
      localPagination: {
        localPageSizesList: [20, 50, 100]
      },
      localData: [],
      localLoading: false
    };
  },
  props: Object.assign({}, Table.props, {
    data: {
      type: Function,
      default: () => { }
    },
    customPagination: {
      type: Object,
      default: () => { }
    },
    size: {
      type: String,
      default: 'small'
    },
    auto: {
      type: Boolean,
      default: true
    }
  }),
  watch: {},

  methods: {
    handleClick (row) {
      console.log(row);
    },
    handleSelectionChange (row) {
      this.$emit('selection-change', row);
    },
    handleSortChange (row) {
      this.$emit('sort-change', row);
    },
    loadData (params) {
      const _params = {
        current: this.localCurrentPage,
        size: this.localPageSize,
        param: { ...params }
      };
      this.localLoading = true;
      this.data(_params)
        .then(res => {
          this.localTotalCount = res.totalCount;
          this.localData = Object.freeze(res.data);
        })
        .finally(() => {
          this.localLoading = false;
        });
    },
    handleCurrentChange (val) {
      this.localCurrentPage = val;
      this.loadData();
    },
    handleSizeChange (val) { },
    /**
     * 表格外部筛选方法
     * @param
     */
    reloadWithQuery (params, refresh = false) {
      if (refresh) {
        this.localCurrentPage = 1;
        this.loadData(params);
      } else {
        this.loadData(params);
      }
    },
    /**
     * 表格外部设置表格loading
     * @param Boolean bool
     */
    setLoading (flag) {
      this.localLoading = flag;
    }
  },

  created () {
    if (this.auto) {
      this.loadData();
    }
  },

  render (h) {
    const props = {};
    const localKeys = Object.keys(this.$data);
    Object.keys(Table.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(
        1
      )}`;
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey];
        return props[k];
      }
      props[k] = this[k];
      return props[k];
    });
    const CustomTable = (
      <el-table
        class="table-wrapper-main"
        vLoading={this.localLoading}
        {...{ props, scopedSlots: { ...this.$scopedSlots } }}
        on-selection-change={this.handleSelectionChange}
        on-sort-change={this.handleSortChange}
      />
    );
    return (
      <div class="table-wrapper">
        {CustomTable}
        <div class="table-wrapper-page">
          <el-pagination
            on-size-change={this.handleSizeChange}
            on-current-change={this.handleCurrentChange}
            current-page={this.localCurrentPage}
            page-sizes={this.localPageSizesList}
            page-size={this.localPageSize}
            layout="total, prev, pager, next,jumper"
            total={this.localTotalCount}
          />
        </div>
      </div>
    );
  }
};
