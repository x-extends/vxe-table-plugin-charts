import XEUtils from 'xe-utils/methods/xe-utils'
import echarts from 'echarts/lib/echarts'
import { VXETable } from 'vxe-table'

function createChartModal (getOptions: any) {
  return function (params: any) {
    let { menu } = params
    this.$XModal({
      resize: true,
      mask: false,
      lockView: false,
      showFooter: false,
      width: 600,
      height: 400,
      title: menu.name,
      slots: {
        default (params: any, h: Function) {
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
        show () {
          const $chart = echarts.init(this.$el.querySelector('.vxe-chart--wrapper'))
          $chart.setOption(getOptions(params))
          this.$chart = $chart
        },
        close () {
          // 旧版本，即将废弃
          this.$chart.dispose()
          this.$chart = null
        },
        hide () {
          this.$chart.dispose()
          this.$chart = null
        },
        zoom () {
          this.$chart.resize()
        }
      }
    })
  }
}

interface legendOpts {
  data: Array<any>;
}

const menuMap = {
  CHART_BAR_X_AXIS: createChartModal((params: any) => {
    const { $table, menu } = params
    const { rows, columns } = $table.getMouseCheckeds()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    let categoryColumn = $table.getColumnByField(category || columns[0].property)
    let serieColumns = columns.filter((column: any) => column.property !== categoryColumn.property)
    let legendOpts: legendOpts = {
      data: []
    }
    let seriesOpts: Array<any> = []
    let xAxisOpts = {
      type: 'category',
      data: rows.map((row: any) => XEUtils.get(row, categoryColumn.property))
    }
    serieColumns.forEach((column: any) => {
      legendOpts.data.push(column.title)
      seriesOpts.push({
        name: column.title,
        type: 'bar',
        data: rows.map((row: any) => XEUtils.get(row, column.property))
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
  CHART_BAR_Y_AXIS: createChartModal((params: any) => {
    const { $table, menu } = params
    const { rows, columns } = $table.getMouseCheckeds()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    let categoryColumn = $table.getColumnByField(category || columns[0].property)
    let serieColumns = columns.filter((column: any) => column.property !== categoryColumn.property)
    let legendOpts: legendOpts = {
      data: []
    }
    let seriesOpts: Array<any> = []
    let xAxisOpts = {
      type: 'category',
      data: rows.map((row: any) => XEUtils.get(row, categoryColumn.property))
    }
    serieColumns.forEach((column: any) => {
      legendOpts.data.push(column.title)
      seriesOpts.push({
        name: column.title,
        type: 'bar',
        data: rows.map((row: any) => XEUtils.get(row, column.property))
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
  CHART_LINE: createChartModal((params: any) => {
    const { $table, menu } = params
    const { rows, columns } = $table.getMouseCheckeds()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    let categoryColumn = $table.getColumnByField(category || columns[0].property)
    let serieColumns = columns.filter((column: any) => column.property !== categoryColumn.property)
    let legendOpts: legendOpts = {
      data: []
    }
    let seriesOpts: Array<any> = []
    let xAxisOpts = {
      type: 'category',
      data: rows.map((row: any) => XEUtils.get(row, categoryColumn.property))
    }
    serieColumns.forEach((column: any) => {
      legendOpts.data.push(column.title)
      seriesOpts.push({
        name: column.title,
        type: 'line',
        data: rows.map((row: any) => XEUtils.get(row, column.property))
      })
    })
    let option = {
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
  CHART_PIE: createChartModal((params: any) => {
    const { $table, menu } = params
    const { rows, columns } = $table.getMouseCheckeds()
    const { params: chartParams = {} } = menu
    const { category } = chartParams
    let categoryColumn = $table.getColumnByField(category || columns[0].property)
    let serieColumns = columns.filter((column: any) => column.property !== categoryColumn.property)
    let serieColumn = serieColumns[0]
    let legendData = rows.map((row: any) => XEUtils.get(row, categoryColumn.property))
    let seriesData: Array<any> = []
    rows.forEach((row: any) => {
      seriesData.push({
        name: XEUtils.get(row, categoryColumn.property),
        value: XEUtils.get(row, serieColumn.property)
      })
    })
    let option = {
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

function checkPrivilege (item: any, params: any) {
  const { $table } = params
  const { code, params: chartParams = {} } = item
  switch (code) {
    case 'CHART_BAR_X_AXIS':
    case 'CHART_BAR_Y_AXIS':
    case 'CHART_LINE': {
      const { rows, columns } = $table.getMouseCheckeds()
      const { category } = chartParams
      if (category) {
        let serieColumns = columns.filter((column: any) => column.property !== category)
        item.disabled = !rows.length || serieColumns.length < 1
      } else {
        item.disabled = !rows.length || columns.length < 2
      }
    }
      break
    case 'CHART_PIE': {
      const { rows, columns } = $table.getMouseCheckeds()
      const { category } = chartParams
      if (category) {
        let serieColumns = columns.filter((column: any) => column.property !== category)
        item.disabled = !rows.length || serieColumns.length !== 1
      } else {
        item.disabled = !rows.length || columns.length !== 2
      }
    }
      break
  }
}

function handlePrivilegeEvent (params: any) {
  params.options.forEach((list: Array<any>) => {
    list.forEach((item: any) => {
      checkPrivilege(item, params)
      if (item.children) {
        item.children.forEach((child: any) => {
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
  install (xtable: typeof VXETable) {
    let { interceptor, menus, _modal } = xtable
    if (!_modal) {
      throw new Error('[vxe-table-plugin-charts] require Modal module.')
    }
    interceptor.add('event.show_menu', handlePrivilegeEvent)
    menus.mixin(menuMap)
  }
}

if (typeof window !== 'undefined' && window.VXETable) {
  window.VXETable.use(VXETablePluginCharts)
}

export default VXETablePluginCharts
