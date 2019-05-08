import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      tableHeaderHeight: 0 // 表格头部高度 约定ref=tableHeader
    };
  },
  computed: {
    ...mapGetters(['clientHeight', 'resizeFlag']),
    tableHeight () {
      const _height = this.clientHeight - 224 - this.tableHeaderHeight - 52; // 214 ===头部加脚部加标签栏加padding 40===分页高度
      return _height > 300 ? _height : 300;
    }
  },
  watch: {
    resizeFlag: {
      immediate: true,
      handler (newVal) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.tableHeaderHeight = this.$refs.tableHeader
              ? this.$refs.tableHeader.clientHeight
              : 0;
            console.log(this.tableHeaderHeight);
          });
        }, 500);
      }
    }
  },
  methods: {
    // 表单重置，约定ref为form
    resetForm () {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    }
  }
};
