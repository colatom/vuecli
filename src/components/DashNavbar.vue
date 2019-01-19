<template>
  <div>    
      <nav class="navbar navbar-expand-lg  navbar-light fixed-top bg-light p-0 shadow">
        <router-link class="navbar-brand col-sm-3 col-md-2 mr-0 text-center" to="/"><h4><i class="fas fa-dog"></i>可樂公仔店</h4></router-link>  
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <ul class="navbar-nav nav">            
            <li>
              <div class="h5 text-center">
                <router-link class="nav-link" to="/admin/"><i class="fas fa-th-list mr-1"></i>新增產品</router-link>
              </div>
            </li> 
            <li>
              <div class="h5 text-center">
                <router-link class="nav-link" to="/admin/orders"><i class="fas fa-shopping-cart"></i>查看訂單</router-link>
              </div>
            </li> 
            <li>
              <div class="h5 text-center">
                <router-link class="nav-link" to="/admin/coupon"><i class="fas fa-shopping-cart"></i>新增優惠券</router-link>
              </div>
            </li> 
            <li class="bg-secondary ml-2">
              <div class="h5 text-center">
                <a class="nav-link" href="#" @click.prevent="signout">登出</a>
              </div>
            </li>
            
          </ul>
        </div>
      </nav>
    </div>
</template>


<script>
export default {
  methods:{
    signout(){
      this.$emit('userSignout')
    },
  },
}
</script>