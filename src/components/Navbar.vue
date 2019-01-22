<template>
  <div>   
      <nav class="navbar navbar-expand-lg  navbar-light fixed-top bg-light p-0 shadow">
        <button class="navbar-toggler d-sm-none linkbtn" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        <router-link class="navbar-brand col-sm-3 mr-0 text-center linkhome" to="/">          
          <h4><i class="fas fa-dog"></i>可樂公仔店</h4>      
        </router-link>  
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

<style>
@media screen and (max-width: 768px){
  .linkbtn{
    width: 15%
  }
  .linkhome{
    width: 85%
  }
}
  
</style>