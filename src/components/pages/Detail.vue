<template>
    <div>
        <div class="container mt-5 mb-5">
            <div class="row mt-5">
                <div class="col-md-8">
                    <img :src="product.imageUrl" class="img-fluid rounded"  alt="">
                </div>
                <div class="col-md-4 bg-dark">
                    <h2 class="text-white text-center">{{product.title}}</h2>
                    <h4><div class="text-right text-white"> {{product.category}}</div></h4>                    
                    <h6 class="my-4 text-white">{{product.content}}</h6>
                    <p class="text-right text-white-50">--{{product.description}}</p>
                    <div class="d-flex justify-content-between align-items-baseline mb-3">
                        <del class="h6 text-white">原價 {{product.origin_price}} 元</del>
                        <div class="h4 text-white">優惠價 {{product.price}} 元</div>
                    </div>
                    <select class="form-control" v-model="buyNum">
                        <option v-for="(item, key) in 5" :key="key" :value="item">選購 {{ item }} 只</option>
                    </select>
                    <div class="my-5 d-flex justify-content-between align-items-baseline">
                        <span class="pr-3 text-white ml-4 h3">合計 {{ buyNum * product.price }} 元</span>
                        <button type="button" class="btn btn-info" @click="addtoCart(product,buyNum)">加到購物車</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {            
            product: {},
            buyNum: 1,
        }
    },
    methods:{
        getProduct(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.$route.params.id}`            
            this.$http.get(api).then((response) =>{
                console.log(response)
                if(response.data.success){
                    vm.product = response.data.product
                }
            });            
        },
        addtoCart(id, qty = 1){
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            const cart = {
                product_id:id,
                qty,
            };
            this.$http.post(api, { data: cart }).then((response) =>{
                vm.buyNum = 1;              
            });
        },
        reBuyBum(){
            const vm = this;
            vm.buyNum = 1;
        },
    },
    created(){
        this.getProduct()
    }
}
</script>