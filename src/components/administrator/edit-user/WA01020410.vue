<template>
    <div class="main-content">
        <b-form @submit.stop.prevent="handleShowEdit()" class="form-info">
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">氏名 :</label></div>
                <div><b-input class="input-form" type="text" id="name" maxlength=38 v-model="user.fullname" autofocus></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="namekana">カナ :</label></div>
                <div><b-input class="input-form" type="text" id="namekana" maxlength=38 v-model="user.namekana"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="email">メールアドレス :</label></div>
                <div><b-input class="input-form" type="text" id="email" maxlength=190 v-model="user.mailaddress"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">所属 :</label></div>
                <div><b-input class="input-form" type="text" id="name" maxlength=38 v-model="user.branch"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">パスワード :</label></div>
                <div><b-input class="input-form" type="password" id="name" maxlength=38 v-model="user.password"></b-input></div>
            </div>
            <div class="form-button">
                <b-button class="div-comfirm-change" type="submit" variant="primary">変更</b-button>
                
                <b-button class="div-cancel-change" variant="danger" @click="handleCancle()">キャンセル</b-button>
            </div>
        </b-form>
        <WA01020411 v-if="showConfirmEdit" :showConfirmEdit="showConfirmEdit" @changeModalConfirm="showConfirmEdit = $event"></WA01020411>
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
import WA01020411 from './WA01020411.vue';

import validate from '../../../validate/validate'
import userValidatePattern from '../../../validate/employee/employee-validate'
import errormessage from '../../../validate/errormessage';

export default {
    data() {
        return {
            showConfirmEdit: false,
            submited: false,
            user:{
                fullname: 'Khang',
                namekana: 'KHANG',
                mailaddress: 'manhkhang@vn-cubesystem.com',
                branch: '1',
                password: '123456'
            },
        }
    },
    components: {
        WA01020411,
    },
    computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions("alert", {
            error: "error",
        }),
        handleShowEdit() {
            // validate
            console.log( this.user)
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
.div-comfirm-change {
    margin: 170px 0px 0px 30px;
}

.div-cancel-change {
    margin: 170px 0px 0px 60.5px;
}
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
    font-family: 'HiraginoSan-W3';
}

.main-content .form-button {
    text-align: center;
    padding-top: 1.5rem;
}

.main-content .form-button button{
    width: 172px;
    height: 44px;
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