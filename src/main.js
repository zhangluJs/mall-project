/**
 * @file 项目入口文件
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import axios from 'axios';

import './assets/css/base.css';
import './assets/css/checkout.css';
import './assets/css/login.css';
import './assets/css/product.css';

Vue.config.productionTip = false;
// http response 拦截器
axios.interceptors.response.use(response => {
    let res = response.data;
    if (res.status === '10001') {
        alert('请先登录');
    }
    return response;
}, err => {
    console.log(err);
});
Vue.prototype.$http = axios;

Vue.use(infiniteScroll);

Vue.use(VueLazyLoad, {
    loading: '../static/loading/loading-bars.svg'
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});
