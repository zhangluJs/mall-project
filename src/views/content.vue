<template>
<div>
    <nav-bread>
        <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
        <div class="container">
            <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price" @click="sortGoods">
                    Price 
                    <img class="icon icon-arrow-short" src="../../static/img/sort.png">
                </a>
                <a href="javascript:void(0)" class="filterby stoppop" @click="shouFilterPop">Filter by</a>
            </div>
            <div class="accessory-result">
                <!-- filter -->
                <div class="filter stoppop" id="filter" :class="{'filterby-show': filterBy}">
                    <dl class="filter-price">
                        <dt>Price:</dt>
                        <dd @click="setPriceFilter('all')">
                            <a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}">All</a>
                        </dd>
                        <dd v-for="(item, index) in priceFilter" :key="index" @click="setPriceFilter(index)">
                            <a href="javascript:void(0)" :class="{'cur': priceChecked === index}">{{item.startPrice}} - {{item.endPrice}}</a>
                        </dd>
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                        <ul>
                            <li v-for="(item, index) in goodsList" :key="index">
                                <div class="pic">
                                    <a href="#">
                                        <img
                                            v-lazy="'static/img/' + item.productImage"
                                            :key="item.productImage"
                                            alt="">
                                    </a>
                                </div>
                                <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.salePrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div
                            style="text-align:center"
                            v-infinite-scroll="loadMore"
                            infinite-scroll-disabled="busy"
                            infinite-scroll-distance="20">
                            <img v-if="loading" src="../../static/loading/loading-spinning-bubbles.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <modal :mdshow="mdShow" @close="closeModal">
        <p slot="message">请先登录，否则无法加入到购物车</p>
        <div slot="btnGroup">
            <a class="btn btn--m" @click="mdShow = false">关闭</a>
        </div>
    </modal>
    <modal :mdshow="mdShowCart" @close="closeModal">
        <p slot="message">加入购物车成功！</p>
        <div slot="btnGroup">
            <a class="btn btn--m" @click="mdShowCart = false">继续购物</a>
            <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
        </div>
    </modal>
</div>
</template>
<script>
import NavBread from '../components/NavBread.vue';
import Modal from '../components/modal.vue';

export default {
    name: 'view-content',
    components: {
        NavBread,
        Modal
    },
    data() {
        return {
            goodsList: [],
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '100.00'
                },
                {
                    startPrice: '100.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '5000.00'
                }
            ],
            priceChecked: 'all',
            filterBy: false,
            overLayFlag: false,
            sortFlag: true,
            params: {
                page: 1,
                pageSize: 8,
                sort: true
            },
            busy: true,
            loading: true,
            mdShow: false,
            mdShowCart: false
        };
    },
    mounted() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList(flag) {
            this.params.sort = this.sortFlag ? 1 : -1;
            this.loading = true;
            let params = this.params;
            params.priceLevel = this.priceChecked;
            this.$http.get('/goods/list', {
                params
            }).then(res => {
                let result = res.data;
                if (result.status === '0') {
                    if (flag) {
                        let countList = this.goodsList.concat(result.result.list);
                        this.goodsList = countList;
                        if (result.result.count < 8) {
                            this.busy = true;
                        }
                        else {
                            this.busy = false;
                        }
                    }
                    else {
                        this.goodsList = result.result.list;
                        this.busy = false;
                    }
                }
                else {
                    this.goodsList = [];
                }
                this.loading = false;
            });
        },
        loadMore() {
            this.busy = true;
            setTimeout(() => {
                this.params.page++;
                this.getGoodsList(true);
            }, 500);
        },
        sortGoods() {
            this.sortFlag = !this.sortFlag;
            this.params.page = 1;
            this.pageSize = 8;
            this.getGoodsList();
        },
        setPriceFilter(index) {
            this.priceChecked = index;
            this.closePop();
            this.params.page = 1;
            this.getGoodsList();
        },
        shouFilterPop() {
            this.filterBy = true;
            this.overLayFlag = true;
        },
        closePop() {
            this.filterBy = false;
            this.overLayFlag = false;
        },
        addCart(productId) {
            this.$http.post('/goods/addCart', {
                productId
            }).then(res => {
                let result = res.data;
                if (result.status === '0') {
                    this.mdShowCart = true;
                }
                else {
                    this.mdShow = true;
                }
            });
        },
        closeModal() {
            this.mdShow = false;
            this.mdShowCart = false;
        }
    }
};
</script>
