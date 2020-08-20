/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import qs from 'qs';

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {}
    // 暂不处理

// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12});

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(   
    // 添加统一请求参数 v  
    config => {       
        if (config.method === 'post') {
            let data = qs.parse(config.data)
            config.data = sq.stringify({
                v:'wx',
                ...data
            })
        } else if(config.method === 'get'){
            config.params = {
                v:'wx',
                ...config.params
            }
        } 
        return config;    
    },    
    error => Promise.error(error)
    )

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // store.commit('changeNetwork', false);
        }
    });

export default instance;
