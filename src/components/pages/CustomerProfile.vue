<template>
    <div>
        <div class="col-md-8 offset-md-2">
            <div class="mt-5 text-center d-sm-none">
                <ul>
                    <li class="rounded p-2 bg-success text-white"><h5>1.確認商品<i class="fas fa-check"></i></h5></li>
                    <li class="d-block "><i class="fas fa-arrow-down fa-2x text-secondary"></i></li>
                    <li class="rounded p-2 bg-secondary text-white"><h5>2.輸入資訊</h5></li>
                    <li class="d-block"><i class="fas fa-arrow-down fa-2x text-secondary"></i></li>
                    <li class="rounded p-2 bg-secondary text-white"><h5>3.前往付款</h5></li>
                </ul>
            </div>
            <div class="mt-5 text-center d-none d-sm-block">
                <ul>
                    <li class="d-inline-block p-4 rounded bg-success text-white"><h5>1.確認商品<i class="fas fa-check"></i></h5></li>
                    <li class="d-inline-block mr-4 ml-4"><i class="fas fa-arrow-right fa-2x text-success"></i></li>
                    <li class="d-inline-block p-4 rounded bg-secondary text-white"><h5>2.輸入資訊</h5></li>
                    <li class="d-inline-block mr-4 ml-4"><i class="fas fa-arrow-right fa-2x text-secondary"></i></li>
                    <li class="d-inline-block p-4 rounded bg-secondary text-white"><h5>3.前往付款</h5></li>
                </ul>
            </div>
        <div class="my-5 row justify-content-center">
        <form class="col-md-10" @submit.prevent="createOrder">
            <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username"
                :class="{'is-invalid': errors.has('name')}"
                v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'">
            <span class="text-danger" v-if="errors.has('name')">姓名欄位不可留空</span>
            </div>

            <div class="form-group">
            <label for="useremail">Email</label>
            <input type="email" class="form-control" name="email" id="useremail"
                :class="{'is-invalid': errors.has('email')}"
                v-model="form.user.email" placeholder="請輸入 Email"  v-validate="'required|email'">
            <span class="text-danger" v-if="errors.has('email')">
                {{ errors.first('email') }}
            </span>
            </div>     
                    
            <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" name="usertel" v-model="form.user.tel" placeholder="請輸入電話" 
            v-validate="'required'" :class="{'is-invalid': errors.has('usertel') }">
            <span class="text-danger" v-if="errors.has('usertel')">電話欄位不得留空</span>
            </div>
        
            <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
               :class="{'is-invalid': errors.has('address') }" placeholder="請輸入地址" v-validate="'required'">
            <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
            </div>
        
            <div class="form-group">
            <label for="useraddress">留言</label>
            <textarea name="" id="" class="form-control" maxlength="300" rows="5" v-model="form.message" @input="descInput"></textarea>
            <span>字數：{{ txtVal }}/300</span>
            </div>
            <div class="text-right">
            <button class="btn btn-success">送出訂單</button>
            </div>
        </form>
        </div>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return{
            form:{
                user:{
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',                
            },
            txtVal: 0,
        }
    },
    methods:{
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
        toProduct(){
            const vm = this;
            vm.$router.push(`/customer_order`)
        },
        descInput(){
            const vm = this;
            vm.txtVal = vm.form.message.length;
        }

    }
}
</script>