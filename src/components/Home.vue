<template>
  <div>
    <Navbar @userLogin="login"> </Navbar>
    
    <div class="container-fluid">
      <div class="row">                
        <div class="col-md-12 ml-sm-auto col-lg-12 px-4 mt-5">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer></Footer><Alert></Alert>
  </div>
</template>


<script>
import Navbar from './Navbar';
import Alert from './AlertMessage';
import Footer from './Footer';


export default {  
  methods:{
    login(){
      const vm = this;
      vm.$router.push('/login')
    }
  },
  components:{
        Navbar,  
        Alert,
        Footer,
  }
}
</script>