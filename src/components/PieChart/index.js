import Charts from '@/components/Charts/index';
export default {
  data () {
    return {
      localOptions: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left'
        }
      },
      localChartId: `pieChart${new Date().getTime()}`
    };
  },
  props: Object.assign({}, Charts.props, {
    chartWidth: {
      type: [Number, String],
      default: 400
    },
    chartHeight: {
      type: [Number, String],
      default: 400
    },
    resizeFlag: {
      type: Number,
      default: 0
    }
  }),
  render (h) {
    const props = {};
    const localKeys = Object.keys(this.$data);
    Object.keys(Charts.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(
        1
      )}`;
      if (localKeys.includes(localKey)) {
        if (k === 'options') {
          if (this.options.series) {
            let _options = { ...this[localKey] };
            let keys = Object.keys(this.options);
            keys.forEach(key => {
              const newProp = this.options[key];
              if (this[localKey][key]) {
                const type = Object.prototype.toString.call(
                  this[localKey][key]
                );
                switch (type) {
                  case '[object Object]':
                    _options[key] = {
                      ...this[localKey][key],
                      ...newProp
                    };
                    break;
                  case '[object Array]':
                    _options[key] = [...this[localKey][key], ...newProp];
                    break;
                  default:
                    _options[key] = newProp;
                }
              } else {
                _options[key] = newProp;
              }
            });
            props[k] = _options;
          } else {
            props[k] = {};
          }
          return props[k];
        } else {
          props[k] = this[localKey];
          return props[k];
        }
      }
      props[k] = this[k];
      return props[k];
    });
    return <Charts {...{ props }} />;
  }
};
