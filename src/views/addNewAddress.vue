<template>
<div>
    <nav-bread>
        <span>Address</span>
    </nav-bread>
    <h3 class="tips">该页面字段均未校验，仅测试基本功能！</h3>
    <div class="form">
        <div><span class="form-title">收件人：</span><label><input type="text" v-model="form.userName"></label></div>
        <div><span class="form-title">收件地址：</span><label><input type="text" v-model="form.streetName"></label></div>
        <div><span class="form-title">邮政编码：</span><label><input type="text" v-model="form.postCode"></label></div>
        <div><span class="form-title">收件人电话：</span><label><input type="text" v-model="form.tel"></label></div>
    </div>
    <div class="btn-group">
        <a class="btn btn--m" @click="doSetUpAddress">提交</a>
        <a class="btn btn--m" @click="goBack">返回</a>
    </div>
</div>
</template>
<style>
</style>
<script>

import NavBread from '../components/NavBread.vue';
import Modal from '../components/modal.vue';
export default {
    data() {
        let randomNum = `${new Date().getTime().toString().slice(0, 3)}${parseInt(Math.random() * 30, 10)}`;
        return {
            form: {
                addressId: randomNum,
                userName: '',
                streetName: '',
                postCode: '',
                tel: '',
                isDefault: false
            }
        };
    },
    components: {
        NavBread,
        Modal
    },
    methods: {
        goBack() {
            this.$router.push({
                path: '/address'
            });
        },
        doSetUpAddress() {
            this.$http.post('/users/setUpAddress', {
                form: this.form
            }).then(res => {
                res = res.data;
                if (res.status === '0') {
                    this.$router.push({
                        path: '/address'
                    });
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.tips {
    margin: 20px;
    color: #ff0000;
}
.form {
    width: 500px;
    margin: 0 auto;
    div {
        margin: 10px 0;
    }
    input {
        width: 300px;
        height: 30px;
        line-height: 30px;
    }
}
.form-title {
    width: 100px;
    margin-right: 20px;
    display: inline-block;
    text-align: right;
}
.btn-group {
    width: 400px;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    .btn {
        width: 150px;
    }
}
</style>

