# vxe-table-plugin-charts

[![npm version](https://img.shields.io/npm/v/vxe-table-plugin-charts.svg?style=flat-square)](https://www.npmjs.org/package/vxe-table-plugin-charts)
[![npm downloads](https://img.shields.io/npm/dm/vxe-table-plugin-charts.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vxe-table-plugin-charts)
[![gzip size: JS](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-charts/dist/index.min.js?compression=gzip&label=gzip%20size:%20JS)](https://unpkg.com/vxe-table-plugin-charts/dist/index.min.js)
[![gzip size: CSS](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-charts/dist/style.min.css?compression=gzip&label=gzip%20size:%20CSS)](https://unpkg.com/vxe-table-plugin-charts/dist/style.min.css)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/xuliangzhan/vxe-table-plugin-charts/blob/master/LICENSE)

基于 [vxe-table](https://github.com/xuliangzhan/vxe-table) 表格的图表渲染插件

## Installing

```shell
npm install xe-utils vxe-table vxe-table-plugin-charts echarts
```

```javascript
import Vue from 'vue'
import VXETable from 'vxe-table'
import VXETablePluginCharts from 'vxe-table-plugin-charts'
import 'vxe-table-plugin-charts/dist/style.css'
// 按需导入图表依赖模块
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'

Vue.use(VXETable)
VXETable.use(VXETablePluginCharts)
```

## API

### Context menu codes

| code 编码 | describe 描述 | params 参数 |
|------|------|------|
| CHART_BAR_X | 横向柱状图 | {category?: field} |
| CHART_BAR_Y  | 纵向柱状图 | {category?: field} |
| CHART_LINE  | 折线图 | {category?: field} |
| CHART_PIE  | 饼图 | {category: field} |

## demo

```html
<vxe-table
  border
  resizable
  height="500"
  :data.sync="tableData"
  :mouse-config="{ selected: true, checked: true }"
  :context-menu="{body: {options: bodyMenus}}"
  :edit-config="{trigger: 'dblclick', mode: 'cell'}">
  <vxe-table-column type="index" width="60"></vxe-table-column>
  <vxe-table-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></vxe-table-column>
  <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
  <vxe-table-column field="age" title="Age"></vxe-table-column>
  <vxe-table-column field="rate" title="Rate"></vxe-table-column>
</vxe-table>
```

```javascript
export default {
  data () {
    return {
      tableData: [
        {
          id: 100,
          name: 'Test1',
          nickname: 'Nickname1',
          sex: '1',
          age: 26,
          rate: '3'
        }
      ],
      bodyMenus: [
        [
          {
            code: 'CHART_BAR_Y',
            name: '柱状图'
          }
        ]
      ]
    }
  }
}
```

## License

MIT License, 2019-present, Xu Liangzhan
