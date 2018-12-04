/**
 * @file router定义文件
 * @author zhanglu
 */

import Vue from 'vue';
import Router from 'vue-router';
import content from '@/views/content';
import cart from '@/views/cart';
import address from '@/views/address';
import addNewAddress from '@/views/addNewAddress';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'content',
        component: content
    }, {
        path: '/cart',
        name: 'cart',
        component: cart
    }, {
        path: '/address',
        name: 'address',
        component: address
    }, {
        path: '/addNewAddress',
        name: 'addNewAddress',
        component: addNewAddress
    }]
});
