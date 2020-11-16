<template>
    <div class="main-content">
        <b-form @submit.stop.prevent="handleShowEdit()" class="form-info">
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="consumerName">氏名 :</label></div>
                <div><b-input class="input-form" type="text" id="consumerName" maxlength=38 v-model="localConsumer.consumerName" autofocus></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="consumerNameKana">カナ :</label></div>
                <div><b-input class="input-form" type="text" id="consumerNameKana" maxlength=38 v-model="localConsumer.consumerNameKana"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="birthdate">生年月日 :</label></div>
                <div>
                    <!-- <b-input class="input-form" type="text" id="birthdate" maxlength=10 v-model="localConsumer.birthdate"></b-input> -->
                    <b-input class="input-form" type="date" id="birthday" v-model="localConsumer.birthdate" placeholder="YYYY/MM/DD"></b-input>
                </div>
            </div>
            
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="phoneNumber1">電話番号1 :</label></div>
                <div><b-input class="input-form" type="text" id="phoneNumber1" maxlength=11  v-model="localConsumer.phoneNumber1"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="phoneNumber2">電話番号2 :</label></div>
                <div><b-input class="input-form" type="text" id="phoneNumber2" maxlength=11 v-model="localConsumer.phoneNumber2"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="mailAddress">メールアドレス :</label></div>
                <div><b-input class="input-form" type="text" id="mailAddress" maxlength=190 v-model="localConsumer.mailAddress"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="postalCode">郵便番号 :</label></div>
                <div><b-input class="input-form" type="text" id="postalCode" maxlength=7 v-model="localConsumer.postalCode"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="address">住所 : </label></div>
                <div><b-input class="input-form" type="text" id="address" maxlength=100 v-model="localConsumer.address"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="consumerMemo">メモ :</label></div>
                <div><b-input class="input-form" type="text" id="consumerMemo" maxlength=100 v-model="localConsumer.consumerMemo"></b-input></div>
            </div>
            <div class="form-button">
                <b-button type="submit" variant="primary" >変更</b-button>
                
                <b-button variant="danger" @click="handleCancel()" v-if="!showConfirmEdit">キャンセル</b-button>
            </div>
        </b-form>
        <WA01010311 v-if="showConfirmEdit" :showConfirmEdit="showConfirmEdit" @changeModalConfirm="showConfirmEdit = $event" :localConsumer="localConsumer" :backHome="handleCancel"></WA01010311>
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
import { Consumer } from '../../models'
import moment from 'moment';

export default {
    data() {
        return {
            showConfirmEdit: false,
            submited: false,
            localConsumer: new Consumer
        }
    },
    components: {
        WA01010311,
    },
    computed: {
        ...mapState({
            consumers: (state) => state.consumers.single.item,
            alert: state => state.alert
        })
    },
    created() {
        this.getConsumerById(this.$route.params.consumerId).then(() => {
            this.localConsumer = this.consumers
            // this.localConsumer = {
            //     ...this.consumers, 
            //     birthdate: moment(this.consumers.birthdate).format('yyyy/MM/DD')
            //     }
        })
    },
    methods: {
        ...mapActions("alert", {
            error: "error",
        }),
        ...mapActions("consumers", {
            getConsumerById: "getConsumerByID",
            //   deleteItem: "deleteItem"
        }),
        handleShowEdit() {
            // validate
            const errorCode = validate.validateInput(userValidatePattern, this.localConsumer);
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
        handleCancel() {
            this.error(''); // reset error message
            this.$emit("changeEdit", false)
        },
        formatConsumerData(arrInput) {
            return arrInput.map((e) => {
                return {
                    ...e,
                    birthdate: moment(e.birthdate).format('yyyy/MM/DD')
                    }
                })
        },
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