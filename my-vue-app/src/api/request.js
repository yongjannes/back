import axios from "axios";
import { ElMessage } from "element-plus";

const service = axios.create();
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
    return service(options)
}

export default request;