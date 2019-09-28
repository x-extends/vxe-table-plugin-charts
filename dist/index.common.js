"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VXETablePluginCharts = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _echarts = _interopRequireDefault(require("echarts/lib/echarts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
          var $chart = _echarts["default"].init(this.$el.querySelector('.vxe-chart--wrapper'));

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

    var _$table$getMouseCheck = $table.getMouseCheckeds(),
        rows = _$table$getMouseCheck.rows,
        columns = _$table$getMouseCheck.columns;

    var _menu$params = menu.params,
        chartParams = _menu$params === void 0 ? {} : _menu$params;
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
        return _xeUtils["default"].get(row, categoryColumn.property);
      })
    };
    serieColumns.forEach(function (column) {
      legendOpts.data.push(column.title);
      seriesOpts.push({
        name: column.title,
        type: 'bar',
        data: rows.map(function (row) {
          return _xeUtils["default"].get(row, column.property);
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

    var _$table$getMouseCheck2 = $table.getMouseCheckeds(),
        rows = _$table$getMouseCheck2.rows,
        columns = _$table$getMouseCheck2.columns;

    var _menu$params2 = menu.params,
        chartParams = _menu$params2 === void 0 ? {} : _menu$params2;
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
        return _xeUtils["default"].get(row, categoryColumn.property);
      })
    };
    serieColumns.forEach(function (column) {
      legendOpts.data.push(column.title);
      seriesOpts.push({
        name: column.title,
        type: 'bar',
        data: rows.map(function (row) {
          return _xeUtils["default"].get(row, column.property);
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

    var _$table$getMouseCheck3 = $table.getMouseCheckeds(),
        rows = _$table$getMouseCheck3.rows,
        columns = _$table$getMouseCheck3.columns;

    var _menu$params3 = menu.params,
        chartParams = _menu$params3 === void 0 ? {} : _menu$params3;
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
        return _xeUtils["default"].get(row, categoryColumn.property);
      })
    };
    serieColumns.forEach(function (column) {
      legendOpts.data.push(column.title);
      seriesOpts.push({
        name: column.title,
        type: 'line',
        data: rows.map(function (row) {
          return _xeUtils["default"].get(row, column.property);
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

    var _$table$getMouseCheck4 = $table.getMouseCheckeds(),
        rows = _$table$getMouseCheck4.rows,
        columns = _$table$getMouseCheck4.columns;

    var _menu$params4 = menu.params,
        chartParams = _menu$params4 === void 0 ? {} : _menu$params4;
    var category = chartParams.category;
    var categoryColumn = $table.getColumnByField(category || columns[0].property);
    var serieColumns = columns.filter(function (column) {
      return column.property !== categoryColumn.property;
    });
    var serieColumn = serieColumns[0];
    var legendData = rows.map(function (row) {
      return _xeUtils["default"].get(row, categoryColumn.property);
    });
    var seriesData = [];
    rows.forEach(function (row) {
      seriesData.push({
        name: _xeUtils["default"].get(row, categoryColumn.property),
        value: _xeUtils["default"].get(row, serieColumn.property)
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
      _item$params = item.params,
      chartParams = _item$params === void 0 ? {} : _item$params;

  switch (code) {
    case 'CHART_BAR_X_AXIS':
    case 'CHART_BAR_Y_AXIS':
    case 'CHART_LINE':
      {
        var _$table$getMouseCheck5 = $table.getMouseCheckeds(),
            rows = _$table$getMouseCheck5.rows,
            columns = _$table$getMouseCheck5.columns;

        var category = chartParams.category;

        if (category) {
          var serieColumns = columns.filter(function (column) {
            return column.property !== category;
          });
          item.disabled = !rows.length || serieColumns.length < 1;
        } else {
          item.disabled = !rows.length || columns.length < 2;
        }
      }
      break;

    case 'CHART_PIE':
      {
        var _$table$getMouseCheck6 = $table.getMouseCheckeds(),
            _rows = _$table$getMouseCheck6.rows,
            _columns = _$table$getMouseCheck6.columns;

        var _category = chartParams.category;

        if (_category) {
          var _serieColumns = _columns.filter(function (column) {
            return column.property !== _category;
          });

          item.disabled = !_rows.length || _serieColumns.length !== 1;
        } else {
          item.disabled = !_rows.length || _columns.length !== 2;
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

var VXETablePluginCharts = {
  install: function install(VXETable) {
    var interceptor = VXETable.interceptor,
        menus = VXETable.menus;

    if (!VXETable._modal) {
      throw new Error('[vxe-table-plugin-charts] require Modal module.');
    }

    interceptor.add('event.show_menu', handlePrivilegeEvent);
    menus.mixin(menuMap);
  }
};
exports.VXETablePluginCharts = VXETablePluginCharts;

if (typeof window !== 'undefined' && window.VXETable) {
  window.VXETable.use(VXETablePluginCharts);
}

var _default2 = VXETablePluginCharts;
exports["default"] = _default2;
