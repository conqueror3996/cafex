<template>
    <div class="box">
        <div>
            <p class="div-manage-mode">管理モードを選択してください</p>
        </div>
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
<style scoped>
.box{width:100%;max-width:460px;height:390px;margin:0px auto;background:#fff;border-radius:10px;padding:30px;box-sizing:border-box;}

.div-manage-mode {
    font-size: 24px;
    text-align: center;
    margin:20px 0px 35px 0px;
}
.div-space {
    margin: 42px 0px 0px 0px;
}
.div-space-title {
    margin: 43px 0px 0px 0px;
}
.selection-mode{text-align: center;}
.selection-mode button, .selection-mode a{
    box-shadow: unset !important;
}
/* .selection-mode {
    padding-left: 10px;
} */
.div-space {
    margin: 33px 0px 0px 0px;
}
.div-space-title {
    margin: 38px 0px 0px 0px;
}

</style>