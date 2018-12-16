/**
 * @file 项目入口文件
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
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
    return response;
}, err => {
    console.log(err);
});
Vue.prototype.$http = axios;

Vue.use(Vuex);

Vue.use(infiniteScroll);

Vue.use(VueLazyLoad, {
    loading: '../static/loading/loading-bars.svg'
});

const store = new Vuex.Store({
    state: {
        cartCount: 0
    },
    mutations: {
        updateCartCount(state, num) {
            state.cartCount = num;
        }
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
});
