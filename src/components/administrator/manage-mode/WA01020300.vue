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
<style scoped>
/* .box{width:calc(25vw - 30px);height:calc(50vh - 50px);margin:20px auto 0px auto;background:#fff;border-radius:10px;padding:3rem;box-sizing:border-box;}

.div-manage-mode {
    font-size: 24px;
}
.div-space {
    margin: 42px 0px 0px 0px;
}
.div-space-title {
    margin: 43px 0px 0px 0px;
}
.selection-mode button, .selection-mode a{
    box-shadow: unset !important;
}
.div-space {
    margin: 33px 0px 0px 0px;
}
.div-space-title {
    margin: 38px 0px 0px 0px;
}

.btn-employee img {
    height: calc(10vh - 7px);
    width: calc(17vw - 5px);
}

.btn-consumer img {
    height: calc(10vh - 7px);
    width: calc(17vw - 5px);
} */
</style>