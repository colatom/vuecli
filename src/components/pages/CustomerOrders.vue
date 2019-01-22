<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <Carousel></Carousel>
        <div class="row mt-4">
        <div class="col-md-3 ml-sm-auto col-lg-3 px-4">
            <div class="list-group">
                <button class="list-group list-group-item btn btn-outline-primary" @click.prevent="getList('')"><i class="fas fa-dragon mr-1"></i>全魔物</button>
                <button href="" class="list-group list-group-item btn btn-outline-primary" @click.prevent="getList('飛龍種')"><i class="fas fa-dragon mr-1"></i>魔物獵人-飛龍種</button>
                <button href="" class="list-group list-group-item btn btn-outline-primary" @click.prevent="getList('獸龍種')"><i class="fas fa-dragon mr-1"></i>魔物獵人-獸龍種</button>
                <button href="" class="list-group list-group-item btn btn-outline-primary" @click.prevent="getList('鳥龍種')"><i class="fas fa-dragon mr-1"></i>魔物獵人-鳥龍種</button>
                <button href="" class="list-group list-group-item btn btn-outline-primary" @click.prevent="getList('古龍種')"><i class="fas fa-dragon mr-1"></i>魔物獵人-古龍種</button>
                <button href="" class="list-group list-group-item btn btn-outline-primary" @click.prevent="getList('牙龍種')"><i class="fas fa-dragon mr-1"></i>魔物獵人-牙龍種</button>
            </div>
        </div>
        <div class="row col-md-9 ml-sm-auto col-lg-9 px-4">
            <div class="input-group mb-3 procenter">
            <div class="input-group-prepend">
                <input type="text" class="form-control" placeholder="請輸入" v-model="find" @keyup.enter="filterPro">
            </div>
                <button class="input-group-text" @click="filterPro">搜尋</button>
            </div>
            <div class="col-md-4 mb-4" v-for="item in catchproducts" :key="item.id">
            <div class="card border-0 shadow-sm">
                <div style="height: 250px; background-size: cover; background-position: center"
                :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                <h5 class="card-title">
                    <a href="#" class="text-dark">{{ item.title }}</a>
                </h5>
                <p class="card-text limit-text">{{ item.content }}</p>
                <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5" v-if="!item.price">原價：{{ item.origin_price | currency }}</div>
                    <del class="h6" v-if="item.price">原價：{{ item.origin_price | currency }}</del>
                    <div class="h5" v-if="item.price">特價：{{ item.price | currency }}</div>
                </div>
                </div>
                <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-secondary btn-sm" @click="goDetail(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    加到購物車
                </button>
                </div>
            </div>
            </div>
        </div>      
        </div>
        <button type="button" id="BackTop" class="toTop-arrow"></button>
    </div>
</template>

<script>
import $ from 'jquery';
import Carousel from '../Carousel';

$(function(){
	$('#BackTop').click(function(){ 
		$('html,body').animate({scrollTop:0}, 333);
	});
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 300 ){
			$('#BackTop').fadeIn(222);
		} else {
			$('#BackTop').stop().fadeOut(222);
		}
	}).scroll();
});

export default {
    components:{
        Carousel,
    },
    data(){
        return {
            products: [],
            catchproducts: [],
            product: {},
            isLoading: false,
            status: {
                loadingItem: ''
            },
            cart: {},
            coupon_code: '',
            form:{
                user:{
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
            buyNum: 1,
            find: '',                              
        }
    },
    methods:{
        getProducts() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) =>{
                vm.isLoading = false;
                console.log(response.data);
                if(response.data.success){                    
                    vm.products = response.data.products;
                    vm.catchproducts = response.data.products;                            
                };
            });
        },
        getList(name){            
            const vm = this;
            vm.catchproducts = [];
            if(name == ''){
                vm.catchproducts = vm.products
            }else{
                vm.catchproducts = vm.products.filter(function(el){
                    return el.category == name
                });
            }
        },
        filterPro(){
            const vm = this;
            vm.catchproducts = vm.products.filter(function(el){
                return el.title.indexOf(vm.find) > -1
            })
            vm.find = ''
        },
        goDetail(id){
           this.$router.push(`/detail/${id}`)
        },
        addtoCart(id, qty = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            const cart = {
                product_id:id,
                qty,
            };
            vm.status.loadingItem = id;
            this.$http.post(api, { data: cart }).then((response) =>{
                console.log(response.data);  
                vm.status.loadingItem = '';
                vm.buyNum = 1;              
            });
        },
        delCartItem(id){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`
            const vm = this;
            vm.isLoading = true;
            this.$http.delete(api).then((response) =>{
                vm.isLoading = false;
                if(response.data.success){
                    console.log(response.data);
                    vm.getCart();                    
                }                
            })
        },
        addCouponCode() {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
            const vm = this;
            const coupon = {                
                    code: vm.coupon_code,                
            }
            vm.isLoading = true;
            this.$http.post(api, { data: coupon }).then((response) => {
                vm.isLoading = false;
                console.log(response.data);
                vm.getCart();
            });
        },
        createOrder(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
            const vm = this;
            const order = vm.form;            
            this.$validator.validate().then((result) => {
                if (result) {                
                    this.$http.post(api, { data: order }).then((response) => {              
                        console.log('訂單已送出', response);
                        if(response.data.success){
                            vm.$router.push(`/customer_checkout/${response.data.orderId}`)
                        }
                    });
                }else{
                    console.log('欄位不完整')
                }
            });            
        },
        reBuyBum(){
            const vm = this;
            vm.buyNum = 1;
        },
    },
    created(){
        this.getProducts();       
    },
}
</script>

<style scoped>
    @media screen and (max-width: 768px){
        .procenter{            
            justify-content: center;
        }
    }   

    .limit-text{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
    }
    .toTop-arrow {
        width: 3rem;
        height: 3rem;
        padding: 0;
        margin: 0;
        border: 0;
        border-radius: 33%;
        opacity: 0.6;
        background: #000;
        cursor: pointer;
        position:fixed;
        right: 1rem;
        bottom: 1rem;
        display: none;
    }
    .toTop-arrow::before, .toTop-arrow::after {
        width: 25px;
        height: 6px;
        border-radius: 3px;
        background: #f90;
        position: absolute;
        content: "";
    }
    .toTop-arrow::before {
        transform: rotate(-45deg) translate(0, -50%);
        left: 0.42rem;
    }
    .toTop-arrow::after {
        transform: rotate(45deg) translate(0, -50%);
        right: 0.42rem;
    }
    .toTop-arrow:focus {outline: none;}
</style>