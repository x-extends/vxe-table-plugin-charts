(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("vxe-table-plugin-charts", ["exports", "xe-utils/methods/xe-utils", "echarts"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("xe-utils/methods/xe-utils"), require("echarts"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.xeUtilsMethodsXeUtils, global.echarts);
    global.VXETablePluginCharts = mod.exports.default;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _xeUtils, _echarts) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = _exports.VXETablePluginCharts = void 0;
  _xeUtils = _interopRequireDefault(_xeUtils);
  _echarts = _interopRequireDefault(_echarts);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  function createChartModal(getOptions) {
    return function (params) {
      var $table = params.$table,
          menu = params.menu;
      var $vxe = $table.$vxe,
          _chartModals = $table._chartModals;
      var modal = $vxe.modal;

      if (!_chartModals) {
        _chartModals = $table._chartModals = [];
      }

      var opts = {
        id: _xeUtils["default"].uniqueId(),
        resize: true,
        mask: false,
        lockView: false,
        showFooter: false,
        escClosable: true,
        width: 600,
        minWidth: 500,
        height: 400,
        minHeight: 300,
        title: menu.name,
        className: 'vxe-table--ignore-areas-clear vxe-table--charts',
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
          show: function show(evntParams) {
            var $modal = evntParams.$modal;
            var elem = $modal.$el.querySelector('.vxe-chart--wrapper');

            if (elem) {
              var $chart = _echarts["default"].init(elem);

              $chart.setOption(getOptions(params));
              $modal.$chart = $chart;
            }
          },
          hide: function hide(evntParams) {
            var $modal = evntParams.$modal;

            _xeUtils["default"].remove(_chartModals, function (id) {
              return id === $modal.id;
            });

            if ($modal.$chart) {
              $modal.$chart.dispose();
              $modal.$chart = null;
            }
          },
          zoom: function zoom(evntParams) {
            var $modal = evntParams.$modal;

            if ($modal.$chart) {
              $modal.$chart.resize();
            }
          }
        }
      };

      _chartModals.push(opts.id);

      modal.open(opts);
    };
  }

  var menuMap = {
    CHART_BAR_X_AXIS: createChartModal(function (params) {
      var $table = params.$table,
          menu = params.menu;
      var cellAreas = $table.getCellAreas();
      var _cellAreas$ = cellAreas[0],
          rows = _cellAreas$.rows,
          cols = _cellAreas$.cols;
      var _menu$params = menu.params,
          chartParams = _menu$params === void 0 ? {} : _menu$params;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || cols[0].property);
      var serieColumns = cols.filter(function (column) {
        return column.property !== categoryColumn.property;
      });
      var legendOpts = {
        data: []
      };
      var seriesOpts = [];
      var yAxisOpts = {
        type: 'category',
        data: rows.map(function (row) {
          return _xeUtils["default"].get(row, categoryColumn.property);
        })
      };
      var seriesLabel = {
        normal: {
          show: true
        }
      };
      serieColumns.forEach(function (column) {
        legendOpts.data.push(column.title);
        seriesOpts.push({
          name: column.title,
          type: 'bar',
          label: seriesLabel,
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
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: legendOpts,
        xAxis: {
          type: 'value'
        },
        yAxis: yAxisOpts,
        series: seriesOpts
      };
      return option;
    }),
    CHART_BAR_Y_AXIS: createChartModal(function (params) {
      var $table = params.$table,
          menu = params.menu;
      var cellAreas = $table.getCellAreas();
      var _cellAreas$2 = cellAreas[0],
          rows = _cellAreas$2.rows,
          cols = _cellAreas$2.cols;
      var _menu$params2 = menu.params,
          chartParams = _menu$params2 === void 0 ? {} : _menu$params2;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || cols[0].property);
      var serieColumns = cols.filter(function (column) {
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
      var seriesLabel = {
        normal: {
          show: true
        }
      };
      serieColumns.forEach(function (column) {
        legendOpts.data.push(column.title);
        seriesOpts.push({
          name: column.title,
          type: 'bar',
          label: seriesLabel,
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
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
      var cellAreas = $table.getCellAreas();
      var _cellAreas$3 = cellAreas[0],
          rows = _cellAreas$3.rows,
          cols = _cellAreas$3.cols;
      var _menu$params3 = menu.params,
          chartParams = _menu$params3 === void 0 ? {} : _menu$params3;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || cols[0].property);
      var serieColumns = cols.filter(function (column) {
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
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
      var cellAreas = $table.getCellAreas();
      var _cellAreas$4 = cellAreas[0],
          rows = _cellAreas$4.rows,
          cols = _cellAreas$4.cols;
      var _menu$params4 = menu.params,
          chartParams = _menu$params4 === void 0 ? {} : _menu$params4;
      var category = chartParams.category;
      var categoryColumn = $table.getColumnByField(category || cols[0].property);
      var serieColumns = cols.filter(function (column) {
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
        grid: {
          left: '4%',
          right: '4%',
          bottom: '3%',
          containLabel: true
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
          var cellAreas = $table.getCellAreas();

          if (cellAreas.length === 1) {
            var _cellAreas$5 = cellAreas[0],
                rows = _cellAreas$5.rows,
                cols = _cellAreas$5.cols;
            var category = chartParams.category;

            if (category) {
              var serieColumns = cols.filter(function (column) {
                return column.property !== category;
              });
              item.disabled = !rows.length || serieColumns.length < 1;
            } else {
              item.disabled = !rows.length || cols.length < 2;
            }
          } else {
            item.disabled = true;
          }

          break;
        }

      case 'CHART_PIE':
        {
          var _cellAreas = $table.getCellAreas();

          if (_cellAreas.length === 1) {
            var _cellAreas$6 = _cellAreas[0],
                _rows = _cellAreas$6.rows,
                _cols = _cellAreas$6.cols;
            var _category = chartParams.category;

            if (_category) {
              var _serieColumns = _cols.filter(function (column) {
                return column.property !== _category;
              });

              item.disabled = !_rows.length || _serieColumns.length !== 1;
            } else {
              item.disabled = !_rows.length || _cols.length !== 2;
            }
          } else {
            item.disabled = true;
          }

          break;
        }
    }
  }

  function handleBeforeDestroyEvent(params) {
    var $table = params.$table;
    var $vxe = $table.$vxe,
        _chartModals = $table._chartModals;

    if (_chartModals) {
      var modal = $vxe.modal;

      _chartModals.slice(0).reverse().forEach(modal.close);
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
   * 基于 vxe-table pro 的图表渲染插件
   */


  var VXETablePluginCharts = {
    install: function install(xtable) {
      var interceptor = xtable.interceptor,
          menus = xtable.menus;
      interceptor.add('beforeDestroy', handleBeforeDestroyEvent);
      interceptor.add('event.showMenu', handlePrivilegeEvent);
      menus.mixin(menuMap);
    }
  };
  _exports.VXETablePluginCharts = VXETablePluginCharts;

  if (typeof window !== 'undefined' && window.VXETable) {
    window.VXETable.use(VXETablePluginCharts);
  }

  var _default2 = VXETablePluginCharts;
  _exports["default"] = _default2;
});