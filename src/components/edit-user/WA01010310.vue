<template>
    <div class="main-content">
        <b-form @submit.stop.prevent="handleShowEdit()" class="form-info">
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">氏名 :</label></div>
                <div><b-input class="input-form" type="text" id="name" maxlength=38 v-model="user.fullname"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="namekana">カナ :</label></div>
                <div><b-input class="input-form" type="text" id="namekana" maxlength=38></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="birthday">生年月日 :</label></div>
                <div><b-input class="input-form" type="text" id="birthday" maxlength=10></b-input></div>
            </div>
            
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="phone1">電話番号1 :</label></div>
                    <b-input class="input-form-84px" type="text" id="phone11" maxlength=4 v-model="user.phone11"></b-input>
                    <span style="padding-top: 0.5rem;">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <b-input class="input-form-84px" type="text" id="phone12" maxlength=4 v-model="user.phone12"></b-input>
                    <span style="padding-top: 0.5rem;">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <b-input class="input-form-84px" type="text" id="phone13" maxlength=4 v-model="user.phone13"></b-input>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="phone2">電話番号2 :</label></div>
                    <b-input class="input-form-84px" type="text" id="phone21" maxlength=4></b-input>
                    <span style="padding-top: 0.5rem;">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <b-input class="input-form-84px" type="text" id="phone22" maxlength=4></b-input>
                    <span style="padding-top: 0.5rem;">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <b-input class="input-form-84px" type="text" id="phone23" maxlength=4></b-input>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="email">メールアドレス :</label></div>
                <div><b-input class="input-form" type="text" id="email" maxlength=190></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="zipcode">郵便番号 :</label></div>
                <div style="display: flex; flex-direction: row;">
                    <b-input class="input-form-54px" type="text" id="zipcode1" maxlength=3></b-input>
                    <span style="padding-top: 0.5rem;">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                    <b-input class="input-form-84px" type="text" id="zipcode2" maxlength=4></b-input>
                    </div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="address">住所 : </label></div>
                <div><b-input class="input-form" type="text" id="address" maxlength=100></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="memo">メモ :</label></div>
                <div><b-input class="input-form" type="text" id="memo" maxlength=100></b-input></div>
            </div>
            <div class="form-button">
                <b-button type="submit" variant="primary" >変更</b-button>
                
                <b-button variant="danger" @click="handleCancle()">キャンセル</b-button>
            </div>
        </b-form>
        <WA01010311 v-if="showConfirmEdit" :showConfirmEdit="showConfirmEdit" @changeModalConfirm="showConfirmEdit = $event"></WA01010311>
        <b-modal id="modal-error" hide-header centered :visible="$v.$invalid && submited">
            <div>           
                <div class="error" v-if="!$v.user.fullname.required ">氏名は必須項目です。</div>
                <div class="error" v-if="(!$v.user.phone11.required || !$v.user.phone12.required || !$v.user.phone13.required)">電話番号1は必須項目です。</div>
            </div>
            <template #modal-footer="{ ok }">
              <div>
                <b-button
                  size="sm"
                  variant="primary"
                  @click="ok()"
                >
                  削除
                </b-button>
              </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import WA01010311 from './WA01010311.vue';
import userValidate from '../../validate/user/user-validate.js'
import { required, alphaNum } from 'vuelidate/lib/validators'
import validate from '../../validate/validate.js'

export default {
    data() {
        return {
            showConfirmEdit: false,
            submited: false,
            user:{
                fullname: 'Khang',
                name_kana: 'Khang',
                age: '24',
                birthday: '1996/03/09',
                post_code: '3424',
                address: '32/2',
                phone11: '091',
                phone12: "1234",
                phone13: "4124",
                phone2: '19001560',
                memo: 'manhkhang@vn-cubesystem.com'
            },
        }
    },
    validations: {
        user: userValidate
    },
    components: {
        WA01010311,
    },
    methods: {
        handleShowEdit() {
            this.submited = true;
            this.$v.$touch();
            validate();
            if (this.$v.$invalid) {
                this.$v
                    return;
                }
            this.showConfirmEdit = true;
        },
        handleCancle() {
            this.$emit("changeEdit", false)
        }
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
    /* flex-direction: row; */
    flex-wrap: wrap;
    margin: 1rem 0;
}
.break {
    width: 100%;
    height: 0;
}
.input-row .error {
    color: red;
    padding-left: 10rem;
}

.input-form {
    width: 495px;
    height: 35px;
}

.input-form-54px {
    width: 54px;
}

.input-form-84px {
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
    margin: auto;
}

.form-button button{
    width: 172px;
    height: 44px;
    border-radius: .5rem;
    margin-left: 3rem;
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