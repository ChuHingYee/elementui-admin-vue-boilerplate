<template>
  <footer class="footer">Copyright &copy; 2018</footer>
</template>

<script>
export default {
  name: 'BaseLayoutFooter'
};
</script>

<style lang="scss" scoped>
.footer {
  @include transition-common;
  padding: 10px 50px !important;
  @include flex-center-center;
  color: #333;
  background: #f0f2f5;
  height: 45px;
  border: 0;
}
</style>
