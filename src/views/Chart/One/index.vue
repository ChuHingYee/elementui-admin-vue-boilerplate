<template>
  <div class="user">
    <div class="user-top">
      <div class="user-top-header">
        <h2 class="user-title user-top-header-title">订单统计</h2>
      </div>
      <div
        class="user-top-main"
        ref="topMainWrap"
      >
        <div class="user-top-main-header">
          <Skeleton
            :loading="detailLoading"
            :avatar="false"
            active
            :paragraph="[10, [5, 5, 3], 10]"
          >
            <div class="ubh-wrap">
              <h3 class="ubh-wrap-title">今日订单统计</h3>
              <CountTo
                class="ubh-wrap-count"
                :startVal="0"
                :endVal="dayTotal"
                :duration="2600"
              ></CountTo>
            </div>
          </Skeleton>
          <Skeleton
            :loading="detailLoading"
            :avatar="false"
            active
            :paragraph="[10, [5, 5, 3], 10]"
          >
            <div class="ubh-wrap">
              <h3 class="ubh-wrap-title">今周订单统计</h3>
              <CountTo
                class="ubh-wrap-count"
                :startVal="0"
                :endVal="weekTotal"
                :duration="2600"
              ></CountTo>
            </div>
          </Skeleton>
          <Skeleton
            :loading="detailLoading"
            :avatar="false"
            active
            :paragraph="[10, [5, 5, 3], 10]"
          >
            <div class="ubh-wrap">
              <h3 class="ubh-wrap-title">今月订单统计</h3>
              <CountTo
                class="ubh-wrap-count"
                :startVal="0"
                :endVal="monthTotal"
                :duration="2600"
              ></CountTo>
            </div>
          </Skeleton>
          <Skeleton
            :loading="detailLoading"
            :avatar="false"
            active
            :paragraph="[10, [5, 5, 3], 10]"
          >
            <div class="ubh-wrap">
              <h3 class="ubh-wrap-title">今年订单统计</h3>
              <CountTo
                class="ubh-wrap-count"
                :startVal="0"
                :endVal="yearTotal"
                :duration="2600"
              ></CountTo>
            </div>
          </Skeleton>
        </div>
        <BarChart
          :options="barOptions"
          :chartWidth="barChartWidth"
        ></BarChart>
      </div>
    </div>
    <div class="user-divided">
      <div class="user-divided-line"></div>
    </div>
    <el-row
      :gutter="24"
      class="uset-middle"
    >
      <el-col
        :span="8"
        class="uset-middle-wrap"
        ref="middleWrap"
      >
        <div class="um-wrap-header">
          <h2 class="user-title">新增比例</h2>
        </div>
        <div class="um-wrap-main">
          <PieChart
            :options="oneOptions"
            chartWidth="100%"
            :chartHeight="pieChartWidth"
          ></PieChart>
        </div>
      </el-col>
      <el-col
        :span="8"
        class="uset-middle-wrap"
      >
        <div class="um-wrap-header">
          <h2 class="user-title">新增比例</h2>
        </div>
        <div class="um-wrap-main">
          <PieChart
            :options="twoOptions"
            chartWidth="100%"
            :chartHeight="pieChartWidth"
          ></PieChart>
        </div>
      </el-col>
      <el-col
        :span="8"
        class="uset-middle-wrap"
      >
        <div class="um-wrap-header">
          <h2 class="user-title">新增比例</h2>
        </div>
        <div class="um-wrap-main">
          <PieChart
            :options="threeOptions"
            chartWidth="100%"
            :chartHeight="pieChartWidth"
          ></PieChart>
        </div>
      </el-col>
    </el-row>
    <div class="user-divided">
      <div class="user-divided-line"></div>
    </div>
    <div class="user-bottom">
      <Table
        :data="loadData"
        :height="500"
        size="mini"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="custom-table-expand">
              <div class="custom-table-expand-item">
                <div class="item-label">haha</div>
                <div class="item-container">{{props.row.user}}</div>
              </div>
              <div class="custom-table-expand-item">
                <div class="item-label">haha</div>
                <div class="item-container">{{props.user}}</div>
              </div>
              <div class="custom-table-expand-item">
                <div class="item-label">haha</div>
                <div class="item-container">{{props.user}}</div>
              </div>
              <div class="custom-table-expand-item">
                <div class="item-label">haha</div>
                <div class="item-container">{{props.user}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="no"
          label="日期"
          width="80"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          prop="picUrl"
          label="姓名"
          width="350"
          sortable="custom"
        ></el-table-column>
        <el-table-column
          prop="reviewer"
          label="地址"
        ></el-table-column>
        <el-table-column
          prop="timestamp"
          label="地址"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="地址"
          width="450"
        ></el-table-column>
      </Table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CountTo from 'vue-count-to';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import Table from '@/components/Table';
import Skeleton from '@/components/Skeleton';
import { GetTableList } from '@/apis/table';
import { GetChartDetail, GetChartPieOne, GetChartPieTwo, GetChartPieThree } from '@/apis/chart';
import { formatDay } from '@/utils/tools';
export default {
  name: 'ChartOne',
  data () {
    return {
      pieChartWidth: 0,
      barChartWidth: 0,
      barOptions: {},
      detailLoading: true,
      dayTotal: 0,
      weekTotal: 0,
      monthTotal: 0,
      yearTotal: 0,
      totalList: [],
      pieOne: [],
      pieTwo: [],
      pieThree: [],
      oneOptions: {},
      twoOptions: {},
      threeOptions: {},
      color: ['#F9C573', '#618CFE', '#3D4D60', '#DE726E', '#E6E5CF', '#5F75A8', '#A7BE8E', '#91B6CA']
    };
  },
  components: {
    CountTo,
    BarChart,
    PieChart,
    Table,
    Skeleton
  },
  methods: {
    loadData (parameter) {
      return new Promise((resolve, reject) => {
        GetTableList(parameter).then((res) => {
          resolve(res);
        }, err => {
          reject(err);
        });
      });
    }
  },
  computed: {
    ...mapGetters(['resizeFlag'])
  },
  watch: {
    totalList (newVal) {
      let _xData = [];
      let _data = [];
      newVal.forEach((val) => {
        _xData.push(formatDay(val.date));
        _data.push(val.value);
      });
      this.barOptions = {
        color: ['#618CFE'],
        xAxis: [{
          show: true,
          data: _xData,
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          },
          axisPointer: {
            type: 'shadow'
          },
          axisLine: {
            lineStyle: {
              color: '#333'
            }
          }
        }],
        yAxis: {
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#333'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#eee'
            }
          },
          axisTick: {
            show: false
          }
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
    pieOne (newVal) {
      let _xData = [];
      let _data = [];
      newVal.forEach((val, index) => {
        _xData.push(val.name);
        _data.push({
          value: val.value,
          name: val.name,
          itemStyle: {
            color: this.color[index]
          }
        });
      });
      this.oneOptions = {
        legend: {
          show: true,
          orient: 'vertical',
          x: 'right',
          top: '10%',
          icon: 'circle',
          data: _xData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['40%', '50%'],
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
    },
    pieTwo (newVal) {
      let _xData = [];
      let _data = [];
      newVal.forEach((val, index) => {
        _xData.push(val.name);
        _data.push({
          value: val.value,
          name: val.name,
          itemStyle: {
            color: this.color[index]
          }
        });
      });
      this.twoOptions = {
        legend: {
          show: true,
          orient: 'vertical',
          x: 'right',
          top: '10%',
          icon: 'circle',
          data: _xData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['40%', '50%'],
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
    },
    pieThree (newVal) {
      let _xData = [];
      let _data = [];
      newVal.forEach((val, index) => {
        _xData.push(val.name);
        _data.push({
          value: val.value,
          name: val.name,
          itemStyle: {
            color: this.color[index]
          }
        });
      });
      this.threeOptions = {
        legend: {
          show: true,
          orient: 'vertical',
          x: 'right',
          top: '10%',
          icon: 'circle',
          data: _xData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['40%', '50%'],
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
    },
    resizeFlag: {
      immediate: true,
      handler () {
        this.$nextTick(() => {
          let _pWitdh = this.$refs.middleWrap.$el.clientWidth - 24;
          let _bWitdh = this.$refs.topMainWrap.clientWidth - 24;
          this.pieChartWidth = _pWitdh > 350 ? 350 : _pWitdh;
          this.barChartWidth = _bWitdh - 24;
        });
      }
    }
  },
  mounted () {
    GetChartDetail().then((res) => {
      console.log(res);
      this.dayTotal = res.day;
      this.weekTotal = res.week;
      this.monthTotal = res.month;
      this.yearTotal = res.year;
      this.detailLoading = false;
      this.totalList = res.list;
    });
    GetChartPieOne().then((res) => {
      this.pieOne = res;
    });
    GetChartPieTwo().then((res) => {
      this.pieTwo = res;
    });
    GetChartPieThree().then((res) => {
      this.pieThree = res;
    });
  }
  // ['#F9C573','#618CFE','#3D4D60','#DE726E','#E6E5CF','#5F75A8','#A7BE8E','#91B6CA']
};
</script>

<style lang="scss" scoped>
.user {
  &-title {
    font-size: 16px;
    color: #333;
    font-weight: 400;
  }
  &-divided {
    @include flex-center-center;
    margin: 10px 0;
    &-line {
      width: 98%;
      height: 5px;
      border-radius: 5px;
      background: #eee;
    }
  }
  &-top {
    &-header {
      height: 36px;
      margin-bottom: 23px;
      &-title {
        position: relative;
        &:before {
          content: "";
          position: absolute;
          bottom: -12px;
          width: 51px;
          height: 2px;
          background: #3b71ff;
          left: 0;
        }
      }
    }
    &-main {
      &-header {
        @include flex-start-center;
        width: 660px;
        margin-bottom: 18px;
        .ubh {
          &-wrap {
            width: 120px;
            margin-right: 60px;
            &-title {
              font-size: 12px;
            }
            &-count {
              font-size: 16px;
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
