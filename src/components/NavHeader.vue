<template>
    <header class="header">
        <div class="navbar">
            <div class="navbar-left-container">
                <a href="/">
                    <img class="navbar-brand-logo" src="../assets/logo.png">
                </a>
            </div>
            <div class="navbar-right-container" style="display: flex;">
                <div class="navbar-menu-container">
                    <!--<a href="/" class="navbar-link">我的账户</a>-->
                    <span class="navbar-link" v-if="nickName">{{nickName}}</span>
                    <a href="javascript:void(0)" class="navbar-link" v-if="!nickName" @click="loginModalFlag = true">Login</a>
                    <a href="javascript:void(0)" class="navbar-link" v-if="nickName" @click="doLogOut" >Logout</a>
                    <div class="navbar-cart-container">
                        <span class="navbar-cart-count"></span>
                        <a class="navbar-link navbar-cart-link" href="/#/cart">
                            <img class="icon icon-cart" src="../../static/img/cart.png">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-modal modal-msg md-modal-transition" :class="{'md-show': loginModalFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">Login in</div>
                    <button class="md-close" @click="loginModalFlag = false">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2"  name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password" @keyup.enter="login">
                            </li>
                        </ul>
                    </div>
                    <div class="error-wrap">
                        <span class="error error-show" v-show="errorTip">{{logTipText}}</span>
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:;" class="btn-login" @click="login">登  录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="loginModalFlag = false"></div>
    </header>
</template>

<script>
export default {
    name: 'nav-header',
    data() {
        return {
            userName: 'admin',
            userPwd: '123456',
            errorTip: false,
            loginModalFlag: false,
            nickName: '',
            logTipText: ''
        }
    },
    watch: {
        loginModalFlag() {
            this.logTipText = '';
            this.errorTip = false;
        }
    },
    mounted() {
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            this.$http.get('/users/checkLogin').then(res => {
                res = res.data;
                if (res.status === '0') {
                    this.nickName = res.result;
                }
            })
        },
        login() {
            if (!this.userName || !this.userPwd) {
                this.errorTip = true;
                this.logTipText = '请输入用户名或密码';
                return;
            }
            this.$http.post('/users/login', {
                userName: this.userName,
                userPwd: this.userPwd
            }).then(res => {
                res = res.data;
                if (res.status === '1') {
                    this.errorTip = true;
                    this.logTipText = '密码或用户名输入错误';
                    return;
                }
                this.loginModalFlag= false;
                this.nickName = res.result.userName;
            })
        },
        doLogOut() {
            this.$http.post('/users/logout').then(res => {
                res = res.data;
                if (res.status === '0') {
                    this.nickName = ''
                } 
            })
        }
    }
}
</script>
<style src="../assets/css/login.css">

</style>

