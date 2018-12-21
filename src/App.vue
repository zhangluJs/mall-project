<template>
    <div id="app">
        <nav-header></nav-header>
        <router-view></router-view>
        <nav-footer></nav-footer>
        <modal :mdshow="mdShowInfo" @close="closeModal">
            <p slot="message" v-html="mdMsg"></p>
            <div slot="btnGroup">
                <a class="btn btn--m" @click="mdShowInfo = false">关闭</a>
            </div>
        </modal>
    </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue';
import NavFooter from './components/NavFooter.vue';
import Modal from './components/modal.vue';

export default {
    name: 'App',
    components: {
        NavHeader,
        NavFooter,
        Modal
    },
    data() {
        return {
            mdShowInfo: false,
            mdMsg: '建议使用pc端访问！<br>该站仅用做学习，没有任何实际的购物功能。代码层面使用的技术栈主要有vue/axios/vuex/express等'
        };
    },
    mounted() {
        let userInit = localStorage.getItem('userInit');
        if (!userInit) {
            this.mdShowInfo = true;
            localStorage.setItem('userInit', 1);
        }
    },
    methods: {
        closeModal() {
            this.mdShowInfo = false;
        }
    }
};
</script>
<style>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>

