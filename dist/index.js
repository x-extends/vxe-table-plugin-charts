(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("vxe-table-plugin-charts", [], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.VXETablePluginCharts = mod.exports.default;
  }
})(this, function () {
  "use strict";

  exports.__esModule = true;

  var xe_utils_1 = require("xe-utils");

  var echarts = require("echarts");

  function createChartModal(getOptions) {
    return function (params) {
      var menu = params.menu;
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
            var $chart = echarts.init(this.$el.querySelector('.vxe-chart--wrapper'));
            $chart.setOption(getOptions(params));
            this.$chart = $chart;
          },
          close: function close() {
            // 旧版本，即将废弃
            this.$chart.dispose();
            this.$chart = null;
          },
          hide: function hide() {
            this.$chart.dispose();
            this.$chart = null;
          },
          zoom: function zoom() {
            this.$chart.resize();
          }
        }
      });
    };
  }

  var menuMap = {
    CHART_BAR_X_AXIS: createChartModal(function (params) {
      var $table = params.$table,
          menu = params.menu;

      var _a = $table.getMouseCheckeds(),
          rows = _a.rows,
          columns = _a.columns;

      var _b = menu.params,
          chartParams = _b === void 0 ? {} : _b;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || columns[0].property);
      var serieColumns = columns.filter(function (column) {
        return column.property !== categoryColumn.property;
      });
      var legendOpts = {
        data: []
      };
      var seriesOpts = [];
      var xAxisOpts = {
        type: 'category',
        data: rows.map(function (row) {
          return xe_utils_1["default"].get(row, categoryColumn.property);
        })
      };
      serieColumns.forEach(function (column) {
        legendOpts.data.push(column.title);
        seriesOpts.push({
          name: column.title,
          type: 'bar',
          data: rows.map(function (row) {
            return xe_utils_1["default"].get(row, column.property);
          })
        });
      });
      var option = {
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
      return option;
    }),
    CHART_BAR_Y_AXIS: createChartModal(function (params) {
      var $table = params.$table,
          menu = params.menu;

      var _a = $table.getMouseCheckeds(),
          rows = _a.rows,
          columns = _a.columns;

      var _b = menu.params,
          chartParams = _b === void 0 ? {} : _b;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || columns[0].property);
      var serieColumns = columns.filter(function (column) {
        return column.property !== categoryColumn.property;
      });
      var legendOpts = {
        data: []
      };
      var seriesOpts = [];
      var xAxisOpts = {
        type: 'category',
        data: rows.map(function (row) {
          return xe_utils_1["default"].get(row, categoryColumn.property);
        })
      };
      serieColumns.forEach(function (column) {
        legendOpts.data.push(column.title);
        seriesOpts.push({
          name: column.title,
          type: 'bar',
          data: rows.map(function (row) {
            return xe_utils_1["default"].get(row, column.property);
          })
        });
      });
      var option = {
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
      return option;
    }),
    CHART_LINE: createChartModal(function (params) {
      var $table = params.$table,
          menu = params.menu;

      var _a = $table.getMouseCheckeds(),
          rows = _a.rows,
          columns = _a.columns;

      var _b = menu.params,
          chartParams = _b === void 0 ? {} : _b;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || columns[0].property);
      var serieColumns = columns.filter(function (column) {
        return column.property !== categoryColumn.property;
      });
      var legendOpts = {
        data: []
      };
      var seriesOpts = [];
      var xAxisOpts = {
        type: 'category',
        data: rows.map(function (row) {
          return xe_utils_1["default"].get(row, categoryColumn.property);
        })
      };
      serieColumns.forEach(function (column) {
        legendOpts.data.push(column.title);
        seriesOpts.push({
          name: column.title,
          type: 'line',
          data: rows.map(function (row) {
            return xe_utils_1["default"].get(row, column.property);
          })
        });
      });
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: legendOpts,
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
      return option;
    }),
    CHART_PIE: createChartModal(function (params) {
      var $table = params.$table,
          menu = params.menu;

      var _a = $table.getMouseCheckeds(),
          rows = _a.rows,
          columns = _a.columns;

      var _b = menu.params,
          chartParams = _b === void 0 ? {} : _b;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || columns[0].property);
      var serieColumns = columns.filter(function (column) {
        return column.property !== categoryColumn.property;
      });
      var serieColumn = serieColumns[0];
      var legendData = rows.map(function (row) {
        return xe_utils_1["default"].get(row, categoryColumn.property);
      });
      var seriesData = [];
      rows.forEach(function (row) {
        seriesData.push({
          name: xe_utils_1["default"].get(row, categoryColumn.property),
          value: xe_utils_1["default"].get(row, serieColumn.property)
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
          name: serieColumn.title,
          type: 'pie',
          radius: '50%',
          center: ['40%', '50%'],
          data: seriesData
        }]
      };
      return option;
    })
  };

  function checkPrivilege(item, params) {
    var $table = params.$table;
    var code = item.code,
        _a = item.params,
        chartParams = _a === void 0 ? {} : _a;

    switch (code) {
      case 'CHART_BAR_X_AXIS':
      case 'CHART_BAR_Y_AXIS':
      case 'CHART_LINE':
        {
          var _b = $table.getMouseCheckeds(),
              rows = _b.rows,
              columns = _b.columns;

          var category_1 = chartParams.category;

          if (category_1) {
            var serieColumns = columns.filter(function (column) {
              return column.property !== category_1;
            });
            item.disabled = !rows.length || serieColumns.length < 1;
          } else {
            item.disabled = !rows.length || columns.length < 2;
          }
        }
        break;

      case 'CHART_PIE':
        {
          var _c = $table.getMouseCheckeds(),
              rows = _c.rows,
              columns = _c.columns;

          var category_2 = chartParams.category;

          if (category_2) {
            var serieColumns = columns.filter(function (column) {
              return column.property !== category_2;
            });
            item.disabled = !rows.length || serieColumns.length !== 1;
          } else {
            item.disabled = !rows.length || columns.length !== 2;
          }
        }
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
  /**
   * 基于 vxe-table 表格的图表渲染插件
   */


  exports.VXETablePluginCharts = {
    install: function install(xtable) {
      var interceptor = xtable.interceptor,
          menus = xtable.menus,
          _modal = xtable._modal;

      if (!_modal) {
        throw new Error('[vxe-table-plugin-charts] require Modal module.');
      }

      interceptor.add('event.show_menu', handlePrivilegeEvent);
      menus.mixin(menuMap);
    }
  };

  if (typeof window !== 'undefined' && window.VXETable) {
    window.VXETable.use(exports.VXETablePluginCharts);
  }

  exports["default"] = exports.VXETablePluginCharts;
});