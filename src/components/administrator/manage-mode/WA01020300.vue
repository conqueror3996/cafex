<template>
    <div class="box">
        <div>
            <p class="div-manage-mode">管理モードを選択してください</p>
        </div> 
        <div class="div-space-title"></div>
        <div class="selection-mode">
            <b-button class="bg-transparent border-0 btn-employee" variant="primary" @click="$router.push({path:'/WA01020400'})">
                <img :src="imgEmployeeMode">
            </b-button>
            <div class="div-space">
            </div>
            <b-button class="bg-transparent border-0 btn-consumer" variant="primary" @click="$router.push({name: 'WA01010300'})">
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
    created() {
        this.getUserInfo()
    },
    methods: {
        ...mapActions("employees", {
            getUserInfo: "userInfo",
        }),
    }
}
</script>