import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config";

const service = axios.create({
    baseURL: config.baseApi
});
const NETWORK_ERROR = "网络错误..."

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    const { code, data, msg } = response.data;
    // 2xx 范围内的状态码都会触发该函数。
    if (code === 200) {
        return response;
    } else {
        // 对响应错误做点什么
        ElMessage.error(msg || NETWORK_ERROR);
        return Promise.reject(msg || NETWORK_ERROR);
    }
    // 对响应数据做点什么
});

function request(options) {
    options.method = options.method || 'get'

    if (options.method.toLowerCase() === 'get') {
        options.params = options.data

    }
    //对mock的开关做一个处理
    let isMock = config.mock;
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock;
    }

    //针对环境做一个处理
    if (config.env === 'prod') {
        //不能用mock数据
        service.baseUrl = config.baseApi;
    } else {
        //使用mock数据
        service.baseUrl = isMock ? config.mockApi : config.baseApi;
    }

    return service(options)
}

export default request;