import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['clientHeight', 'resizeFlag'])
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
