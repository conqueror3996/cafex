<template>
    <div class="main-content">
        <b-form @submit.stop.prevent class="form-info">
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">氏名 :</label></div>
                <div><b-input class="input-form" type="text" id="name" maxlength=38 v-model="consumer.consumerName" placeholder="山田太郎" autofocus></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="namekana">カナ :</label></div>
                <div><b-input class="input-form" type="text" id="namekana" maxlength=38 v-model="consumer.consumerNameKana" placeholder="ヤマダタロウ"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="birthday">生年月日 :</label></div>
                <div>
                    <b-input class="input-form" type="date" id="birthday" maxlength=10 v-model="consumer.birthdate" placeholder="YYYY/MM/DD"></b-input>
                    <!-- <b-form-datepicker class="input-form" id="birthday" v-model="consumer.birthdate"  placeholder="YYYY/MM/DD"></b-form-datepicker> -->
                </div>
            </div>
            
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="phone1">電話番号1 :</label></div>
                <div><b-input class="input-form" type="text" id="phone1" maxlength=11  v-model="consumer.phoneNumber1" placeholder="000xxxxxxxx"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="phone2">電話番号2 :</label></div>
                <div><b-input class="input-form" type="text" id="phone2" maxlength=11  v-model="consumer.phoneNumber2" placeholder="000xxxxxxxx"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="email">メールアドレス :</label></div>
                <div><b-input class="input-form" type="text" id="email" maxlength=190 v-model="consumer.mailAddress" placeholder="example@mail.com"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="postal">郵便番号 :</label></div>
                <div><b-input class="input-form" type="text" id="postal" maxlength=7 v-model="consumer.postalCode" placeholder="0000000"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="address">住所 : </label></div>
                <div><b-input class="input-form" type="text" id="address" maxlength=100 v-model="consumer.address" placeholder="東京都〇〇区〇〇町１−８−２パーク〇〇〇　XXX号"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="memo">メモ :</label></div>
                <div><b-input class="input-form" type="text" id="memo" maxlength=100 v-model="consumer.consumerMemo" placeholder="コメントコメントコメントコメントコメント"></b-input></div>
            </div>
            <div class="form-button">
                <b-button variant="primary" @click="handleShow()" :disabled="showModal">確認</b-button>
            </div>
            <WA01010321 
                v-if="showModal" 
                :showModal="showModal" 
                :data="consumer"
                @changeShowModal="showModal = $event"
                :backHome="handleBackHome">
            </WA01010321>
        </b-form>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WA01010321 from './WA01010321.vue'
import validate from '../../validate/validate.js'
import consumerValidatePattern from '../../validate/consumer/consumer-validate'
import errormessage from '../../validate/errormessage';
import { Consumer } from '../../models'

export default {
    data() {
        return {
            showModal: false,
            consumer: {}
        }
    },
    components: {
        WA01010321,
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions("alert", {
            errorMsg: "errorMsg",
            error: "error",
            clear: "clear",
        }),
        
        handleShow() {
            // validate
            const errorCode = validate.validateInput(consumerValidatePattern, this.consumer);
            
            if(errorCode.length > 0) {
                const messageError = validate.getArrayMessageError(errorCode);
                this.errorMsg(messageError.join("\n"));
                return;
            }

            // reset slert message
            if(this.alert.message !== '') {
                this.clear();
            }
            // this.confirmConsumer(this.consumer)
            // show modal confirm
            this.showModal = true;
        },
        handleBackHome() {
          this.$emit("changeSelectedTab", 'selection');
        }
    }
}
</script>

<style scoped>
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


@media (max-width: 1366px) {
    .main-content .form-info {
        margin-top: 1rem;
        font-size: 15px !important;
    }
    .main-content .label-form {
        width: 12rem;
        text-align: right;
        padding-right: 2rem;
        font-size: 16px;
    }
    .main-content .form-button {
        padding-top: .5rem;
    }
    .main-content .input-row {
        margin: .5rem 0;
    }
    .main-content .form-button button{
        width: 152px;
        height: 34px;
    }
};

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