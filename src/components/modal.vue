<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': mdshow}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" type="button" @click="close()">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div>
                    <div class="error-wrap">
                        <span class="error error-show" v-show="errorTip">{{logTipText}}</span>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdshow" @click="close()"></div>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: ['mdshow'],
    data() {
        return {
            userName: 'admin',
            userPwd: '123456',
            errorTip: false,
            loginModalFlag: false,
            nickName: '',
            logTipText: ''
        };
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>
<style src="../assets/css/login.css"></style>
