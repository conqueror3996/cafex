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
import WA01020300 from '../components/administrator/manage-mode/WA01020300'
import WA01020400 from '../components/administrator/dashboard/WA01020400'
import WA01020501 from '../components/administrator/registration-employee/WA01020501'
import { auth } from './auth';
import vuex from "vuex";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { 
      path: '/WA01010100', 
      name: 'WA01010100',
      component: WA01010100,
      meta : { 
        guest: true,
        requiresAuth : false
      } 
    },// login
    { 
      path: '/WA01010200', 
      name: 'WA01010200',
      component: WA01010200,
      meta : { 
        requiresAuth : false
      }  
    }, //change-password
    { 
      path: '/WA01010201', 
      name: 'WA01010201',
      component: WA01010201,
      meta : { 
        requiresAuth : true
      }  
    }, //complete-change-password
    { 
      path: '/WA01010300', 
      name: 'WA01010300',
      component: WA01010300, 
      meta : { 
        requiresAuth : true
      } 
    }, // dashboard
    { 
      path: '/WA01010310/:consumerId', 
      name: 'WA01010310',
      component: WA01010310, 
      meta : { 
        requiresAuth : true
      } 
    }, // edit user
    { 
      path: '/register', 
      name: 'register',
      component: RegisterPage,
    },
    { 
      path: '/WA01010400', 
      name: 'WA01010400',
      component: WA01010400,
      meta : { 
        requiresAuth : true
      }  
    }, //customer-info
    { 
      path: '/WA01010500', 
      name: 'WA01010500',
      component: WA01010500,
      meta : { 
        requiresAuth : true
      }  
    }, //manage-file
    { 
      path: '/WA01010600', 
      name: 'WA01010600',
      component: WA01010600,
      meta : { 
        requiresAuth : true
      }  
    }, //manage-file
    { 
      path: '/WA01020300', 
      name: 'WA01020300',
      component: WA01020300, 
      meta : { 
        requiresAuth : true,
        is_admin: true
      } 
    }, // dashboard admin
    { 
      path: '/WA01020400', 
      name: 'WA01020400',
      component: WA01020400,
      meta : { 
        requiresAuth : true,
        is_admin: true
      }  
    }, //manage-employee
    { 
      path: '/WA01020501', 
      name: 'WA01020501',
      component: WA01020501,
      meta : { 
        requiresAuth : true,
        is_admin: true
      }  
    }, //complete-register-employee

    // otherwise redirect to home
    { path: '*', redirect: '/WA01010300' }
  ]
});


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.isLoggedIn()) {
      next({
        path: '/WA01010100',
        params: { nextUrl: to.fullPath }
      });
      // if (to.path !== "/WA01010100") {
      //     next({
      //       path: '/WA01010100',
      //       params: { nextUrl: to.fullPath }
      //     });
      // } else {
      //     next()
      // }
    } else {
      const employee = JSON.parse(auth.getAuthToken())
      if (to.matched.some(record2 => record2.meta.is_admin)) {
        if (employee.rollCode === '21') {
          next();
        } else {
          next({ name: 'WA01010300' });
        }
      } else {
        if (to.matched.find(record2 => record2.name).name === 'WA01010600') {
          // window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';
          window.document.title = 'CafeMeet｜リモート相談'
        } else {
          window.document.title = 'CafeMeet'
        }
        next();
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!auth.isLoggedIn()) {
      next();
    } else {
      next({ name: 'WA01010300'})
    }
  } else {
    next();
  }


  // if (!auth.isLoggedIn()) {
  //   if (to.path !== "/WA01010100") {
  //       next({
  //         path: '/WA01010100',
  //         params: { nextUrl: to.fullPath }
  //       });
  //   } else {
  //       next()
  //   }
  // } 

  // next();

})