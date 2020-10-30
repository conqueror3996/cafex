<template>
    <div class="box-login">
        <div>
            <p class="div-manage-mode">管理モードを選択してください</p>
        </div> 
        <div class="div-space-title"></div>
        <div class="selection-mode">
            <b-button class="bg-transparent border-0" variant="primary" @click="$router.push({path:'/WA01020400'})">
                <img :src="imgEmployeeMode">
            </b-button>
            <div class="div-space">
            </div>
            <b-button class="bg-transparent border-0" variant="primary" @click="$router.push({name: 'WA01010300',  params: { isAgent: true } })">
                <img :src="imgConsumerMode">
            </b-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data () {
        return {
            imgEmployeeMode: './static/img/btn_employee_manage.svg',
            imgConsumerMode:'./static/img/btn_consumer_manage.svg'

        }
    },
    methods: {

    }
}
</script>

<style>
    .div-manage-mode {
        font-size: 24px;
    }
    .div-space {
        margin: 42px 0px 0px 0px;
    }
    .div-space-title {
        margin: 43px 0px 0px 0px;
    }
    .box-login {
        width: 460px;
        height: 390px;
    }
    .selection-mode button, .selection-mode a{
        box-shadow: unset !important;
    }
</style>