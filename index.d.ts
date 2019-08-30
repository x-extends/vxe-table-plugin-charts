import VXETable from 'vxe-table'

export interface VXETablePluginStatic {
  install(xTable: typeof VXETable): void;
}

/**
 * 基于 vxe-table 表格的图表渲染插件
 */
declare var VXETablePluginCharts: VXETablePluginStatic;

export default VXETablePluginCharts;