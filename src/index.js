import Vue from 'vue';
// import VeeValidate from 'vee-validate';
import { BootstrapVue } from 'bootstrap-vue'
import { Vuelidate } from 'vuelidate';
import 'babel-polyfill'

import { store } from './_store';
import { router } from './_helpers';
import App from './components/app/App';

// Vue.use(VeeValidate);
Vue.use(BootstrapVue)
Vue.use(Vuelidate);

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});