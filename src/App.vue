<template>
  <div @click="handleCloseMenu" id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash.debounce';
export default {
  name: 'App',
  data () {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters(['isTabsMenuShow', 'isAutocompleteShow'])
  },
  watch: {},
  methods: {
    ...mapActions([
      'SetTabsMenuType',
      'SetSiderType',
      'GetClientAttr',
      'SetIsAutocompleteShow'
    ]),
    handleCloseMenu () {
      if (this.isTabsMenuShow) {
        this.SetTabsMenuType(false);
      }
      if (this.isAutocompleteShow) {
        this.SetIsAutocompleteShow(false);
      }
    }
  },
  mounted () {
    this.GetClientAttr();
    window.addEventListener('resize', debounce(this.GetClientAttr, 300));
  }
};
</script>

<style lang="scss" scoped>
#app {
  background: #f0f2f5;
  height: 100%;
}
</style>
