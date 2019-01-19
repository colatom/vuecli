// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import zhTW from 'vee-validate/dist/locale/zh_CN';

import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';


VeeValidate.Validator.localize('zh_TW', zhTW)
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);


Vue.use(VeeValidate,{
  events: 'input|blur',
  locale: 'zh_TW'
});

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString); // 这是时间戳转时间
});


axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) =>{
  console.log('to',to ,'from', from,'next', next)
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data)
      if(response.data.success){
        next();
      }else{
        next({
          path:'/login'
        })
      }
    })
  }else{
    next()
  }  
})