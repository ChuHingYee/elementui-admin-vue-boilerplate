import './index.scss';
export default {
  functional: true,
  name: 'NumStatus',
  props: {
    num: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const { num, className } = context.props;
    return (
      <div class={`num ${className}`}>
        <span>{num}%</span>
        {num !== 0 ? (
          <span class={`num-icon ${num > 0 ? 'num-plus' : 'num-minus'}`} />
        ) : (
          <span>-</span>
        )}
      </div>
    );
  }
};
