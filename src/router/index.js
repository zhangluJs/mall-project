/**
 * @file router定义文件
 * @author zhanglu
 */

import Vue from 'vue';
import Router from 'vue-router';
import content from '@/views/content';
import cart from '@/views/cart';

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
    }]
});
