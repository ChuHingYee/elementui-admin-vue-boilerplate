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
      if (!menu.children || menu.meta.hiddenChild) {
        return (
          <el-menu-item
            index={menu.meta.realPath}
            route={{ path: menu.meta.realPath }}
          >
            {menu.meta.icon && <i class={`iconfont ${menu.meta.icon}`} />}
            <span slot='title'>{menu.meta.title}</span>
          </el-menu-item>
        );
      } else {
        return (
          <el-submenu index={menu.meta.realPath} popper-class='sider-menu'>
            <template slot='title'>
              {menu.meta.icon && <i class={`iconfont ${menu.meta.icon}`} />}
              <span>{menu.meta.title}</span>
            </template>
            {menu.children.map(child => {
              return this.renderItem(h, child, menu.meta.realPath);
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
        text-color='#ffffff'
        active-text-color='#409EFF'
        background-color='#001529'
        collapse={this.isSiderCollapsed}
        router
      >
        {this.menus.map(menu => {
          return this.renderItem(h, menu, '');
        })}
      </el-menu>
    );
  }
};
