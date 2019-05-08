import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['clientHeight']),
    computedHeight () {
      return {
        height: `${this.clientHeight - 224}px` // 224为头部 64 + 选项卡50 + 脚部 60 + 容器padding 40 + margin-bottom 10
      };
    }
  }
};
