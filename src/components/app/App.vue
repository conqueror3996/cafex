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
.pre-formatted {
  white-space: pre-line;
} 
body{margin:0px;padding:0px;background:#f0f0f0;overflow:hidden;width:100%;height:100vh;}
#container{width:100%;margin:auto;}
/* .inner{max-width: 1344px;margin:auto;} */
.inner{width:calc(100% - 20px);margin:auto;max-width:unset !important}
.inner .alert{white-space: pre-line;width: 50%;margin-left: auto;margin-right: auto;border-radius: .5rem;}
.screen-medium {max-width: 1327px; margin: auto;}
.logo{display:inline-block;padding:10px 0px 0px 10px;width:8.5%;}
/* .logo img {filter: invert(37%) sepia(86%) saturate(689%) hue-rotate(132deg) brightness(65%) contrast(101%);} */
.logo-small { display:inline-block;padding:10px 0px 0px 10px;width:7%;}
.logo-small img {vertical-align: unset;}
.mw100{max-width:100%;}
.header{position:relative;left:0px;right:0px;width:100%;}
.account{position:absolute;right:0px;top:20px;width:170px;height:50px;}
.account img{float:right;padding-right: 3rem;}
.account:hover .list_account-action{opacity:1;transition:0.2s all;visibility:visible;}
.alert-message{max-width:500px;position:absolute;left:0px;right:0px;bottom:0px;margin:auto;z-index:99}
.alert-message p {margin-bottom: 0px;}
.list_account-action{width:162px;position:absolute;background:#fff;border-radius:5px;right:20px;top:55px;list-style:none;border:1px solid #b1acac;padding:0px;visibility:hidden; opacity:0;transition:0.2s all;}
.list_account-action li{padding:10px 0px 10px 15px;border-bottom:1px solid #e0e0e0;}
.list_account-action li:last-child{border-bottom:none}
.list_account-action li:hover{background:#eee;}
.list_account-action li a{color:#000;}
.list_account-action li a:hover{text-decoration:none;}
.list_account-action li span {cursor: pointer;}
.contact {max-width: 500px; display: inline-block; margin-left: 3rem; vertical-align: top;}
.contact p{font-size: 34px; font-weight: 200; padding-top: 2rem; margin-bottom: 0px;}
.contact a {color: #000; text-decoration: underline; font-size: 20px;}

/* table */
.table {
  /* display: table; */
  table-layout: fixed;
}
.table td {
  height: 52px;
}
.table td,
.table th {
  border-top: 0px;
  padding: 0.25rem 0.75rem;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table thead th {
  border-bottom: 2px solid #9d9fa0;
  font-weight: normal;
}
.table-hover tbody tr:hover {
    background-color: rgba(203, 245, 229, 0.4);
}
.table-active,
.table-active > td,
.table-active > th {
  background-color: rgba(203, 245, 229, 0.4);
}

.table-hover .table-active:hover>td, .table-hover .table-active:hover>th {
  background-color: rgba(203, 245, 229, 0.4);
}
:focus {
    outline: -webkit-focus-ring-color auto 0px;
}
/* modal */
.modal-backdrop {
  opacity: 0.5 !important;
  background-color: #ffffff;
}

@media(max-width: 1200px){
  .logo-small { display:inline-block;padding:10px 0px 0px 10px;width:10%;}
  .contact p{padding-top: 2.75rem;}
}

@media(max-width: 800px){
	.logo{margin-bottom:10px;}
	.alert-message{position:static;top:unset;width:95%;max-width:unset;clear:both;}
}
@media (max-width:600px){
	#container{padding:0px 10px;}
	.alert-message{width:100%;}
	.logo{width:35%;float:left;margin-bottom:10px;}
	.box-login{margin-top:20px;width:100%;height:auto;padding:40px 15px;}
	.btn-login{margin-top:40px}
}
@media(max-width:500px){
	.logo{width:25%;}
}
@media(max-width:1920px){
	.header {
    height: 145px;
  }
  .logo {
    width: 9.5%;
  }
  .account img {
    height: 60px;
  }
};
@media(max-width:1367px) {
  .account {
    height: 50px;
  }
  .header {
    width: 100%;
  }
}
</style>
