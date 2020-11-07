// import mapArray = require('../dist/map-array-tony')
// 使用了npm 安装了map-array-tony包的使用方式
import mapArray = require('map-array-tony')
mapArray([1, 2], (item) => {
  return item * 2
})