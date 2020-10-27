<template>
    <div class="div-registration-content">
        <div>
            <p>ファイルをアップロード</p>
        </div>
        <div class="alert alert-primary div-custom-alert" role="alert">
            <p>・CSVデータから従業員データを登録できます。</p>
            <p>・一度にアップロードできる従業員データの上限は1,000件です。</p>
        </div>
        <div class="div-button-confirm">
            <b-button class="button-custom" variant="primary" @click="ok()">ファイル選択</b-button>
            <b-button style="margin-top: 50px;" class="button-custom" variant="primary" @click="ok()">登録</b-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import validate from '../../../validate/validate.js'
import userValidatePattern from '../../../validate/user/user-validate'
import errormessage from '../../../validate/errormessage';
export default {
    data() {
        return {
            showModal: false,
            user: {}
        }
    },
    components: {
        
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
        handleShow() {
            // validate
            const errorCode = validate.validateInput(userValidatePattern, this.user);
            
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
            this.showModal = true;
        },
    }
}
</script>

<style scoped>
.div-registration-content {
    flex-direction: column;
    margin: 80px;
    padding-top: 34px;
}

.div-registration-content p {
    font-size: 24px;
}

.div-custom-alert {
    margin-bottom: 150px;

}

.div-button-confirm {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 20%;
    margin: auto;
}

.button-custom {
    width: 250px;
    height: 60px;
    font-size: 24px;
    border-radius: 10px;
}

.inner .alert {
    margin-top: 1rem;
    white-space: pre-line;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: .5rem;
}
/* .main-content {
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
}; */

</style>