<template>
    <div class="main-content">
        <b-form @submit.stop.prevent="handleShowEdit()" class="form-info">
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">氏名 :</label></div>
                <div><b-input class="input-form" type="text" id="name" maxlength=38 v-model="localEmployee.employeeName" autofocus></b-input></div>
            </div>
            <!-- <div class="input-row">
                <div class="label-form"><label for="namekana">カナ :</label></div>
                <div><b-input class="input-form" type="text" id="namekana" maxlength=38 v-model="user.namekana"></b-input></div>
            </div> -->
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="email">メールアドレス :</label></div>
                <div><b-input class="input-form" type="text" id="email" maxlength=190 v-model="localEmployee.mailAddress"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><div class="field-request"><span>必須</span></div><label for="name">所属 :</label></div>
                <div>
                    <!-- <b-input class="input-form" type="text" id="name" maxlength=38 v-model="localEmployee.branchNumber"></b-input> -->
                    <select class="custom-select  input-form" v-model="localEmployee.branchNumber">
                        <option v-for="(branch, BranchNumber) in branches" :key="BranchNumber" :value="branch.BranchNumber">
                            {{ branch.BranchName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="name">再設定パスワード :</label></div>
                <div><b-input class="input-form" type="password" id="name" maxlength=20 v-model="localEmployee.resetPassword"></b-input></div>
            </div>
            <div class="input-row">
                <div class="label-form"><label for="name">確認用パスワード :</label></div>
                <div><b-input class="input-form" type="password" id="name" maxlength=20 v-model="localEmployee.confirmPassword"></b-input></div>
            </div>
            <div class="form-button">
                <b-button class="div-comfirm-change" type="submit" variant="primary">変更</b-button>
                
                <b-button class="div-cancel-change" variant="danger" @click="handleCancel()">キャンセル</b-button>
            </div>
        </b-form>
        <WA01020411 v-if="showConfirmEdit" :showConfirmEdit="showConfirmEdit" @changeModalConfirm="showConfirmEdit = $event" :localEmployee="localEmployee" :backHome="handleCancel"></WA01020411>
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
import { sharedService } from '../../../_services'

export default {
    data() {
        return {
            showConfirmEdit: false,
            submited: false,
            // user:{
            //     fullname: 'Khang',
            //     namekana: 'KHANG',
            //     mailaddress: 'manhkhang@vn-cubesystem.com',
            //     branch: '1',
            //     password: '123456'
            // },
            localEmployee: {},
            resetPassword: '',
            confirmPassword: '',
            branches: [],
            msg: ''
        }
    },
    components: {
        WA01020411,
    },
    computed: {
        ...mapState({
            alert: state => state.alert,
            employees: (state) => state.employees,
        })
    },
    created() {
        this.getEmployeeByID(this.$route.params.employeeId).then(() => {
            this.localEmployee = this.employees.employee
            this.$set(this.localEmployee, 'resetPassword', this.resetPassword)
            this.$set(this.localEmployee, 'confirmPassword', this.confirmPassword)
            
        })
        sharedService.getBranches().then((res) => {
            this.branches = res.data.branch
        })

    },
    methods: {
        ...mapActions("alert", {
            error: "error",
            clear: "clear",
            errorMsg: "errorMsg",
        }),
        ...mapActions("employees", {
            getEmployeeByID: "getEmployeeByID",
        }),
        handleShowEdit() {
            // validate
            const errorCode = validate.validateInput(userValidatePattern, this.localEmployee);
            if(errorCode.length > 0) {
                const messageError = validate.getArrayMessageError(errorCode);
                // this.alert.message = messageError.join("\n")
                this.errorMsg(messageError.join("\n"))
                return;
            }

            if (this.localEmployee.resetPassword.trim() !== this.localEmployee.confirmPassword.trim()) {
                this.msg += validate.getMessageErrorFromCode("S02016") + "\n";
                //return
            }
            // this.msg = this.msg.trim();
            if(this.msg !== '') {
                // this.error(this.msg);
                this.errorMsg(this.msg.trim())
                this.msg = ''
                return;
            }
            // reset slert message
            if(this.msg == '') {
                this.clear()
            }

            // show modal confirm
            this.showConfirmEdit = true;
        },
        handleCancel() {
            this.clear(); // reset error message
            this.$emit("changeEdit", false)
        },
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
    width: 13rem;
    text-align: right;
    padding-right: 2rem;
    font-size: 16px;
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