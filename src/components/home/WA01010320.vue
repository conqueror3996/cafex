<template>
    <div class="main-content">
        <b-form @submit.stop.prevent class="form-info">
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">氏名 :</label></div>
                <div><b-input class="input-form" type="text" id="name"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="namekana">カナ :</label></div>
                <div><b-input class="input-form" type="text" id="namekana"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="birthday">生年月日 :</label></div>
                <div><b-input class="input-form" type="text" id="birthday"></b-input></div>
            </div>
            
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="phone1">電話番号1 :</label></div>
                <div><b-input class="input-form" type="text" id="phone1"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="phone2">電話番号2 :</label></div>
                <div><b-input class="input-form" type="text" id="phone2"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="email">メールアドレス :</label></div>
                <div><b-input class="input-form" type="text" id="email"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="zipcode">郵便番号 :</label></div>
                <div style="display: flex; flex-direction: row;"><b-input class="input-form-zipcode1" type="text" id="zipcode1"></b-input><span style="padding-top: 0.5rem;">&nbsp;&nbsp;-&nbsp;&nbsp;</span><b-input class="input-form-zipcode2" type="text" id="zipcode2"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="address">住所 : </label></div>
                <div><b-input class="input-form" type="text" id="address"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="memo">メモ :</label></div>
                <div><b-input class="input-form" type="text" id="memo"></b-input></div>
            </div>
            <div class="form-button">
                <b-button variant="primary" @click="handleShow()">確認</b-button>
            </div>
            <WA01010321 v-if="showModal" :showModal="showModal" @changeShowModal="showModal = $event"></WA01010321>
        </b-form>
    </div>
</template>

<script>
import WA01010321 from './WA01010321.vue'
export default {
    data() {
        return {
            showModal: false,
        }
    },
    components: {
        WA01010321,
    },
    methods: {
        handleShow() {
            this.showModal = true;
        },
    }
}
</script>

<style scoped>
.main-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 712px;
    margin: auto;
}

.form-info {
    margin-top: 3rem;
}

.input-row {
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
}

.input-form {
    width: 495px;
    height: 35px;
}

.input-form-zipcode1 {
    width: 54px;
}

.input-form-zipcode2 {
    width: 84px;
}

.label-form {
    width: 12rem;
    text-align: right;
    padding-right: 2rem;
    font-size: 18px;
}

.form-button {
    text-align: center;
    padding-top: 1.5rem;
}

.form-button button{
    width: 172px;
    height: 44px;
}

.field-request {
    display: inline;
    font-size: 12px;
    background-color: #dedede;
    border-radius: 0.5rem;
    vertical-align: super;
    margin-right: .5rem;
}
</style>