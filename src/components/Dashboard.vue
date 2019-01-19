<template>
  <div>
    <Navbar @userSignout="signout"> </Navbar>
    
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
import Navbar from './DashNavbar';
import Alert from './AlertMessage';
import Footer from './Footer';


export default {  
  methods:{
    signout(){
        const vm = this;
        const api = `${process.env.APIPATH}/logout`;
        this.$http.post(api).then((response) => {
            // console.log(response.data);
            if(response.data.success){     
            vm.$router.push('/*')
            };
        });
    },
  },
  components:{
        Navbar,  
        Alert,
        Footer,
  }
}
</script>