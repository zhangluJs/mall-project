<template>
    <div>
        <nav-bread>
            <span>Order Confirm</span>
        </nav-bread>
        <div class="checkout-order container">
            <div class="page-title-normal">
                <h2 class="page-title-h2"><span>check out</span></h2>
            </div>
            <!-- process step -->
            <div class="check-step">
                <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li><span>Make</span> payment</li>
                <li><span>Order</span> confirmation</li>
                </ul>
            </div>

            <!-- order list -->
            <div class="page-title-normal checkout-title">
                <h2><span>Order content</span></h2>
            </div>
            <div class="item-list-wrap confirm-item-list-wrap">
                <div class="cart-item order-item">
                <div class="cart-item-head">
                    <ul>
                    <li>Order contents</li>
                    <li>Price</li>
                    <li>Quantity</li>
                    <li>Subtotal</li>
                    </ul>
                </div>
                <ul class="cart-item-list">
                    <li v-for="(item, index) in cartList"
                        v-if="item.checked === '1'"
                        :key="index">
                        <div class="cart-tab-1">
                            <div class="cart-item-pic">
                                <img :src="'/static/img/' + item.productImage" :alt="item.productName">
                            </div>
                            <div class="cart-item-title">
                                <div class="item-name">{{item.productName}}</div>
                            </div>
                        </div>
                        <div class="cart-tab-2">
                            <div class="item-price">{{item.salePrice}}</div>
                        </div>
                        <div class="cart-tab-3">
                            <div class="item-quantity">
                            <div class="select-self">
                                <div class="select-self-area">
                                    <span class="select-ipt">×{{item.productNum}}</span>
                                </div>
                            </div>
                            <div class="item-stock item-stock-no">In Stock</div>
                            </div>
                        </div>
                        <div class="cart-tab-4">
                            <div class="item-price-total">{{item.productNum * item.salePrice | currency('¥')}}</div>
                        </div>
                    </li>
                </ul>
                </div>
            </div>

            <!-- Price count -->
            <div class="price-count-wrap">
                <div class="price-count">
                <ul>
                    <li>
                        <span>Item subtotal:</span>
                        <span>{{subtotal | currency('¥')}}</span>
                    </li>
                    <li>
                        <span>Shipping:</span>
                        <span>{{shipping | currency('¥')}}</span>
                    </li>
                    <li>
                        <span>Discount:</span>
                        <span>{{discount | currency('¥')}}</span>
                    </li>
                    <li>
                        <span>Tax:</span>
                        <span>{{tax | currency('¥')}}</span>
                    </li>
                    <li class="order-total-price">
                        <span>Order total:</span>
                        <span>{{orderTotal | currency('¥')}}</span>
                    </li>
                </ul>
                </div>
            </div>

            <div class="order-foot-wrap">
                <div class="prev-btn-wrap">
                    <button class="btn btn--m">Previous</button>
                </div>
                <div class="next-btn-wrap">
                    <button class="btn btn--m btn--red">Proceed to payment</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavBread from '../components/NavBread.vue';
import {currency} from '../util/currency';

export default {
    name: 'view-content',
    data() {
        return {
            subtotal: 0,
            shipping: 10,
            discount: 50,
            tax: 50,
            orderTotal: 0,
            cartList: []
        };
    },
    components: {
        NavBread
    },
    filters: {
        currency
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$http.get('/users/cartList').then(res => {
                res = res.data;
                this.cartList = res.result;
                this.cartList.forEach(item => {
                    if (item.checked === '1') {
                        this.subtotal += (item.productNum * item.salePrice);
                    }
                });
                this.orderTotal = this.subtotal + this.shipping;
            });
        }
    }
};
</script>

