<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span>Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                    <span class="sortby">Sort by:</span>
                    <a href="javascript:void(0)" class="default cur">Default</a>
                    <a href="javascript:void(0)" class="price">
                        Price 
                        <svg class="icon icon-arrow-short">
                            <use xlink:href="#icon-arrow-short"></use>
                        </svg>
                    </a>
                    <a href="javascript:void(0)" class="filterby stopPop" @click="shouFilterPop">Filter by</a>
                </div>
                <div class="accessory-result">
                    <!-- filter -->
                    <div class="filter stopPop" id="filter" :class="{'filterby-show': filterBy}">
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
                                        <a href="#"><img v-lazy="'static/img/' + item.productImg" alt=""></a>
                                    </div>
                                    <div class="main">
                                    <div class="name">{{item.productName}}</div>
                                    <div class="price">{{item.productPrice}}</div>
                                    <div class="btn-area">
                                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                                    </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
        <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from '../components/NavHeader.vue';
import NavFooter from '../components/NavFooter.vue';
import NavBread from '../components/NavBread.vue';
import axios from 'axios';
export default {
    name: 'view-content',
    components: {
        NavHeader,
        NavFooter,
        NavBread
    },
    data() {
        return {
            goodsList: [],
            priceFilter: [
                {
                    startPrice: '0.00',
                    endPrice: '500.00'
                },
                {
                    startPrice: '500.00',
                    endPrice: '1000.00'
                },
                {
                    startPrice: '1000.00',
                    endPrice: '2000.00'
                }
            ],
            priceChecked: 'all',
            filterBy: false,
            overLayFlag: false
        }
    },
    mounted() {
        this.getGoodsList();
    },
    methods: {
        getGoodsList() {
            axios.get('/goods/list').then(res => {
                let result = res.data;
                this.goodsList = result.result;
            })
        },
        setPriceFilter(index) {
            this.priceChecked = index;
            this.closePop();
        },
        shouFilterPop() {
            this.filterBy = true;
            this.overLayFlag = true;
        },
        closePop() {
            this.filterBy = false;
            this.overLayFlag = false;
        }
    }
}
</script>
