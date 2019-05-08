import './index.scss';
export default {
  functional: true,
  name: 'TargetBar',
  props: {
    target: {
      type: Number,
      default: 100
    },
    current: {
      type: Number,
      default: 0
    },
    showCurrentTip: {
      type: Boolean,
      default: true
    }
  },
  render (h, context) {
    const { target, current, showCurrentTip } = context.props;
    return (
      <div class="custom--target">
        <div class="custom--target-bar">
          {
            showCurrentTip
              ? <el-tooltip effect="dark" content={`完成${current}%`} placement="bottom">
                <div class="custom--target-bar-current" style={{ right: `${100 - current}%` }}></div>
              </el-tooltip>
              : <div class="custom--target-bar-current" style={{ right: `${100 - current}%` }}></div>
          }
          <el-tooltip effect="dark" content={`目标${target}%`} placement="bottom">
            <div class="custom--target-bar-target" style={{ left: `${target}%` }}>
              <span class="target-icon target-top"></span>
              <span class="target-icon target-bottom"></span>
            </div>
          </el-tooltip>
        </div>
      </div>
    );
  }
};
