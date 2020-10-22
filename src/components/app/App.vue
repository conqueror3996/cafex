<template>
    <div class="main">
        <div class="header">
            <a class="logo" href="/">
                <img :src="img" alt="logo"/>
            </a>
            <b-dropdown id="my-account" right class="m-2" v-if="account.user">
                <template slot="button-content">
                    <img class="img-fluid p-2" src="src/assets/images/my-account.png" width="50"/>
                </template>
                <b-dropdown-item href="/WA01010200">パスワード変更</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item href="/WA01010100">ログアウト</b-dropdown-item>
                <!-- <b-dropdown-item href="#">{{account}}</b-dropdown-item> -->
            </b-dropdown>
        </div>
        <!-- <div class="container div-container">
            <div class="row div-login">
                    <router-view></router-view>
            </div>
        </div> -->
        <div id="container">
            <div class="inner"> <!--v-if="alert.message" -->
                <div :class="`alert alert-danger ${alert.type}`">{{alert.message}}</div>
                <div class="row div-login">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'app',
    data() {
        return {
            img: './static/img/logo-cafex.png'
        }
    },
    computed: {
        ...mapState({
            alert: state => state.alert,
            account: state => state.account,
            // changePasswordState: (state) => state.changePasswordState
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } 
};
</script>

<style>
    .div-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-top: 5rem; */
    width: 100%;
    height: 100%;
}

.div-login {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    flex-direction: column;
    width: 484px; 
    height: 498px;
    background-color: #FFFFFF;
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

#container{
        max-width:1360px;
        margin: 0 auto;
}
.inner{
    max-width: 1360px;
    margin:auto;
}

.logo {
    display: inline-block;
    padding: 10px 0 0 10px;
}
</style>