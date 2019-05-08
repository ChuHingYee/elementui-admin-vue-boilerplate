<script>
export default {
  beforeCreate () {
    const { fullPath } = this.$route;
    const path = fullPath.replace('/redirect', '');
    this.$router.replace({ path });
  },
  render: function (h) {
    return h(); // avoid warning message
  }
};
</script>
