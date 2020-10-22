import Vue from 'vue';
import Router from 'vue-router';

import WA01010300 from '../components/home/WA01010300'
import WA01010100 from '../components/login/WA01010100'
import RegisterPage from '../components/register/RegisterPage'
import WA01010200 from '../components/change-password/WA01010200'
import WA01010201 from '../components/change-password/WA01010201'
import WA01010400 from '../components/customer-information/WA01010400'
import WA01010500 from '../components/manage-file/WA01010500'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: WA01010300 }, // home
    { path: '/WA01010100', component: WA01010100 }, // login
    { path: '/register', component: RegisterPage },
    { path: '/WA01010200', component: WA01010200 }, //change-password
    { path: '/WA01010201', component: WA01010201 }, //complete-change-password
    { path: '/WA01010400', component: WA01010400 }, //customer-info
    { path: '/WA01010500', component: WA01010500 }, //manage-file

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/WA01010100', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // const privatePages = ['/WA01010201']
  // const isDenied = privatePages.includes(to.path);

  if (authRequired && !loggedIn) {
    return next('/WA01010100'); //LOGIN
  }

  // if (isDenied) {
  //   return next('/WA01010200')
  // }

  next();
})