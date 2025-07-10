/**
 * 整个项目api的管理
 * 
 */
import request from "./request"

export default {
    // home组件 左侧表格数据获取
    getTableData() {
        return request({
            url: '/home/getTableData',
            method: 'get',
        })
    },
    getCountData() {
        return request({
            url: '/home/getCountData',
            method: 'get',
        })
    },
    getChartData() {
        return request({
            url: '/home/getChartData',
            method: 'get',
        })
    },
    getUserData(params) {
        return request({
            url: '/user/getUserData',
            method: 'get',
            data: params
        })
    },
    deleteUser(params) {
        return request({
            url: '/user/deleteUser',
            method: 'get',
            data: params
        })
    },
    addUser(params) {
        return request({
            url: '/user/addUser',
            method: 'post',
            data: params
        })
    },
    editUser(params) {
        return request({
            url: '/user/editUser',
            method: 'post',
            data: params
        })
    },


}