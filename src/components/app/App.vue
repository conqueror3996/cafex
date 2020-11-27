<template>
  <div id="container">
    <header class="clearfix header">
      <a :class="($router.currentRoute.path !== '/WA01010600')?'logo':'logo-small'" @click="goHome"
        >
        <img class="mw100" :src="imgLogo" alt="logo CafeX"
      /></a>
      <div class="contact" v-if="$router.currentRoute.path === '/WA01010600'">
        <p>お客様対応画面<a href="#" style="padding-left:3rem;">ヘルプ</a></p>
      </div>
      <div class="account" v-if="this.employees.employee && !ignorePath.includes($router.currentRoute.path)">
        <img class="mw100" :src="imgMyAccountIconGreen" alt="account"/>
        <ul class="list_account-action">
          <li><router-link :to="{ name: 'WA01010200' }" tag="a">パスワード変更</router-link></li>
          <li @click="loggingOut()"><span>ログアウト</span></li>
          <!-- <router-link :to="{ name: 'WA01010100' }" tag="a" >ログアウト</router-link> -->
        </ul>
      </div>
			<div v-if="alert.message" :class="`alert alert-message pre-formatted ${alert.type}`">
				<p>{{alert.message}}</p>
			</div>
    </header>

    <div class="inner">
      <router-view></router-view>
    </div>

    <!-- <div class="main">
        <div class="header">
            <a class="logo" href="/WA01010300">
                <img :src="imgLogo" alt="logo"/>
            </a>
            <b-dropdown id="my-account" right class="m-2" v-if="account.user">
                <template slot="button-content">
                    <img class="img-fluid p-2" :src="imgMyAccountIcon" width="50"/>
                </template>
                <b-dropdown-item href="/WA01010200">パスワード変更</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="/WA01010100">ログアウト</b-dropdown-item>
                <!- <b-dropdown-item href="#">{{account}}</b-dropdown-item> ->
            </b-dropdown>
        </div>
        <!- <div class="container div-container">
            <div class="row div-login">
                    <router-view></router-view>
            </div>
        </div> 
        <div id="container">
            <div class="inner"> <!-v-if="alert.message" ->
                <div :class="`alert alert-danger ${alert.type} pre-formatted`">{{alert.message}}</div>
                <div class="row div-login">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      imgLogo: './static/img/logo-green-JA.svg',
      imgMyAccountIcon: './static/img/my_account.svg',
      imgMyAccountIconGreen: './static/img/account-green.svg',
      ignorePath: ['/WA01010600', '/WA01010200', '/WA01010201'],
    };
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      employees: (state) => state.employees
      // changePasswordState: (state) => state.changePasswordState
    }),
  },
  created() {
      // this.userInfo().then(() => {
      // })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
    ...mapActions('employees', ['userInfo', 'logout']),
    loggingOut() {
      this.logout()
    },
    goHome() {
      if(!this.employees.employee || !this.employees.employee.rollCode) return;
      if(this.$router.currentRoute.path === '/WA01010600') return;
      if(this.employees.employee.rollCode) {
        if (this.$router.currentRoute.path !== '/WA01020300') this.$router.push('/WA01020300')
      } else {
        if (this.$router.currentRoute.path !== '/WA01010300') this.$router.push('/WA01010300')
      }
    }
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
  },
};
</script>

<style>
/* .div-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.div-login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 484px;
  height: 498px;
  background-color: #ffffff;
  border-radius: 10px;
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  min-width: 1300px;
}

#my-account {
  height: fit-content;
}

#my-account .btn-secondary {
  background-color: transparent !important;
  border-color: transparent !important;
}

#container {
  max-width: 1360px;
  margin: 0 auto;
}
.inner {
  max-width: 1360px;
  margin: auto;
}

.logo {
  display: inline-block;
  padding: 10px 0 0 10px;
}
*/
</style>
