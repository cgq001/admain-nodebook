import axios from 'axios'

import { Message,Loading } from 'element-ui';

let loading;
//开始动画
function startLoading(){
   // console.log('开始请求')
    loading=Loading.service({
        lock: true,
        text: '拼命加载中...',
        background: 'rgba(0,0,0,0.7)'
    })
}
//结束动画
function endLoading(){
    //console.log('结束请求')
    loading.close()
}
//请求拦截
axios.interceptors.request.use(config=>{
    //加载动画
    startLoading()
    return config
},error =>{
    return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response=>{
    endLoading()
    return response;

},error =>{
   endLoading()
  // Message.error(error.response.data)
   return Promise.reject(error)
})
let instance = axios.create({
    baseURL: 'http://127.0.0.1:5005/bookadmin/',
    timeout: 5000
  });
instance.interceptors.request.use(config=>{
    //加载动画
    startLoading()
    return config
},error =>{
    return Promise.reject(error)
})
instance.interceptors.response.use(response=>{
    endLoading()
    return response;

},error =>{
   endLoading()
  // Message.error(error.response.data)
   return Promise.reject(error)
})
export default instance
