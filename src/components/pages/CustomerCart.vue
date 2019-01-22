<template>
  <div>
    <div class="mb-5">
        <loading :active.sync="isLoading"></loading>
        <div class="row" v-if="!cart.final_total">
            <div class="col-md-8 offset-md-2 text-center mt-5" >
            <h3>
                <p>購物車內目前沒有任何商品唷!!</p>
                <button @click="toProduct" class="btn btn-outline-success btn-lg">來去逛逛</button>
            </h3>
            </div>
        </div>
        <div class="row" v-if="cart.final_total">            
            <div class="col-md-8 offset-md-2">
                <div>
                    <div class=" mt-5 text-center d-sm-none">
                        <ul>
                            <li class="rounded p-2 bg-secondary text-white"><h5>1.確認商品</h5></li>
                            <li class="d-block "><i class="fas fa-arrow-down fa-2x text-secondary"></i></li>
                            <li class="rounded p-2 bg-secondary text-white"><h5>2.輸入資訊</h5></li>
                            <li class="d-block"><i class="fas fa-arrow-down fa-2x text-secondary"></i></li>
                            <li class="rounded p-2 bg-secondary text-white"><h5>3.前往付款</h5></li>
                        </ul>
                    </div>
                    <div class="mt-5 text-center d-none d-sm-block">
                        <ul>
                            <li class="d-inline-block p-4 rounded bg-secondary text-white"><h5>1.確認商品</h5></li>
                            <li class="d-inline-block mr-4 ml-4"><i class="fas fa-arrow-right fa-2x text-secondary"></i></li>
                            <li class="d-inline-block p-4 rounded bg-secondary text-white"><h5>2.輸入資訊</h5></li>
                            <li class="d-inline-block mr-4 ml-4"><i class="fas fa-arrow-right fa-2x text-secondary"></i></li>
                            <li class="d-inline-block p-4 rounded bg-secondary text-white"><h5>3.前往付款</h5></li>
                        </ul>      
                    </div>
                </div>
                <div class="my-5 row justify-content-center" v-if="cart.total">            
                    <table class="table mt-4">
                        <thead>
                            <tr>
                                <th></th>
                                <th>品名</th>
                                <th>數量</th>
                                <th>單價</th>
                            </tr>                
                        </thead>
                        <tbody>
                            <tr v-for="item in cart.carts" :key="item.id">
                                <td class="align-middle">
                                    <button class="btn btn-outline-danger" @click="delCartItem(item.id)"><i class="fas fa-trash-alt"></i></button>
                                </td>
                                <td class="align-middle">
                                    {{ item.product.title}}
                                    <div class="text-success" v-if="item.coupon">
                                        已套用優惠券
                                    </div>
                                </td>
                                <td class="align-middle">
                                {{ item.qty }} /{{ item.product.unit }}
                                </td>
                                <td class="align-middle text-right">
                                    {{ item.final_total | currency}}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-right"><h5>總計</h5></td>
                                <td class="text-right"><h5>{{ cart.total | currency}}</h5></td>
                            </tr>
                            <tr v-if="cart.final_total !== cart.total">
                                <td colspan="3" class="text-right text-success"><h4>折扣價</h4></td>
                                <td class="text-right"><h4>{{ cart.final_total | currency}}</h4></td>
                            </tr>
                        </tfoot>                
                    </table>
                    <div class="input-group mb-3 input-group-sm">
                        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
                            套用優惠碼
                            </button>
                        </div>              
                    </div>
                </div>
            <div class="text-right">
                <button class="btn btn-success" @click="toCustomerProfile">前往付款</button>
            </div>  
            </div>      
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            cart:{},
            coupon_code: '',
            isColor :true,
        };
    },
    methods:{
        getCart(){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.isLoading = false;
                if(response.data.success){
                    vm.cart = response.data.data;
                    console.log(vm.cart); 
                };                               
            });
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
        toCustomerProfile(){
            const vm = this;
            vm.$router.push(`/customer_profile`)
        },
        toProduct(){
            const vm = this;
            vm.$router.push(`/customer_order`)
        }
    },
    created() {
        this.getCart();
    },    
}
</script>
