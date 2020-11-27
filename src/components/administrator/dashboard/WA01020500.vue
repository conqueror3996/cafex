<template>
    <div class="div-registration-content">
        <div>
            <p>ファイルをアップロード</p>
        </div>
        <div class="alert alert-primary div-custom-alert" role="alert">
            <p class="p-csv">・CSVデータから営業員データを登録できます。</p>
            <p>・一度にアップロードできるファイルの上限は100MBです。</p>
        </div>
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="div-button-confirm">
                <div class="button-confirm">
                    <label variant="primary" class="btn btn-primary btn-upload" for="file">
                        <p>ファイル選択</p>
                    </label>
                    <input type="file" name="file" value="ファイル選択" id="file" @change="uploadFile" accept=".csv"/>
                <b-button type="submit" style="margin-top: 30px;" class="button-custom" variant="primary" :disabled="fileName === ''">登録</b-button>
                </div>
                <div class="info-file" v-if="fileName !== ''">
                    <label>{{fileName}}</label>
                </div>
            </div>
        </form>
        
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import validate from '../../../validate/validate.js'
import userValidatePattern from '../../../validate/consumer/consumer-validate'
import errormessage from '../../../validate/errormessage';
export default {
    data() {
        return {
            showModal: false,
            files: {},
            fileName: '',
        }
    },
    computed: {
        ...mapState({
            employees: state => state.employees
        }),
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions("alert", {
            errorMsg: "errorMsg",
            error: "error",
            clear: "clear"
        }),
        ...mapActions("employees", {
            registerEmployeesCsv: "registerEmployees"
        }),
        handleShow() {
            // validate
            const errorCode = validate.validateInput(userValidatePattern, this.user);
            
            if(errorCode.length > 0) {
                const messageError = validate.getArrayMessageError(errorCode);
                this.errorMsg(messageError.join("\n"));
                return;
            }

            // reset slert message
            if(this.alert.message !== '') {
                this.clear();
            }

            // show modal confirm
            this.showModal = true;
        },
        uploadFile(event) {
            this.files = event.target.files;
            const memoryImg = 104857600;
            let errorMessage = '';
            for (var i = 0; i < this.files.length; i++)
            {
                const filename = this.files[i].name;
                const filetype = filename.substring(filename.length - 3, filename.length);
                if(filetype !== 'csv') {
                    errorMessage = validate.getMessageErrorFromCode("S02013")
                    this.fileName = '';
                    break;
                } else {
                    this.fileName = filename;
                }
                if(files[i].size > memoryImg) {
                    errorMessage = validate.getMessageErrorFromCode("S02011");
                    break;
                }
            }

            if (errorMessage !== '') {
                this.errorMsg(errorMessage)
            } else {
                this.clear()
                this.fileName = `${this.fileName}    を選択`;
            }
        },

        handleSubmit (e) {
            this.registerEmployeesCsv(this.files[0]).then((res) => {
                this.$router.push('/WA01020501')
            })
            // this.submitted = true;
            // const { username, password } = this;
            // if (username && password) {
            //     await this.login({ username, password })
            // } else {
            //     //this.employee.err = 'メールアドレス、もしくはパスワードが間違'
            //     return
            // }

            // this.registerEmployeesCsv(file)
        }
    }
}
</script>

<style scoped>

.p-csv {
    padding-top: 1rem;
}

.div-registration-content {
    flex-direction: column;
    margin: 0 70px 80px 70px;
    padding-top: 34px;
}

.div-registration-content p {
    font-size: 24px;
    font-family: 'HiraginoSan-W3';
}

.div-custom-alert {
    margin-bottom: 150px;
}

.div-registration-content .div-button-confirm {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.div-registration-content .div-button-confirm .button-confirm{
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
}

.div-registration-content .div-button-confirm div label p {
    font-family: 'HiraginoSan-W3';
}

.div-registration-content .div-button-confirm .info-file {
    padding: .75rem 0 0 3rem;
    width: auto;
    margin-left: 450px;
}

.div-registration-content .button-custom {
    width: 250px;
    height: 60px;
    font-size: 24px;
    border-radius: 10px;
}

.div-registration-content .div-button-confirm button {
  width: 172px;
  height: 44px;
  font-size: 20px;
  margin: 0 auto;
  font-family: 'HiraginoSan-W3';
}

.div-registration-content .btn-upload {
  border-radius: 0.5rem;
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  width: 172px;
  height: 44px;
  text-align: center;
}

.div-registration-content .btn-upload p{
  font-size: 20px;
  padding-top: .5rem;
}

.div-registration-content .img-btn {
  float: right;
  margin-right: 0.5rem;
}

.div-registration-content input[type="file"] {
	display: none;
}
@media (max-width: 1366px) {
    .div-custom-alert {
        margin-bottom: 60px;
    }
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