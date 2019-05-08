import echarts from 'echarts';
import Skeleton from '../Skeleton';
export default {
  name: 'Echart',
  data () {
    return {
      chart: null,
      loading: true,
      hasData: false // 记录渲染数据
    };
  },
  props: {
    chartClass: {
      type: String,
      default: 'echartClass'
    },
    chartId: {
      type: String,
      default: `echart${new Date().getTime()}`
    },
    chartWidth: {
      type: [Number, String],
      default: 400
    },
    chartHeight: {
      type: [Number, String],
      default: 400
    },
    options: {
      type: Object,
      required: true
    },
    resizeFlag: {
      type: Number,
      default: 0
    }
  },
  computed: {
    computedStyles () {
      return {
        height: `${this.chartHeight}px`,
        width: `${this.chartWidth}px`
      };
    },
    paragraph () {
      return {
        rows: Math.ceil(this.chartHeight / 32)
      };
    }
  },
  watch: {
    options: {
      handler (newVal) {
        // 以数据的series为判断条件
        if (newVal.series) {
          this.renderLogic();
        }
      },
      deep: true,
      immediate: true
    },
    resizeFlag () {
      if (document.querySelector(`#${this.chartId}`) && this.chart) {
        this.chart.resize();
      }
    }
  },
  methods: {
    initChart (options) {
      if (
        this.chart !== null &&
        this.chart !== '' &&
        this.chart !== undefined
      ) {
        this.chart.dispose();
      }
      this.chart = echarts.init(
        document.getElementById(this.chartId),
        'macarons'
      );
      this.chart.setOption(options);
    },
    renderLogic () {
      this.loading = false;
      this.$nextTick(() => {
        // 判断页面是否显示，要是页面已经跳转不渲染列表
        if (document.querySelector(`#${this.chartId}`)) {
          this.initChart(this.options);
          this.hasData = false;
        } else {
          this.loading = true;
          this.hasData = true;
        }
      });
    }
  },
  activated () {
    if (this.hasData) {
      this.renderLogic();
    }
  },
  beforeDestroy () {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  render (h) {
    return (
      <div class="echart" style={this.computedStyles}>
        <Skeleton title={true} active loading={this.loading} avatar={false}>
          <div
            class="chartClass"
            id={this.chartId}
            style={this.computedStyles}
          />
        </Skeleton>
      </div>
    );
  }
};
