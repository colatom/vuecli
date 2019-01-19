<template>
    <div>
        <div class="text-right mt-3">
            <button class="btn btn-primary" @click="openModal(true)">建立新的優惠券</button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th>名稱</th>
                    <th>折扣百分比</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in coupons" :key="item.id">                    
                    <td>{{ item.title }}</td>
                    <td>{{ item.percent }}</td>
                    <td>{{ item.due_date }}</td>                    
                    <td>
                        <span  class="text-success" v-if="item.is_enabled === 1">啟用</span>
                        <span  class="text-unsuccess" v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="delModal(true, item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <Pagination :pagination="pagination" v-on:getPageProducts="getCoupons"></Pagination>

        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-10">
                        <div class="form-group">
                            <label for="coupon" class="ml-2">輸入優惠券名稱</label>
                            <input type="text" class="form-control" id="coupon"
                            placeholder="請輸入優惠券名稱" v-model="temCoupon.title">   
                        </div>
                        <div class="form-group">
                            <label for="code" class="ml-2">輸入優惠券代碼</label>
                            <input type="text" class="form-control" id="code"
                            placeholder="請輸入優惠券代碼" v-model="temCoupon.code">   
                        </div>
                        <div class="form-group">
                            <label for="precent" class="ml-2">輸入折扣百分比</label>
                            <input type="text" class="form-control" id="precent"
                            placeholder="請輸入折扣百分比" v-model="temCoupon.percent">                                                     
                        </div>
                        <div class="form-group">
                            <label for="precent" class="ml-2">輸入到期日</label>
                            <input type="date" class="form-control" id="due_date"
                            placeholder="請輸入到期日" v-model="temCoupon.due_date">                                                     
                        </div>
                        <div class="form-group">
                        <div class="form-check ml-2">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled"  v-model="temCoupon.is_enabled"
                            :true-value="1" :false-value="0">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>                   
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="addCoupon">確認</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            </div>
            </div>
        </div>
        </div>

        <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                是否刪除 <strong class="text-danger">{{ temCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-danger" @click="delCouponModal"
                >確認刪除</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import $ from 'jquery'

export default {
    data() {
        return {
            coupons:[],
            temCoupon:{},
            pagination:{},
            isNew: false,
            isDel: true,
        }
    },
    methods:{
        getCoupons(page = 1) {
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
            const vm = this;
            this.$http.get(api).then((response) => {
                console.log(response.data)
                vm.coupons = response.data.coupons;
                vm.pagination = response.data.pagination;
            });
        },
        addCoupon() {
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            let httpMethod = 'post';
            const vm = this;
            if(!vm.isNew){
                api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.temCoupon.id}`;
                httpMethod = 'put';
            }
            this.$http[httpMethod](api, {data: vm.temCoupon}).then((response)=>{
                console.log(response)
                if(response.data.success){
                    $('#couponModal').modal('hide');
                    this.getCoupons();
                }else{
                    $('#couponModal').modal('hide');
                    this.getCoupons();
                    console.log('新增失敗')
                }
            })
        },
        openModal(isNew, item) {
            if(isNew){
                this.temCoupon = {};
                this.isNew = true;
            }else{
                this.temCoupon = Object.assign({}, item);
                this.isNew = false;
            }
            $('#couponModal').modal('show')
        },
        delModal(isDel, item){
            if(isDel, item){
                this.temCoupon = Object.assign({}, item)
                this.isDel = true;
            };
            $('#delCouponModal').modal('show');
        },
        delCouponModal() {
            let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
            const vm = this;
            if(vm.isDel){
                api =  `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.temCoupon.id}`;
            }
            this.$http.delete(api).then((response) =>{
                if(response.data.success){
                    $('#delCouponModal').modal('hide');
                    this.getCoupons();
                }else{
                    $('#delCouponModal').modal('hide');
                    this.getCoupons();
                };
            });
        },
    },
    created(){
        this.getCoupons();        
    },
    components:{
        Pagination,
    }
}
</script>
