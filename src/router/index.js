import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/pages/login';
import Home from '@/components/Home';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import CustomerOrder from '@/components/pages/CustomerOrders';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import Coupon from '@/components/pages/Coupon';
import CustomerCart from '@/components/pages/CustomerCart';
import CustomerProfile from '@/components/pages/CustomerProfile';
import Detail from '@/components/pages/Detail';
import HomePage from '@/components/pages/HomePage';
import Dashboard from '@/components/Dashboard';

Vue.use(Router)


export default new Router({
  linkActiveClass :'active',
  routes: [
    {
      path:'*',
      redirect:'/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,      
      children:[
        {
          path: '',
          name: 'Products',
          component: Products,
          meta:{ requiresAuth: true },
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta:{ requiresAuth: true },
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta:{ requiresAuth:  true },
        },
      ],
    },
    
    {
      path: '/',
      component: Home,      
      children:[
        
        {
          path: '',
          name: 'HomePage',
          component: HomePage,          
        },
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,          
        },
        {
          path: 'customer_cart',
          name: 'CustomerCart',
          component: CustomerCart,          
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,          
        },
        {
          path: 'customer_profile',
          name: 'CustomerProfile',
          component: CustomerProfile,          
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: Detail,          
        }
      ],
    },

  ],
})
