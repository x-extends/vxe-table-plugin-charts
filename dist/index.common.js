"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VXETablePluginCharts = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _echarts = _interopRequireDefault(require("echarts/lib/echarts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/grid'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/legendScroll'
var menuMap = {
  CHART_BAR_X: function CHART_BAR_X(_ref) {
    var $table = _ref.$table,
        menu = _ref.menu;
    this.$XModal({
      resize: true,
      mask: false,
      lockView: false,
      showFooter: false,
      width: 600,
      height: 400,
      title: menu.name,
      slots: {
        "default": function _default(params, h) {
          return [h('div', {
            "class": 'vxe-chart--wrapper'
          }, [h('div', {
            "class": 'vxe-chart--panel'
          })])];
        }
      },
      events: {
        show: function show() {
          var _$table$getMouseCheck = $table.getMouseCheckeds(),
              rows = _$table$getMouseCheck.rows,
              columns = _$table$getMouseCheck.columns;

          var $chart = _echarts["default"].init(this.$el.querySelector('.vxe-chart--wrapper'));

          var firstColumn = columns[0];
          var legendOpts = {
            data: []
          };
          var seriesOpts = [];
          var yAxisOpts = {
            type: 'category',
            data: rows.map(function (row) {
              return _xeUtils["default"].get(row, firstColumn.property);
            })
          };
          columns.forEach(function (column, index) {
            if (index) {
              legendOpts.data.push(column.title);
              seriesOpts.push({
                name: column.title,
                type: 'bar',
                data: rows.map(function (row) {
                  return _xeUtils["default"].get(row, column.property);
                })
              });
            }
          });
          var option = {
            // grid: {
            //   top: '1%',
            //   left: '1%',
            //   right: '1%',
            //   bottom: '1%',
            //   containLabel: true
            // },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: legendOpts,
            xAxis: {
              type: 'value'
            },
            yAxis: yAxisOpts,
            series: seriesOpts
          };
          $chart.setOption(option);
          this.$chart = $chart;
        },
        close: function close() {
          this.$chart.dispose();
          this.$chart = null;
        },
        zoom: function zoom() {
          this.$chart.resize();
        }
      }
    });
  },
  CHART_BAR_Y: function CHART_BAR_Y(_ref2) {
    var $table = _ref2.$table,
        menu = _ref2.menu;
    this.$XModal({
      resize: true,
      mask: false,
      lockView: false,
      showFooter: false,
      width: 600,
      height: 400,
      title: menu.name,
      slots: {
        "default": function _default(params, h) {
          return [h('div', {
            "class": 'vxe-chart--wrapper'
          }, [h('div', {
            "class": 'vxe-chart--panel'
          })])];
        }
      },
      events: {
        show: function show() {
          var _$table$getMouseCheck2 = $table.getMouseCheckeds(),
              rows = _$table$getMouseCheck2.rows,
              columns = _$table$getMouseCheck2.columns;

          var $chart = _echarts["default"].init(this.$el.querySelector('.vxe-chart--wrapper'));

          var firstColumn = columns[0];
          var legendOpts = {
            data: []
          };
          var seriesOpts = [];
          var xAxisOpts = {
            type: 'category',
            data: rows.map(function (row) {
              return _xeUtils["default"].get(row, firstColumn.property);
            })
          };
          columns.forEach(function (column, index) {
            if (index) {
              legendOpts.data.push(column.title);
              seriesOpts.push({
                name: column.title,
                type: 'bar',
                data: rows.map(function (row) {
                  return _xeUtils["default"].get(row, column.property);
                })
              });
            }
          });
          var option = {
            // grid: {
            //   top: '1%',
            //   left: '1%',
            //   right: '1%',
            //   bottom: '1%',
            //   containLabel: true
            // },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: legendOpts,
            xAxis: xAxisOpts,
            yAxis: {
              type: 'value'
            },
            series: seriesOpts
          };
          $chart.setOption(option);
          this.$chart = $chart;
        },
        close: function close() {
          this.$chart.dispose();
          this.$chart = null;
        },
        zoom: function zoom() {
          this.$chart.resize();
        }
      }
    });
  },
  CHART_LINE: function CHART_LINE(_ref3) {
    var $table = _ref3.$table,
        menu = _ref3.menu;
    this.$XModal({
      resize: true,
      mask: false,
      lockView: false,
      showFooter: false,
      width: 600,
      height: 400,
      title: menu.name,
      slots: {
        "default": function _default(params, h) {
          return [h('div', {
            "class": 'vxe-chart--wrapper'
          }, [h('div', {
            "class": 'vxe-chart--panel'
          })])];
        }
      },
      events: {
        show: function show() {
          var _$table$getMouseCheck3 = $table.getMouseCheckeds(),
              rows = _$table$getMouseCheck3.rows,
              columns = _$table$getMouseCheck3.columns;

          var $chart = _echarts["default"].init(this.$el.querySelector('.vxe-chart--wrapper'));

          var firstColumn = columns[0];
          var legendOpts = {
            data: []
          };
          var seriesOpts = [];
          var xAxisOpts = {
            type: 'category',
            data: rows.map(function (row) {
              return _xeUtils["default"].get(row, firstColumn.property);
            })
          };
          columns.forEach(function (column, index) {
            if (index) {
              legendOpts.data.push(column.title);
              seriesOpts.push({
                name: column.title,
                type: 'line',
                data: rows.map(function (row) {
                  return _xeUtils["default"].get(row, column.property);
                })
              });
            }
          });
          var option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: legendOpts,
            // grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     containLabel: true
            // },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: xAxisOpts,
            yAxis: {
              type: 'value'
            },
            series: seriesOpts
          };
          $chart.setOption(option);
          this.$chart = $chart;
        },
        close: function close() {
          this.$chart.dispose();
          this.$chart = null;
        },
        zoom: function zoom() {
          this.$chart.resize();
        }
      }
    });
  },
  CHART_PIE: function CHART_PIE(_ref4) {
    var $table = _ref4.$table,
        menu = _ref4.menu;
    this.$XModal({
      resize: true,
      mask: false,
      lockView: false,
      showFooter: false,
      width: 600,
      height: 400,
      title: menu.name,
      slots: {
        "default": function _default(params, h) {
          return [h('div', {
            "class": 'vxe-chart--wrapper'
          }, [h('div', {
            "class": 'vxe-chart--panel'
          })])];
        }
      },
      events: {
        show: function show() {
          var _$table$getMouseCheck4 = $table.getMouseCheckeds(),
              rows = _$table$getMouseCheck4.rows,
              columns = _$table$getMouseCheck4.columns;

          var $chart = _echarts["default"].init(this.$el.querySelector('.vxe-chart--wrapper'));

          var firstColumn = columns[0];
          var legendData = rows.map(function (row) {
            return _xeUtils["default"].get(row, firstColumn.property);
          });
          var seriesData = [];
          rows.forEach(function (row) {
            seriesData.push({
              name: _xeUtils["default"].get(row, columns[0].property),
              value: _xeUtils["default"].get(row, columns[1].property)
            });
          });
          var option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              type: 'scroll',
              orient: 'vertical',
              right: 10,
              top: 20,
              bottom: 20,
              data: legendData // selected: data.selected

            },
            series: [{
              name: '姓名',
              type: 'pie',
              radius: '55%',
              center: ['40%', '50%'],
              data: seriesData
            }]
          };
          $chart.setOption(option);
          this.$chart = $chart;
        },
        close: function close() {
          this.$chart.dispose();
          this.$chart = null;
        },
        zoom: function zoom() {
          this.$chart.resize();
        }
      }
    });
  }
};

function checkPrivilege(item, params) {
  var code = item.code;
  var $table = params.$table;

  switch (code) {
    case 'CHART_BAR_X':
    case 'CHART_BAR_Y':
    case 'CHART_LINE':
    case 'CHART_PIE':
      var _$table$getMouseCheck5 = $table.getMouseCheckeds(),
          rows = _$table$getMouseCheck5.rows,
          columns = _$table$getMouseCheck5.columns;

      item.disabled = !rows.length || columns.length < 2;
      break;
  }
}

function handlePrivilegeEvent(params) {
  params.options.forEach(function (list) {
    list.forEach(function (item) {
      checkPrivilege(item, params);

      if (item.children) {
        item.children.forEach(function (child) {
          checkPrivilege(child, params);
        });
      }
    });
  });
}

var VXETablePluginCharts = {
  install: function install(VXETable) {
    if (!VXETable._modal) {
      throw new Error('[vxe-table-plugin-charts] require Modal module.');
    }

    VXETable.interceptor.add('event.show_menu', handlePrivilegeEvent);
    VXETable.menus.mixin(menuMap);
  }
};
exports.VXETablePluginCharts = VXETablePluginCharts;

if (typeof window !== 'undefined' && window.VXETable) {
  window.VXETable.use(VXETablePluginCharts);
}

var _default2 = VXETablePluginCharts;
exports["default"] = _default2;