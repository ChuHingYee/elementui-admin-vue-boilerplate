import './index.scss';
export default {
  functional: true,
  name: 'Card',
  props: {
    title: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  render (h, context) {
    const { scopedSlots } = context;
    const { placement, title } = context.props;
    const toolProp = { placement };
    const ElTooltip = (
      <el-tooltip props={toolProp} >
        <i class="el-icon-info"></i>;
        {
          scopedSlots.tip && <div slot="content">
            {
              scopedSlots.tip()
            }
          </div>
        }
      </el-tooltip>
    );
    return (
      <el-card
        shadow="hover"
        body-style={{ padding: '10px' }}
        class="custom--card"
      >
        <div class="custom--card-header">
          <span class="custom--card-header-title">
            {title}
          </span>
          {ElTooltip}
        </div>
        {
          scopedSlots.body && <div class="custom--card-body">
            {scopedSlots.body()}
          </div>
        }
        {
          scopedSlots.footer && <div class="custom--card-footer">
            {scopedSlots.footer()}
          </div>
        }
      </el-card >
    );
  }
};
