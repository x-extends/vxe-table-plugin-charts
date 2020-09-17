# vxe-table-plugin-charts

[![gitee star](https://gitee.com/xuliangzhan_admin/vxe-table-plugin-charts/badge/star.svg?theme=dark)](https://gitee.com/xuliangzhan_admin/vxe-table-plugin-charts/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table-plugin-charts.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table-plugin-charts)
[![npm downloads](https://img.shields.io/npm/dm/vxe-table-plugin-charts.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vxe-table-plugin-charts)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

基于 [vxe-table](https://www.npmjs.com/package/vxe-table) pro 的图表渲染插件

## Installing

```shell
npm install xe-utils vxe-table vxe-table-plugin-charts echarts
```

```javascript
// ...
import echarts from 'echarts'
import VXETablePluginCharts from 'vxe-table-plugin-charts'
import 'vxe-table-plugin-charts/dist/style.css'
// ...

VXETable.use(VXETablePluginCharts)
```

## Import on demand

```javascript
// ...
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import VXETablePluginCharts from 'vxe-table-plugin-charts'
import 'vxe-table-plugin-charts/dist/style.css'
// ...

VXETable.use(VXETablePluginCharts)
```

## API

### Context menu codes

| code 编码 | describe 描述 | params 参数 |
|------|------|------|
| CHART_BAR_X_AXIS | 横向柱状图（如果设置了类别 category 则 series 至少一列，否则 series 至少两列） | {category?: field} |
| CHART_BAR_Y_AXIS  | 纵向柱状图（如果设置了类别 category 则 series 至少一列，否则 series 至少两列） | {category?: field} |
| CHART_LINE  | 折线图（如果设置了类别 category 则 series 至少一列，否则 series 至少两列） | {category?: field} |
| CHART_PIE  | 饼图（如果设置了类别 category 则 series 只需一列，否则 series 需要两列） | {category?: field} |

## Demo

```html
<vxe-table
  resizable
  height="500"
  :data="tableData"
  :mouse-config="{ area: true }"
  :context-menu="{body: {options: bodyMenus}}"
  :edit-config="{trigger: 'dblclick', mode: 'cell'}">
  <vxe-table-column type="index" width="60"></vxe-table-column>
  <vxe-table-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></vxe-table-column>
  <vxe-table-column field="sex" title="sex" :edit-render="{name: 'input'}"></vxe-table-column>
  <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
  <vxe-table-column field="rate" title="Rate" :edit-render="{name: 'input'}"></vxe-table-column>
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
        },
        {
          id: 100,
          name: 'Test2',
          nickname: 'Nickname2',
          sex: '0',
          age: 28,
          rate: '5'
        }
      ],
      bodyMenus: [
        [
          {
            code: 'CHART_LINE',
            name: '折线图'
          }
        ]
      ]
    }
  }
}
```

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
