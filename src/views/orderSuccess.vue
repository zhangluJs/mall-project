<template>
    <div class="container">
        <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
            <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li class="cur"><span>Make</span> payment</li>
                <li class="cur"><span>Order</span> confirmation</li>
            </ul>
        </div>

        <div class="order-create">
            <div class="order-create-pic"><img src="static/img/ok-2.png" alt=""></div>
            <div class="order-create-main">
                <h3>Congratulations! <br>Your order is under processing!</h3>
                <p>
                    <span>Order ID：{{orderId}}</span>
                    <span>Order total：{{orderTotal | currency}}</span>
                </p>
                <div class="order-create-btn-wrap">
                    <div class="btn-l-wrap">
                        <router-link class="btn btn--m" to="/cart">Cart List</router-link>
                    </div>
                    <div class="btn-r-wrap">
                        <router-link class="btn btn--m" to="/">Goods List</router-link>
                    </div>
                </div>
            </div>
        </div>
        <modal :mdshow="mdShowInfo" @close="closeModal">
            <p slot="message">{{mdMsg}}！</p>
            <div slot="btnGroup">
                <a class="btn btn--m" @click="mdShowInfo = false">关闭</a>
            </div>
        </modal>
    </div>
</template>
<script>

import Modal from '../components/modal.vue';
export default {
    name: 'orderSuccess',
    data() {
        return {
            orderId: '',
            orderTotal: '',
            mdShowInfo: false,
            mdMsg: ''
        };
    },
    components: {
        Modal
    },
    filters: {
        currency(val) {
            let reg = /(\d)(?=(\d{3})+$)/g;
            let value = val.toString();
            return value.replace(reg, function ($2) {
                return $2 + ',';
            });
        }
    },
    mounted() {
        this.$http.get('/users/orderDetail', {
            params: {
                orderId: this.$route.query.orderId
            }
        }).then(res => {
            res = res.data;
            if (res.status === '0') {
                this.orderId = res.result.orderId;
                this.orderTotal = res.result.orderTotal;
            } else {
                this.mdMsg = res.msg;
                this.mdShowInfo = true;
            }
        });
    },
    methods: {
        closeModal() {
            this.mdShowInfo = false;
        }
    }
};
</script>

