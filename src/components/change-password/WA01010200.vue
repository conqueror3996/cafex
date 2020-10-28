<template>
    <div  class="change-password">
        <p style="font-size: 24px; text-align: center; margin-bottom: 0">パスワード変更</p>
        <hr style="height: 1px; background-color:#979797; margin-top:0">
        <form @submit.prevent="handleSubmit" >
            <div>
                <p style="font-size: 16px">現在のパスワードと新しく使用するパスワードを入力してください
                </p>
            </div>
            <div class="form-group div-form-input">
                <label for="currentpassword">現在のパスワード</label>
                <input type="password" v-model="currentPassword" name="currentpassword" class="form-control" :class="{ 'is-invalid': submitted && !currentPassword }" maxlength="20" autofocus />
                <div v-show="submitted && !currentPassword" class="invalid-feedback">Current password is required</div>
            </div>
            <div class="form-group div-form-input">
                <label htmlFor="newpassword">新しいパスワード</label>
                <input type="password" v-model="newPassword" name="newpassword" class="form-control" :class="{ 'is-invalid': submitted && !newPassword }" maxlength="20" />
                <div v-show="submitted && !newPassword" class="invalid-feedback">Password is required</div>
            </div>
                
            <div class="form-group div-form-input">
                <label for="retype">もう一度入力</label>
                <input type="password" v-model="confirmPassword" name="retype" class="form-control" :class="{ 'is-invalid': submitted && !confirmPassword }" maxlength="20" />
                <div v-show="submitted && !confirmPassword" class="invalid-feedback">Retype password is required</div>
            </div>
            <div class="form-group div-form-button">
                <button class="btn btn-primary" :disabled="status.loggingIn">パスワードを登録</button>
                <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
            </div>
            <div class="form-group div-form-button">
                <button class="btn btn-danger" :disabled="status.loggingIn">キャンセル</button>
                <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
            </div>
            <!-- <div class="div-error-message">
                <p style="">{{ msg }}</p>
            </div> -->
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { router } from '../../_helpers';
import validate from '../../validate/validate.js';
import common from '../../validate/common.js';

export default {
    data () {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            msg: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('employees', ['status']),
        ...mapState({
            employee: state => state.employee,
            users: state => state.users.all,
            // changePasswordState: (state) => state.changePasswordState
        })
    },
    created () {
        // this.changePasswordState = true
    },
    methods: {
        ...mapActions('employees', ['changePassword']),
        ...mapActions("alert", { error: "error" }),
        handleSubmit (e) {
            this.msg = ''
            const data = {
                employee_current_password: this.currentPassword,
                employee_new_password: this.newPassword,
                employee_confirm_password: this.confirmPassword
            }

            if(!this.currentPassword || !this.newPassword || !this.confirmPassword)
                return;
            
            if (!common.isPassword(this.newPassword)) {
                this.msg += validate.getMessageErrorFromCode("S02001") + "\n"; 
                console.log(this.msg)
                //return
            }
            if (this.newPassword != this.confirmPassword) {
                this.msg += validate.getMessageErrorFromCode("S02002") + "\n";
                //return
            }
            this.msg = this.msg.trimEnd('\n');
            if(this.msg !== '') {
                this.error(this.msg);
                return;
            }
            else{
                this.error('');
            }
            this.changePassword(data)
        }
    }
};
</script>

<style>

/*login*/
.change-password{width:484px;margin:20px auto 0px auto;background:#fff;border-radius:10px;padding:3rem;box-sizing:border-box;}
.change-password > p.title{text-align:center;font-size:24px;border-bottom:2px solid rgb(151, 151, 151);margin-bottom:35px;}
.change-password .div-form-button button {
    width: 60%;
    border-radius: .5rem;
    padding: .5rem 1.5rem;
}
.change-password .div-form-input {
    margin-top: 0.5rem;
}
.change-password .div-form-button {
    margin-top: 1.5rem;
    text-align: center;
}
.change-password .div-error-message {
    display: flex;
    justify-content: center;
    color: #E02020; 
    font-size: 16px;
}
</style>