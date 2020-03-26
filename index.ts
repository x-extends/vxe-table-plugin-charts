/* eslint-disable no-unused-vars */
import { CreateElement } from 'vue'
import XEUtils from 'xe-utils/methods/xe-utils'
import {
  VXETable,
  InterceptorParams,
  InterceptorMenuParams,
  MenuLinkParams,
  MenuFirstOption,
  MenuChildOption,
  ColumnConfig,
  ModalEventParams,
  ModalDefaultSlotParams
} from 'vxe-table/lib/vxe-table'
import * as echarts from 'echarts/lib/echarts'
/* eslint-enable no-unused-vars */

let _vxetable: typeof VXETable

function createChartModal (getOptions: (params: MenuLinkParams) => { [ket: string]: any }) {
  return function (params: MenuLinkParams) {
    const { menu } = params
    const $table: any = params.$table
    let chartModals: string[] = $table.chartModals
    if (!chartModals) {
      chartModals = $table.chartModals = []
    }
    const opts = {
      id: XEUtils.uniqueId(),
      resize: true,
      mask: false,
      lockView: false,
      showFooter: false,
      width: 600,
      height: 400,
      title: menu.name,
      slots: {
        default (params: ModalDefaultSlotParams, h: CreateElement) {
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
      events: {
        show (evntParams: ModalEventParams) {
          const $modal: any = evntParams.$modal
          const $chart = echarts.init($modal.$el.querySelector('.vxe-chart--wrapper'))
          $chart.setOption(getOptions(params))
          $modal.$chart = $chart
        },
        hide (evntParams: ModalEventParams) {
          const $modal: any = evntParams.$modal
          XEUtils.remove(chartModals, id => id === $modal.id)
          $modal.$chart.dispose()
          $modal.$chart = null
        },
        zoom (evntParams: ModalEventParams) {
          const $modal: any = evntParams.$modal
          $modal.$chart.resize()
        }
      }
    }
    chartModals.push(opts.id)
    _vxetable.modal.open(opts)
  }
}

interface legendOpts {
  data: Array<any>;
}

const menuMap = {
  CHART_BAR_X_AXIS: createChartModal((params) => {
    const $table: any = params.$table
    const { menu } = params
    const { rows, columns }: { rows: any[], columns: ColumnConfig[] } = $table.getSelectedRanges()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || columns[0].property)
    const serieColumns = columns.filter((column) => column.property !== categoryColumn.property)
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
        type: 'bar',
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
      legend: legendOpts,
      xAxis: xAxisOpts,
      yAxis: {
        type: 'value'
      },
      series: seriesOpts
    }
    return option
  }),
  CHART_BAR_Y_AXIS: createChartModal((params) => {
    const $table: any = params.$table
    const { menu } = params
    const { rows, columns }: { rows: any[], columns: ColumnConfig[] } = $table.getSelectedRanges()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || columns[0].property)
    const serieColumns = columns.filter((column) => column.property !== categoryColumn.property)
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
        type: 'bar',
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
    const $table: any = params.$table
    const { menu } = params
    const { rows, columns }: { rows: any[], columns: ColumnConfig[] } = $table.getSelectedRanges()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || columns[0].property)
    const serieColumns = columns.filter((column) => column.property !== categoryColumn.property)
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
      xAxis: xAxisOpts,
      yAxis: {
        type: 'value'
      },
      series: seriesOpts
    }
    return option
  }),
  CHART_PIE: createChartModal((params) => {
    const $table: any = params.$table
    const { menu } = params
    const { rows, columns }: { rows: any[], columns: ColumnConfig[] } = $table.getSelectedRanges()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    const categoryColumn = $table.getColumnByField(category || columns[0].property)
    const serieColumns = columns.filter((column) => column.property !== categoryColumn.property)
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

function checkPrivilege (item: MenuFirstOption | MenuChildOption, params: InterceptorMenuParams) {
  const $table: any = params.$table
  const { code, params: chartParams = {} } = item
  switch (code) {
    case 'CHART_BAR_X_AXIS':
    case 'CHART_BAR_Y_AXIS':
    case 'CHART_LINE': {
      const { rows, columns }: { rows: any[], columns: ColumnConfig[] } = $table.getSelectedRanges()
      const { category } = chartParams
      if (category) {
        const serieColumns = columns.filter((column) => column.property !== category)
        item.disabled = !rows.length || serieColumns.length < 1
      } else {
        item.disabled = !rows.length || columns.length < 2
      }
    }
      break
    case 'CHART_PIE': {
      const { rows, columns }: { rows: any[], columns: ColumnConfig[] } = $table.getSelectedRanges()
      const { category } = chartParams
      if (category) {
        const serieColumns = columns.filter((column) => column.property !== category)
        item.disabled = !rows.length || serieColumns.length !== 1
      } else {
        item.disabled = !rows.length || columns.length !== 2
      }
    }
      break
  }
}

function handleBeforeDestroyEvent (params: InterceptorParams) {
  const $table: any = params.$table
  const { chartModals }: { chartModals: string[] } = $table
  if (chartModals) {
    chartModals.slice(0).forEach((id) => _vxetable.modal.close(id))
  }
}

function handlePrivilegeEvent (params: InterceptorMenuParams) {
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
 * 基于 vxe-table 表格的图表渲染插件
 */
export const VXETablePluginCharts = {
  install  (xtable: typeof VXETable) {
    const { v, interceptor, menus } = xtable
    if (v !== 'v2') {
      throw new Error('[vxe-table-plugin-charts] V2 version is required.')
    }
    _vxetable = xtable
    interceptor.add('beforeDestroy', handleBeforeDestroyEvent)
    interceptor.add('event.showMenu', handlePrivilegeEvent)
    menus.mixin(menuMap)
  }
}

if (typeof window !== 'undefined' && window.VXETable) {
  window.VXETable.use(VXETablePluginCharts)
}

export default VXETablePluginCharts
