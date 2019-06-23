<template>
  <div class="login">
    <div class="login-container">
      <div class="login-container__top">后台系统</div>

      <div class="login-container__main">
        <router-view></router-view>
      </div>

      <div class="login-container__footer">
        <div class="footer-copy">Copyright &copy; 2018</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
  data () {
    return {};
  },
  created () {},
  methods: {},
  mounted () {},
  beforeDestroy () {}
};
</script>

<style lang="scss" scoped>
.login {
  @include flex-center-center();
  height: 100%;
  background: #001529;

  &-container {
    width: 100%;
    min-height: 100%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;
    &__top {
      text-align: center;
      font-size: 22px;
      color: #2868bc;
      font-weight: 600;
      margin-bottom: 15px;
    }

    &__footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;
      .footer-copy {
        color: rgba(255, 255, 255, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
