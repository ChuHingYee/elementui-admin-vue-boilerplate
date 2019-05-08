<template>
  <div class="home">
    <el-row
      :gutter="10"
      class="home-header"
    >
      <el-col
        :span="6"
        class="home-header-card"
      >
        <Skeleton
          :title="false"
          active
          :loading="headerLoding"
          :avatar="false"
        >
          <Card title="总销售额">
            <template v-slot:body>
              <div>
                <div class="card-header">
                  ￥<CountTo
                    :startVal="0"
                    :endVal="saleTotal"
                    :duration="2600"
                  ></CountTo>
                </div>
                <div class="card-body">
                  <span>周同比</span>
                  <NumStatus :num="saleDayChange"></NumStatus>
                  <span class="sale-label">日同比</span>
                  <NumStatus :num="saleWeekChange"></NumStatus>
                </div>
              </div>
            </template>
            <template v-slot:tip>
              <div>说明</div>
            </template>
            <template v-slot:footer>
              日销售量：
              <CountTo
                :startVal="0"
                :endVal="saleCurrentCount"
                :duration="2600"
              ></CountTo>
            </template>
          </Card>
        </Skeleton>

      </el-col>
      <el-col
        :span="6"
        class="home-header-card"
      >
        <Skeleton
          :title="false"
          active
          :loading="headerLoding"
          :avatar="false"
        >
          <Card title="运营活动效果">
            <template v-slot:body>
              <div>
                <div class="card-header">
                  <CountTo
                    :startVal="0"
                    :endVal="planNow"
                    :duration="2600"
                  ></CountTo>
                  %
                </div>
                <div class="card-body">
                  <TargetBar
                    :current="planNow"
                    :target="planTarget"
                  ></TargetBar>
                </div>
              </div>
            </template>
            <template v-slot:tip>
              <div>说明</div>
            </template>
            <template v-slot:footer>
              <span>周同比</span>
              <NumStatus :num="planDayChange"></NumStatus>
              <span class="sale-label">日同比</span>
              <NumStatus :num="planWeekChange"></NumStatus>
            </template>
          </Card>
        </Skeleton>

      </el-col>
      <el-col
        :span="6"
        class="home-header-card"
      >
        <Skeleton
          :title="false"
          active
          :loading="headerLoding"
          :avatar="false"
        >
          <Card title="访问量">
            <template v-slot:body>
              <div>
                <div class="card-header">
                  <CountTo
                    :startVal="0"
                    :endVal="accessTotal"
                    :duration="2600"
                  ></CountTo>
                </div>
                <div class="card-body">
                  <LineChart
                    :options="accessOption"
                    :resizeFlag="resizeFlag"
                    chartWidth="100%"
                    chartHeight="40"
                  ></LineChart>
                </div>
              </div>
            </template>
            <template v-slot:tip>
              <div>说明</div>
            </template>
            <template v-slot:footer>
              日访问量：
              <CountTo
                :startVal="0"
                :endVal="accessCurrent"
                :duration="2600"
              ></CountTo>
            </template>
          </Card>
        </Skeleton>

      </el-col>
      <el-col
        :span="6"
        class="home-header-card"
      >
        <Skeleton
          :title="false"
          active
          :loading="headerLoding"
          :avatar="false"
        >
          <Card title="支付笔数">
            <template v-slot:body>
              <div>
                <div class="card-header">
                  <CountTo
                    :startVal="0"
                    :endVal="payTotal"
                    :duration="2600"
                  ></CountTo>
                </div>
                <div class="card-body">
                  <BarChart
                    :options="payOption"
                    :resizeFlag="resizeFlag"
                    chartWidth="100%"
                    chartHeight="40"
                  ></BarChart>
                </div>
              </div>
            </template>
            <template v-slot:tip>
              <div>说明</div>
            </template>
            <template v-slot:footer>
              转化率:{{payChange}}%
            </template>
          </Card>
        </Skeleton>

      </el-col>
    </el-row>
    <el-row
      :gutter="10"
      class="home-main"
    >
      <el-col :span="16">
        <Card title="地区分布">
          <template v-slot:body>
            <Charts
              :options="mapOption"
              chartWidth="100%"
              :chartHeight="400"
              :resizeFlag="resizeFlag"
            ></Charts>
          </template>
          <template v-slot:tip>
            <div>说明</div>
          </template>
        </Card>
      </el-col>
      <el-col :span="8">
        <Card title="访问来源">
          <template v-slot:body>
            <PieChart
              :options="pieOption"
              :resizeFlag="resizeFlag"
              chartWidth="100%"
            ></PieChart>
          </template>
          <template v-slot:tip>
            <div>说明</div>
          </template>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Card from '@/components/Card';
import NumStatus from '@/components/NumStatus';
import BarChart from '@/components/BarChart';
import LineChart from '@/components/LineChart';
import TargetBar from '@/components/TargetBar';
import Skeleton from '@/components/Skeleton';
import Charts from '@/components/Charts/index';
import PieChart from '@/components/PieChart';
import CountTo from 'vue-count-to';
import { GetHomeHeader, GetChartPieOne } from '@/apis/chart';
import { formatDay } from '@/utils/tools';
import ChinaMap from '@/utils/china.json';
import echarts from 'echarts';
export default {
  name: 'Home',
  data () {
    return {
      saleTotal: 0,
      saleCurrentCount: 0,
      saleDayChange: 0,
      saleWeekChange: 0,
      payTotal: 0,
      payChange: 0,
      payList: [],
      payOption: {},
      accessTotal: 0,
      accessCurrent: 0,
      accessList: [],
      accessOption: {},
      planTarget: 0,
      planNow: 0,
      planDayChange: 0,
      planWeekChange: 0,
      mapOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        toolbox: {
          feature: {
            dataView: false,
            magicType: {
              type: []
            },
            saveAsImage: false
          }
        },
        visualMap: {
          min: 0,
          max: 3000,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#73dbe7', '#588dd5', '#495bc7']
          }
        },
        series: [
          {
            type: 'map',
            mapType: 'china', // 自定义扩展图表类型
            data: [{
              name: '广东',
              value: 168
            }, {
              name: '南海诸岛',
              value: 999
            }]
          }
        ]
      },
      pieOption: {},
      pieList: [],
      headerLoding: false
    };
  },
  components: {
    Card,
    CountTo,
    BarChart,
    LineChart,
    TargetBar,
    NumStatus,
    Skeleton,
    Charts,
    PieChart
  },
  computed: {
    ...mapGetters(['resizeFlag'])
  },
  watch: {
    payList (newVal) {
      let _xData = [];
      let _data = [];
      newVal.forEach((val) => {
        _xData.push(formatDay(val.date));
        _data.push(val.value);
      });
      this.payOption = {
        color: ['#618CFE'],
        grid: {
          top: '1%',
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: false
        },
        xAxis: [{
          show: false,
          data: _xData
        }],
        yAxis: {
          show: false
        },
        itemStyle: {
          barBorderRadius: [0, 0, 0, 0]
        },
        series: [
          {
            name: '直接访问',
            type: 'bar',
            data: _data,
            xAxisIndex: 0,
            z: 3,
            barMaxWidth: '60'
          }]
      };
    },
    accessList (newVal) {
      let _xData = [];
      let _data = [];
      newVal.forEach((val) => {
        _xData.push(formatDay(val.date));
        _data.push(val.value);
      });
      this.accessOption = {
        color: ['#618CFE'],
        grid: {
          top: '1%',
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: false
        },
        xAxis: [{
          show: false,
          data: _xData
        }],
        yAxis: {
          show: false
        },
        series: [{
          name: '直接访问',
          data: _data,
          type: 'line',
          areaStyle: {},
          smooth: true
        }]
      };
    },
    pieList (newVal) {
      let _xData = [];
      let _data = [];
      const color = ['#F9C573', '#618CFE', '#3D4D60', '#DE726E', '#E6E5CF', '#5F75A8', '#A7BE8E', '#91B6CA'];
      newVal.forEach((val, index) => {
        _xData.push(val.name);
        _data.push({
          value: val.value,
          name: val.name,
          itemStyle: {
            color: color[index]
          }
        });
      });
      this.pieOption = {
        legend: {
          show: true,
          bottom: 10,
          orient: 'horizontal',
          left: 'center',
          icon: 'circle',
          data: _xData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '22',
                  fontWeight: 'bold',
                  color: '#333333'
                },
                formatter: [
                  '{a|{d}%}',
                  '{c|{b}}'
                ].join('\n'),
                rich: {
                  a: {
                    fontSize: 30,
                    lineHeight: 40
                  },
                  b: {
                    fontSize: 18
                  },
                  c: {
                    fontSize: 16,
                    fontFamily: 'Microsoft YaHei',
                    borderColor: '#449933',
                    borderRadius: 4
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: _data
          }
        ]
      };
    }
  },
  mounted () {
    this.headerLoding = true;
    GetHomeHeader().then((res) => {
      console.log(res);
      const {
        sale,
        pay,
        access,
        plan
      } = res;
      this.saleTotal = sale.total;
      this.saleCurrentCount = sale.current;
      this.saleDayChange = sale.day;
      this.saleWeekChange = sale.week;
      this.payTotal = pay.total;
      this.payChange = pay.change;
      this.payList = pay.list;
      this.accessTotal = access.total;
      this.accessCurrent = access.current;
      this.accessList = access.list;
      this.planTarget = plan.target;
      this.planNow = plan.now;
      this.planDayChange = plan.day;
      this.planWeekChange = plan.week;
    }).finally(() => {
      this.headerLoding = false;
    });
    GetChartPieOne().then((res) => {
      this.pieList = res;
    });
    echarts.registerMap('china', ChinaMap);
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  @include flex-center-center;
  flex-wrap: wrap;
  &-header {
    width: 100%;
    max-height: 150px;
    margin-bottom: 15px;
    &-card {
      height: 145px;
      .card-header {
        line-height: 40px;
        font-size: 20px;
        font-weight: 400;
      }
      .card-body {
        font-size: 12px;
        height: 40px;
        line-height: 50px;
        .sale-label {
          margin-left: 8px;
        }
      }
    }
  }
  &-main {
    width: 100%;
  }
}
</style>
