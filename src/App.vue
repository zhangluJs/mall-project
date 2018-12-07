<template>
    <div id="app">
        <nav-header></nav-header>
        
        <router-view/>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue';
import NavFooter from './components/NavFooter.vue';

export default {
    name: 'App',
    components: {
        NavHeader,
        NavFooter
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

