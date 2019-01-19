<template>
    <div>        
        <loading :active.sync="isLoading"></loading>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>購買時間</th>
                    <th>收件者</th>
                    <th>Email</th>
                    <th>購買款項</th>
                    <th>應付金額</th>
                    <th>是否付款</th> 
                    <th>修改訂單</th>                   
                </tr>
            </thead>
            <tbody>
                <template v-for="item in orders">                
                    <tr v-if="!item.is_delete" :key="item.id" >
                        <td>{{ item.create_at | moment  }}</td>
                        <td>{{ item.user.name }}</td>
                        <td>{{ item.user.email }}</td>
                        <td>                       
                            <div v-for="product in item.products" :key="product.id">
                                {{ product.product.title }} 數量 : {{ product.qty }}/{{ product.product.unit }}
                            </div>                     
                        </td>
                        <td>{{ item.total | currency }}</td>                    
                        <td>
                            <span v-if="!item.is_paid" class="text-danger">尚未付款</span>
                            <span v-else class="text-success">已付款</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-primary" @click="openModal(false, item)">詳細內容</button>
                            <button class="btn btn-outline-danger" @click="delModal(false, item)">刪除</button>                          
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>

        <Pagination :pagination="pagination" v-on:getPageProducts="getOrders"></Pagination>

        <!-- Modal -->
        <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h3 class="modal-title " id="exampleModalLabel">訂單內容</h3>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <div class="form-group">
                                <div>姓名</div>
                                <div>{{ order.user.name }}</div>                                
                            </div>
                            <div class="form-group">
                                <div>Email</div>
                                <div>{{ order.user.email }}</div>
                            </div>
                            <div class="form-group">
                                <div>電話</div>
                                <div>{{ order.user.tel }}</div>
                            </div>
                            <div class="form-group">
                                <div>地址</div>
                                <div>{{ order.user.address }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <td class="text-center text-primary">商品名稱</td>
                                        <td class="text-center text-primary">數量</td>
                                        <td class="text-center text-primary">價格</td>
                                    </tr>
                                </thead>
                                <tbody>                                    
                                    <tr v-for="item in order.products" :key="item.id">
                                        <td class="text-center">{{ item.product.title }}</td>
                                        <td class="text-center">{{ item.qty }}</td>
                                        <td class="text-center">{{ item.product.price * item.qty }}</td>
                                    </tr>                                   
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="2" class="text-center text-danger"><h5>應付金額</h5></td>
                                        <td class="text-center text-danger"><h5>{{ order.total }}</h5></td>
                                    </tr>                                    
                                </tfoot>
                            </table>
                        </div>                        
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                <button type="button" class="btn btn-primary" @click="updateOrder">確認</button>
            </div>
            </div>
        </div>
        </div>

        <div class="modal fade" id="delOrderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title" id="exampleModalLabel">
                <span>刪除產品</span>
                </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                是否刪除 <strong class="text-danger">{{ order.user.name }}</strong> 的訂單(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="delOrder"
                >確認刪除</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>


<script>
import Pagination from '@/components/Pagination';
import $ from 'jquery';

export default {
    data(){
        return {
            orders: [],
            isLoading: false,
            pagination:{},
            order:{
                user:{
                    email:'',
                    address: '',
                    name: '',
                    tel: '',
                }
            },
            isNew: false,
            isDel: false,
        };
    },
    methods:{
        getOrders(page) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;  
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) =>{
                vm.isLoading = false;
                console.log(response.data);
                if(response.data.success){
                    vm.orders=response.data.orders;
                    vm.pagination = response.data.pagination;                    
                }                
            });
        },
        openModal(isNew, item) {
            if(!isNew){
                this.order = Object.assign({},item);
                this.isNew = false;
            }
            $('#orderModal').modal('show')
        },
        updateOrder(){
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order`;
            const vm = this;
            if(!vm.isNew){
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.order.id}`;
            }
            this.$http.put(api, {data: vm.order}).then((response) =>{                
                if(response.data.success){                    
                    this.getOrders();
                    $('#orderModal').modal('hide');
                };
            });
        },
        delModal(isDel, item){
            if(!isDel, item){
                this.order = Object.assign({}, item);
                this.isDel = false;
            };
            $('#delOrderModal').modal('show');
        },
        delOrder(){
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order`;
            const vm = this;
            if(!vm.isDel){
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.order.id}`;
            }
            vm.order.is_delete = true;
            this.$http.put(api, {data: vm.order}).then((response) =>{                
                if(response.data.success){                 
                    this.getOrders(vm.pagination.current_page);
                    $('#delOrderModal').modal('hide');
                };
            });

        }
    },
    created() {
        this.getOrders();
    },
    components:{
        Pagination,
    },
}
</script>