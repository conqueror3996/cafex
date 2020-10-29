<template>
  <div id="container">
    <header class="clearfix header">
      <a :class="($router.currentRoute.path !== '/WA01010600')?'logo':'logo-small'" href="/WA01010300"
        >
        <img class="mw100" :src="imgLogo" alt="logo CafeX"
      /></a>
      <div class="contact" v-if="$router.currentRoute.path === '/WA01010600'">
        <p>お客様対応画面 &nbsp;&nbsp;&nbsp;   <a href="#">ヘルプ</a></p>
      </div>
        <!-- employees.employee &&  -->
      <div class="account" v-if="$router.currentRoute.path !== '/WA01010600'">
        <img class="mw100" :src="imgMyAccountIcon" alt="account" v-if="$router.currentRoute.path === '/WA01010300'"/>
        <img class="mw100" :src="imgMyAccountIconGreen" alt="account" v-if="$router.currentRoute.path !== '/WA01010300'"/>
        <ul class="list_account-action">
          <li><a href="/WA01010200">パスワード変更</a></li>
          <li><a href="/WA01010100">ログアウト</a></li>
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
      imgLogo: './static/img/logocafex.svg',
      imgMyAccountIcon: './static/img/my_account.svg',
      imgMyAccountIconGreen: './static/img/account-green.png',
    };
  },
  computed: {
    ...mapState({
      alert: (state) => state.alert,
      employees: (state) => state.employees,
      // changePasswordState: (state) => state.changePasswordState
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear",
    }),
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
.inner{max-width: 1327px;margin:auto;}
.inner .alert{white-space: pre-line;width: 50%;margin-left: auto;margin-right: auto;border-radius: .5rem;}
.logo{display:inline-block;padding:10px 0px 0px 10px;width:15%;float:left;}
.logo img {filter: invert(37%) sepia(86%) saturate(689%) hue-rotate(132deg) brightness(65%) contrast(101%);}
.logo-small { display:inline-block;padding:10px 0px 0px 10px;width:7%;float:left;}
.logo-small img {filter: invert(37%) sepia(86%) saturate(689%) hue-rotate(132deg) brightness(65%) contrast(101%);}
.mw100{max-width:100%;}
.header{position:relative;left:0px;right:0px;width:100%;}
.account{position:absolute;right:0px;top:20px;width:170px;height:50px;}
.account img{float:right;padding-right: 3rem;}
.account:hover .list_account-action{opacity:1;transition:0.2s all;visibility:visible;}
.alert-message{max-width:500px;position: relative;;left:0px;right:0px;bottom:0px;top:10px;margin:auto;z-index:99}
.alert-message p {margin-bottom: 0px;}
.list_account-action{width:162px;position:absolute;background:#fff;border-radius:5px;right:20px;top:55px;list-style:none;border:1px solid #b1acac;padding:0px;visibility:hidden; opacity:0;transition:0.2s all;}
.list_account-action li{padding:10px 0px 10px 15px;border-bottom:1px solid #e0e0e0;}
.list_account-action li:last-child{border-bottom:none}
.list_account-action li:hover{background:#eee;}
.list_account-action li a{color:#000;}
.list_account-action li a:hover{text-decoration:none;}
.contact {max-width: 500px; float: left; margin-left: 3rem;}
.contact p{font-size: 34px; font-weight: 200; font-family: "HiraginoSans-W3"; padding-top: 2.75rem; margin-bottom: 0px;}
.contact a {color: #000; text-decoration: underline; font-size: 20px;}

/*login*/
.box-login{width:484px;margin:20px auto 0px auto;background:#fff;border-radius:10px;padding:3rem;box-sizing:border-box;}
.box-login > p.title{text-align:center;font-size:24px;border-bottom:2px solid rgb(151, 151, 151);margin-bottom:35px;}
/* .box-login form div.form-group{margin-bottom:30px;} */
.btn-login{width:60%;margin:75px auto 0px auto;display:block;}

/* table */
.table td,
.table th {
  border-top: 0px;
  padding: 0.25rem 0.75rem;
  vertical-align: middle;
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
</style>
