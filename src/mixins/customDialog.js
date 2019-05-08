export default {
  data () {
    return {
      loading: false // 确定时状态
    };
  },
  props: {
    // Dialog显示状态
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isDialogShowing: {
      get () {
        return this.show;
      },
      set () {
        if (this.loading) {
          return;
        }
        return this.$emit('update:show', false);
      }
    }
  },
  watch: {},
  methods: {
    // 表单充值，约定ref为form
    resetForm () {
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    }
  }
};
