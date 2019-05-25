import './siderMenu.scss';
import { mapActions } from 'vuex';
export default {
  name: 'SiderMenu',
  props: {
    menus: {
      type: Array,
      default: () => []
    },
    isSiderCollapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions(['CloseVisitedRoutes']),
    renderItem (h, menu, path) {
      if (menu.meta.hidden) {
        return;
      }
      const _path = `${path}${path ? '/' : ''}${menu.path}`;
      if (!menu.children || menu.meta.hiddenChild) {
        return (
          <el-menu-item index={_path}>
            <router-link
              to={{ path: _path }}
              class="sider-link"
              exact
            >
              {menu.meta.icon && <i class={`iconfont ${menu.meta.icon}`} />}
              <span>{menu.meta.title}</span>
            </router-link>
            <span slot="title">{menu.meta.title}</span>
          </el-menu-item>
        );
      } else {
        return (
          <el-submenu index={_path}>
            <template slot="title">
              {menu.meta.icon && <i class={`iconfont ${menu.meta.icon}`} />}
              <span>{menu.meta.title}</span>
            </template>
            {menu.children.map(child => {
              return this.renderItem(h, child, _path);
            })}
          </el-submenu>
        );
      }
    }
  },
  render (h) {
    return (
      <el-menu
        default-active={this.$route.path}
        unique-opened
        text-color="#ffffff"
        collapse={this.isSiderCollapsed}
      >
        {this.menus.map(menu => {
          return this.renderItem(h, menu, '');
        })}
      </el-menu>
    );
  }
};
