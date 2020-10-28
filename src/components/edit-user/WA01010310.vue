<template>
    <div class="main-content">
        <b-form @submit.stop.prevent="handleShowEdit()" class="form-info">
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">氏名 :</label></div>
                <div><b-input class="input-form" type="text" id="name" maxlength=38 v-model="user.fullname" autofocus></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="namekana">カナ :</label></div>
                <div><b-input class="input-form" type="text" id="namekana" maxlength=38 v-model="user.namekana"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="birthday">生年月日 :</label></div>
                <div><b-input class="input-form" type="text" id="birthday" maxlength=10 v-model="user.birthday"></b-input></div>
            </div>
            
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="phone1">電話番号1 :</label></div>
                <div><b-input class="input-form" type="text" id="phone1" maxlength=12  v-model="user.phone1"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="phone2">電話番号2 :</label></div>
                <div><b-input class="input-form" type="text" id="phone2" maxlength=12 v-model="user.phone2"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="email">メールアドレス :</label></div>
                <div><b-input class="input-form" type="text" id="email" maxlength=190 v-model="user.email"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="postal">郵便番号 :</label></div>
                <div><b-input class="input-form" type="text" id="postal" maxlength=7 v-model="user.postalcode"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="address">住所 : </label></div>
                <div><b-input class="input-form" type="text" id="address" maxlength=100 v-model="user.address"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="memo">メモ :</label></div>
                <div><b-input class="input-form" type="text" id="memo" maxlength=100 v-model="user.memo"></b-input></div>
            </div>
            <div class="form-button">
                <b-button type="submit" variant="primary" >変更</b-button>
                
                <b-button variant="danger" @click="handleCancle()">キャンセル</b-button>
            </div>
        </b-form>
        <WA01010311 v-if="showConfirmEdit" :showConfirmEdit="showConfirmEdit" @changeModalConfirm="showConfirmEdit = $event"></WA01010311>
        <!-- <b-modal id="modal-error" hide-header centered :visible="$v.$invalid && submited">
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
        </b-modal> -->
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WA01010311 from './WA01010311.vue';

import validate from '../../validate/validate.js'
import userValidatePattern from '../../validate/consumer/consumer-validate'
import errormessage from '../../validate/errormessage';

export default {
    data() {
        return {
            showConfirmEdit: false,
            submited: false,
            user:{
                fullname: 'Khang',
                namekana: '',
                age: '24',
                birthday: '1996/03/09',
                postalcode: '3424',
                address: '32/2',
                phone1: '19001560',
                phone2: '19001560',
                memo: 'manhkhang@vn-cubesystem.com'
            },
        }
    },
    components: {
        WA01010311,
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    created() {
        this.getConsumerById(this.$route.params.consumerId)
    },
    methods: {
        ...mapActions("alert", {
            error: "error",
        }),
        ...mapActions("consumers", {
            getConsumerById: "getConsumerById",
            //   deleteItem: "deleteItem"
        }),
        handleShowEdit() {
            // validate
            const errorCode = validate.validateInput(userValidatePattern, this.user);
            console.log(errorCode)
            if(errorCode.length > 0) {
                const messageError = validate.getArrayMessageError(errorCode);
                this.error(messageError.join("\n"));
                return;
            }
            
            // reset slert message
            if(this.alert.message !== '') {
                this.error('');
            }

            // show modal confirm
            this.showConfirmEdit = true;
        },
        handleCancle() {
            this.$emit("changeEdit", false)
        }
    }
}
</script>

<style>
.main-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 60%;
    margin: auto;
}

.main-content .form-info {
    margin-top: 3rem;
}

.main-content .input-row {
    display: flex;
    flex-direction: row;
    margin: 1rem 0;
}

.main-content .input-form {
    width: 495px;
    height: 35px;
}

.input-form-54px {
    width: 54px;
}

.input-form-84px {
    width: 84px;
}

.main-content .label-form {
    width: 12rem;
    text-align: right;
    padding-right: 2rem;
    font-size: 18px;
}

.main-content .form-button {
    text-align: center;
    padding-top: 1.5rem;
}

.main-content .form-button button{
    width: 172px;
    height: 44px;
    margin: 0 2rem;
    border-radius: .5rem;
}

.main-content .field-request {
    display: inline;
    font-size: 12px;
    background-color: #dedede;
    border-radius: 0.5rem;
    vertical-align: super;
    margin-right: .5rem;
}

@media (max-width: 1200px) {
  .main-content {
      width: 70%;
      margin: auto;
  }
};

@media (max-width: 1000px) {
  .main-content {
      width: 80%;
      margin: auto;
  }
};

@media (max-width: 969px) {
  .main-content {
      width: 90%;
      margin: auto;
  }
};

@media (max-width: 800px) {
  .main-content {
      margin: auto;
  }
  .main-content .input-form {
      width: 375px;
      height: 35px;
  }
  .main-content .label-form {
    font-size: 16px;
  }
};

@media (max-width: 600px) {
  .main-content .input-form {
      width: 305px;
      height: 30px;
  }
  .main-content .label-form {
    width: 12rem;
    text-align: right;
    padding-right: 2rem;
    font-size: 15px;
  }
};


@media (max-width: 500px) {
  .main-content .input-form {
      width: 100%;
      height: 28px;
  }
  .main-content .label-form {
    width: 10rem;
    text-align: right;;
    padding-right: 2rem;
    font-size: 14px;
  }
};
</style>