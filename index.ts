/* eslint-disable no-unused-vars */
import { h } from 'vue'
import XEUtils from 'xe-utils/ctor'
import {
  VXETableInstance,
  VxeTableDefines,
  VxeGlobalInterceptorHandles,
  VxeGlobalMenusHandles,
  VxeModalOptions,
  VXETableByVueProperty
} from 'vxe-table/lib/vxe-table'
import * as echarts from 'echarts/lib/echarts'

interface CMItem {
  id: string;
  $chart: any;
}

declare module 'vxe-table/lib/vxe-table' {
  interface TableInternalData {
    _chartModals: CMItem[];
  }
}
/* eslint-enable no-unused-vars */

function createChartModal (getOptions: (params: VxeGlobalMenusHandles.MenusCallbackParams) => any) {
  return function (params) {
    const { $table, menu } = params
    const { instance, internalData } = $table
    let { _chartModals } = internalData
    const { modal } = instance.appContext.config.globalProperties.$vxe as VXETableByVueProperty
    if (!_chartModals) {
      _chartModals = internalData._chartModals = []
    }
    const cmItem: CMItem = {
      id: XEUtils.uniqueId(),
      $chart: null
    }
    const opts: VxeModalOptions = {
      id: cmItem.id,
      resize: true,
      mask: false,
      lockView: false,
      escClosable: true,
      width: 600,
      minWidth: 500,
      height: 400,
      minHeight: 300,
      title: menu.name,
      className: 'vxe-table--ignore-areas-clear vxe-table--charts',
      slots: {
        default () {
          return [
            h('div', {
              class: 'vxe-chart--wrapper'
            }, [
              h('div', {
                class: 'vxe-chart--panel'
              })
            ])
          ]
        }
      },
      onShow (evntParams) {
        const { $modal } = evntParams
        const { refMaps } = $modal
        const { refElem } = refMaps
        const chartElem: HTMLDivElement | null = refElem.value.querySelector('.vxe-chart--wrapper')
        if (chartElem) {
          const $chart = echarts.init(chartElem)
          $chart.setOption(getOptions(params))
          cmItem.$chart = $chart
        }
      },
      onHide (evntParams) {
        const { $modal } = evntParams
        XEUtils.remove(_chartModals, item => item.id === $modal.props.id)
        if (cmItem.$chart) {
          cmItem.$chart.dispose()
          cmItem.$chart = null
        }
      },
      onZoom () {
        if (cmItem.$chart) {
          cmItem.$chart.resize()
        }
      }
    }
    _chartModals.push(cmItem)
    modal.open(opts)
  } as VxeGlobalMenusHandles.MenusCallback
}

interface legendOpts {
  data: any[];
}

const menuMap = {
  CHART_BAR_X_AXIS: createChartModal((params) => {
    const { $table, menu } = params
    const cellAreas = $table.getCellAreas()
    const { rows, cols } = cellAreas[0]
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || cols[0].property)
    const serieColumns = cols.filter((column) => column.property !== categoryColumn.property)
    const legendOpts: legendOpts = {
      data: []
    }
    const seriesOpts: any[] = []
    const yAxisOpts = {
      type: 'category',
      data: rows.map((row) => XEUtils.get(row, categoryColumn.property))
    }
    // const seriesLabel = {
    //   normal: {
    //     show: true
    //   }
    // }
    serieColumns.forEach((column) => {
      legendOpts.data.push(column.title)
      seriesOpts.push({
        name: column.title,
        type: 'bar',
        // label: seriesLabel,
        data: rows.map((row) => XEUtils.get(row, column.property))
      })
    })
    const option = {
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
    }
    return option
  }),
  CHART_BAR_Y_AXIS: createChartModal((params) => {
    const { $table, menu } = params
    const cellAreas = $table.getCellAreas()
    const { rows, cols } = cellAreas[0]
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || cols[0].property)
    const serieColumns = cols.filter((column) => column.property !== categoryColumn.property)
    const legendOpts: legendOpts = {
      data: []
    }
    const seriesOpts: any[] = []
    const xAxisOpts = {
      type: 'category',
      data: rows.map((row) => XEUtils.get(row, categoryColumn.property))
    }
    // const seriesLabel = {
    //   normal: {
    //     show: true
    //   }
    // }
    serieColumns.forEach((column) => {
      legendOpts.data.push(column.title)
      seriesOpts.push({
        name: column.title,
        type: 'bar',
        // label: seriesLabel,
        data: rows.map((row) => XEUtils.get(row, column.property))
      })
    })
    const option = {
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
    }
    return option
  }),
  CHART_LINE: createChartModal((params) => {
    const { $table, menu } = params
    const cellAreas = $table.getCellAreas()
    const { rows, cols } = cellAreas[0]
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || cols[0].property)
    const serieColumns = cols.filter((column) => column.property !== categoryColumn.property)
    const legendOpts: legendOpts = {
      data: []
    }
    const seriesOpts: any[] = []
    const xAxisOpts = {
      type: 'category',
      data: rows.map((row) => XEUtils.get(row, categoryColumn.property))
    }
    serieColumns.forEach((column) => {
      legendOpts.data.push(column.title)
      seriesOpts.push({
        name: column.title,
        type: 'line',
        data: rows.map((row) => XEUtils.get(row, column.property))
      })
    })
    const option = {
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
    }
    return option
  }),
  CHART_PIE: createChartModal((params) => {
    const { $table, menu } = params
    const cellAreas = $table.getCellAreas()
    const { rows, cols } = cellAreas[0]
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || cols[0].property)
    const serieColumns = cols.filter((column) => column.property !== categoryColumn.property)
    const serieColumn = serieColumns[0]
    const legendData = rows.map((row) => XEUtils.get(row, categoryColumn.property))
    const seriesData: any[] = []
    rows.forEach((row) => {
      seriesData.push({
        name: XEUtils.get(row, categoryColumn.property),
        value: XEUtils.get(row, serieColumn.property)
      })
    })
    const option = {
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
        data: legendData
        // selected: data.selected
      },
      grid: {
        left: '4%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      series: [
        {
          name: serieColumn.title,
          type: 'pie',
          radius: '50%',
          center: ['40%', '50%'],
          data: seriesData
        }
      ]
    }
    return option
  })
}

function checkPrivilege (item: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption, params: VxeGlobalInterceptorHandles.InterceptorMenuParams) {
  const { $table, column } = params
  const { code, params: chartParams = {} } = item
  switch (code) {
    case 'CHART_BAR_X_AXIS':
    case 'CHART_BAR_Y_AXIS':
    case 'CHART_LINE':
    case 'CHART_PIE': {
      item.disabled = !column
      if (column) {
        const cellAreas = $table.getCellAreas()
        const validArea = cellAreas.length === 1
        item.disabled = !validArea
        if (validArea) {
          const { rows, cols } = cellAreas[0]
          const { category } = chartParams
          switch (code) {
            case 'CHART_BAR_X_AXIS':
            case 'CHART_BAR_Y_AXIS':
            case 'CHART_LINE': {
              if (category) {
                const serieColumns = cols.filter((column) => column.property !== category)
                item.disabled = !rows.length || serieColumns.length < 1
              } else {
                item.disabled = !rows.length || cols.length < 2
              }
              break
            }
            case 'CHART_PIE': {
              if (category) {
                const serieColumns = cols.filter((column) => column.property !== category)
                item.disabled = !rows.length || serieColumns.length !== 1
              } else {
                item.disabled = !rows.length || cols.length !== 2
              }
              break
            }
          }
        }
      }
      break
    }
  }
}

function handleBeforeDestroyEvent (params: VxeGlobalInterceptorHandles.InterceptorParams) {
  const { $table } = params
  const { instance, internalData } = $table
  const { _chartModals } = internalData
  if (_chartModals) {
    const { modal } = instance.appContext.config.globalProperties.$vxe as VXETableByVueProperty
    _chartModals.slice(0).reverse().forEach((item) => {
      modal.close(item.id)
    })
  }
}

function handlePrivilegeEvent (params: VxeGlobalInterceptorHandles.InterceptorMenuParams) {
  params.options.forEach((list) => {
    list.forEach((item) => {
      checkPrivilege(item, params)
      if (item.children) {
        item.children.forEach((child) => {
          checkPrivilege(child, params)
        })
      }
    })
  })
}

/**
 * 基于 vxe-table pro 的图表渲染插件
 */
export const VXETablePluginCharts = {
  install  (xtable: VXETableInstance) {
    const { interceptor, menus } = xtable
    interceptor.add('beforeDestroy', handleBeforeDestroyEvent)
    interceptor.add('event.showMenu', handlePrivilegeEvent)
    menus.mixin(menuMap)
  }
}

if (typeof window !== 'undefined' && window.VXETable) {
  window.VXETable.use(VXETablePluginCharts)
}

export default VXETablePluginCharts
