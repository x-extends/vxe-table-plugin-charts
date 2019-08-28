import XEUtils from 'xe-utils'
import echarts from 'echarts/lib/echarts'

// 仅用于本地调试
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/chart/pie'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/grid'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/legend'
// import 'echarts/lib/component/legendScroll'

function createChartModal (getOptions) {
  return function (params) {
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
        default (params, h) {
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

const menuMap = {
  CHART_BAR_X_AXIS: createChartModal(params => {
    const { $table } = params
    const { rows, columns } = $table.getMouseCheckeds()
    let firstColumn = columns[0]
    let legendOpts = {
      data: []
    }
    let seriesOpts = []
    let xAxisOpts = {
      type: 'category',
      data: rows.map(row => XEUtils.get(row, firstColumn.property))
    }
    columns.forEach((column, index) => {
      if (index) {
        legendOpts.data.push(column.title)
        seriesOpts.push({
          name: column.title,
          type: 'bar',
          data: rows.map(row => XEUtils.get(row, column.property))
        })
      }
    })
    const option = {
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
    }
    return option
  }),
  CHART_BAR_Y_AXIS: createChartModal(params => {
    const { $table } = params
    const { rows, columns } = $table.getMouseCheckeds()
    let firstColumn = columns[0]
    let legendOpts = {
      data: []
    }
    let seriesOpts = []
    let xAxisOpts = {
      type: 'category',
      data: rows.map(row => XEUtils.get(row, firstColumn.property))
    }
    columns.forEach((column, index) => {
      if (index) {
        legendOpts.data.push(column.title)
        seriesOpts.push({
          name: column.title,
          type: 'bar',
          data: rows.map(row => XEUtils.get(row, column.property))
        })
      }
    })
    const option = {
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
    }
    return option
  }),
  CHART_LINE: createChartModal(params => {
    const { $table } = params
    const { rows, columns } = $table.getMouseCheckeds()
    let firstColumn = columns[0]
    let legendOpts = {
      data: []
    }
    let seriesOpts = []
    let xAxisOpts = {
      type: 'category',
      data: rows.map(row => XEUtils.get(row, firstColumn.property))
    }
    columns.forEach((column, index) => {
      if (index) {
        legendOpts.data.push(column.title)
        seriesOpts.push({
          name: column.title,
          type: 'line',
          data: rows.map(row => XEUtils.get(row, column.property))
        })
      }
    })
    let option = {
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
    }
    return option
  }),
  CHART_PIE: createChartModal(params => {
    const { $table } = params
    const { rows, columns } = $table.getMouseCheckeds()
    let firstColumn = columns[0]
    let legendData = rows.map(row => XEUtils.get(row, firstColumn.property))
    let seriesData = []
    rows.forEach(row => {
      seriesData.push({
        name: XEUtils.get(row, columns[0].property),
        value: XEUtils.get(row, columns[1].property)
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
          name: '姓名',
          type: 'pie',
          radius: '55%',
          center: ['40%', '50%'],
          data: seriesData
        }
      ]
    }
    return option
  })
}

function checkPrivilege (item, params) {
  let { code } = item
  let { $table } = params
  switch (code) {
    case 'CHART_BAR_X_AXIS':
    case 'CHART_BAR_Y_AXIS':
    case 'CHART_LINE':
    case 'CHART_PIE':
      const { rows, columns } = $table.getMouseCheckeds()
      item.disabled = !rows.length || columns.length < 2
      break
  }
}

function handlePrivilegeEvent (params) {
  params.options.forEach(list => {
    list.forEach(item => {
      checkPrivilege(item, params)
      if (item.children) {
        item.children.forEach(child => {
          checkPrivilege(child, params)
        })
      }
    })
  })
}

export const VXETablePluginCharts = {
  install (VXETable) {
    let { interceptor, menus } = VXETable
    if (!VXETable._modal) {
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
