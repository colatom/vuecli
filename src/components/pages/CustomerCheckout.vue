<template>
    <div>        
        <div class="my-5 row justify-content-center">
            <div class="mt-5 text-center d-sm-none">
                <ul>
                    <li class="rounded p-2 bg-success text-white"><h5>1.確認商品<i class="fas fa-check"></i></h5></li>
                    <li class="d-block"><i class="fas fa-arrow-down fa-2x text-secondary"></i></li>
                    <li class="rounded p-2 bg-success text-white"><h5>2.輸入資訊<i class="fas fa-check"></i></h5></li>
                    <li class="d-block"><i class="fas fa-arrow-down fa-2x text-secondary"></i></li>
                    <li class="rounded p-2 bg-secondary text-white" :class="{'bg-success': order.is_paid}"><h5>3.前往付款<i class="fas fa-check" v-if="order.is_paid"></i></h5></li>
                </ul>
            </div>
            <div class="mt-5 text-center d-none d-sm-block">
                <ul>
                    <li class="d-inline-block p-4 rounded bg-success text-white"><h5>1.確認商品 <i class="fas fa-check"></i></h5></li>
                    <li class="d-inline-block mr-4 ml-4"><i class="fas fa-arrow-right fa-2x text-success"></i></li>
                    <li class="d-inline-block p-4 rounded bg-success text-white"><h5>2.輸入資訊 <i class="fas fa-check"></i></h5></li>
                    <li class="d-inline-block mr-4 ml-4"><i class="fas fa-arrow-right fa-2x text-success"></i></li>
                    <li class="d-inline-block p-4 rounded bg-secondary text-white" :class="{'bg-success': order.is_paid}"><h5>3.付款完成<i class="fas fa-check" v-if="order.is_paid"></i></h5></li>
                </ul>
            </div>
        <form class="col-md-6" @submit.prevent="payOrder">
            <table class="table">
            <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
            </thead>
            <tbody>
                <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total | currency }}</td>
                </tr>
            </tfoot>
            </table>

            <table class="table">
            <tbody>
                <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                <th>付款狀態</th>
                <td>
                    <span v-if="!order.is_paid" class="text-danger h6">尚未付款</span>
                    <span v-else class="text-success h6">付款完成</span>
                </td>
                </tr>
            </tbody>
            </table>
            <div class="d-inline-block" v-if="order.is_paid === false">
            <button class="btn btn-success">確認付款去</button>
            </div>
            <div class="d-inline-block">
            <button class="btn btn-outline-success" @click="toProducts">繼續逛逛</button>
            </div>
        </form>
        </div>
    </div>
</template>

<script>


export default {
    data(){
        return {
            order: {
                user:{}
            },
            orderId: '',
        }
    },
    methods:{
        getOrder(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;            
            vm.isLoading = true;
            this.$http.get(api).then((response) =>{
                vm.isLoading = false;
                console.log(response);
                if(response.data.success){
                    vm.order = response.data.order
                };                           
            });         
        },
        payOrder() {
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;            
            vm.isLoading = true;
            this.$http.post(api).then((response) =>{
                vm.isLoading = false;
                console.log(response);                
                if(response.data.success){
                    vm.getOrder();
                };  
            });         
        },
        toProducts(){
            const vm = this;
            vm.$router.push(`/customer_order`)
        },
    },
    created(){
        this.orderId = this.$route.params.orderId;  
        this.getOrder()  
    },    
}
</script>