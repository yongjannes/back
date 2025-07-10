import Mock from 'mockjs'
import homeApi from './mockData/home'

// 拦截请求  第一个参数，是拦截的地址（这种是正则写法） 第二个是请求的方法 第三个是处理请求的方法
Mock.mock(/home\/getTableData/, "get", homeApi.getTableData)

Mock.mock(/home\/getCountData/, "get", homeApi.getCountData)

Mock.mock(/home\/getChartData/, "get", homeApi.getChartData)
