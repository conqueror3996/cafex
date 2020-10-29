import Vue from 'vue';
import Router from 'vue-router';

import WA01010300 from '../components/home/WA01010300'
import WA01010310 from '../components/edit-user/WA01010310'
import WA01010100 from '../components/login/WA01010100'
import RegisterPage from '../components/register/RegisterPage'
import WA01010200 from '../components/change-password/WA01010200'
import WA01010201 from '../components/change-password/WA01010201'
import WA01010400 from '../components/consumer-information/WA01010400'
import WA01010500 from '../components/manage-file/WA01010500'
import WA01010600 from '../components/contact/WA01010600'
import WA01020300 from '../components/agent/manage-mode/WA01020300'
import WA01020400 from '../components/agent/dashboard/WA01020400'
import WA01020501 from '../components/agent/registration-employee/WA01020501'
import { auth } from './auth';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/WA01010100', 
      name: 'WA01010100',
      component: WA01010100,
    },// login
    { 
      path: '/WA01010300', 
      name: 'WA01010300',
      component: WA01010300, 
      meta : { 
        authRequired : true
      } 
    }, // dashboard
    { 
      path: '/WA01010310/:consumerId', 
      name: 'WA01010310',
      component: WA01010310, 
      meta : { 
        authRequired : true
      } 
    }, // edit user
    { 
      path: '/WA01020300', 
      name: 'WA01020300',
      component: WA01020300, 
      meta : { 
        authRequired : true,
        is_admin: true
      } 
    }, // home admin
    { 
      path: '/register', 
      name: 'register',
      component: RegisterPage,
    },
    { 
      path: '/WA01010200', 
      name: 'WA01010200',
      component: WA01010200,
      meta : { 
        authRequired : true
      }  
    }, //change-password
    { 
      path: '/WA01010201', 
      name: 'WA01010201',
      component: WA01010201,
      meta : { 
        authRequired : true
      }  
    }, //complete-change-password
    { 
      path: '/WA01010400', 
      name: 'WA01010400',
      component: WA01010400,
      meta : { 
        authRequired : true
      }  
    }, //customer-info
    { 
      path: '/WA01010500', 
      name: 'WA01010500',
      component: WA01010500,
      meta : { 
        authRequired : true
      }  
    }, //manage-file
    { 
      path: '/WA01010600', 
      name: 'WA01010600',
      component: WA01010600,
      meta : { 
        authRequired : true
      }  
    }, //manage-file
    { 
      path: '/WA01020400', 
      name: 'WA01020400',
      component: WA01020400,
      meta : { 
        // authRequired : true
      }  
    }, //manage-employee
    { 
      path: '/WA01020501', 
      name: 'WA01020501',
      component: WA01020501,
      meta : { 
        // authRequired : true
      }  
    }, //complete-register-employee

    // otherwise redirect to home
    { path: '*', redirect: '/WA01010300' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  if(!to.meta.authRequired && !auth.isLoggedIn){
    next({
      path: '/WA01010100', //Login
      params: { nextUrl: to.fullPath }
    })
  }else{
    next();
  }
  // const publicPages = ['/WA01010100', '/register'];
  // const authRequired = !publicPages.includes(to.path);
  // // const loggedIn = localStorage.getItem('user');
  // const loggedIn = connectAPI.getToken()

  // if (authRequired && !loggedIn) {
  //   return next('/WA01010100'); //LOGIN
  // }

  // next();
})