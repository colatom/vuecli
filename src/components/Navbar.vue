<template>
  <div>    
      <nav class="navbar navbar-expand-lg  navbar-light fixed-top bg-light p-0 shadow">
        <router-link class="navbar-brand col-sm-3 col-md-2 mr-0 text-center" to="/"><h4><i class="fas fa-dog"></i>可樂公仔店</h4></router-link>  
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <ul class="navbar-nav nav">            
            <li>
              <div class="h5 text-center">
                <router-link class="nav-link" to="/customer_order"><i class="fas fa-th-list mr-1"></i>商品列表</router-link>
              </div>
            </li> 
            <li>
              <div class="h5 text-center">
                <router-link class="nav-link" to="/customer_cart"><i class="fas fa-shopping-cart"></i></router-link>
              </div>
            </li> 
            <li class="bg-secondary ml-2">
              <div class="h5 text-center">
                <a class="nav-link" href="#" @click.prevent="login">後臺管理</a>
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
    checkLogin() {
      this.$emit('checkUserLogin')
    },
    login(){
      this.$emit('userLogin')
    },  
  },
  created(){
    this.checkLogin()
  }  
}
</script>