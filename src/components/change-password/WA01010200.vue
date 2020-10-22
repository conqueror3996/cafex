<template>
    <div style="margin:3rem; height: 100%">
        <p style="font-size: 24px; text-align: center; margin-bottom: 0">パスワード変更</p>
        <hr style="height: 1px; background-color:#979797; margin-top:0">
        <form @submit.prevent="handleSubmit" >
            <div>
                <p style="font-size: 16px">現在のパスワードと使用するパスワードを入力してください</p>
            </div>
            <div class="form-group div-form-input">
                <label for="currentpassword">現在のパスワード</label>
                <input type="password" v-model="currentPassword" name="currentpassword" class="form-control" :class="{ 'is-invalid': submitted && !currentPassword }" />
                <div v-show="submitted && !currentPassword" class="invalid-feedback">Current password is required</div>
            </div>
            <div class="form-group div-form-input">
                <label htmlFor="newpassword">新しいパスワード</label>
                <input type="password" v-model="newPassword" name="newpassword" class="form-control" :class="{ 'is-invalid': submitted && !newPassword }" />
                <div v-show="submitted && !newPassword" class="invalid-feedback">Password is required</div>
            </div>
                
            <div class="form-group div-form-input">
                <label for="retype">もう一度入力</label>
                <input type="password" v-model="confirmPassword" name="retype" class="form-control" :class="{ 'is-invalid': submitted && !confirmPassword }" />
                <div v-show="submitted && !confirmPassword" class="invalid-feedback">Retype password is required</div>
            </div>
            <div class="form-group div-form-button">
                <button class="btn btn-primary" style="width: 50%" :disabled="status.loggingIn">パスワードを登録</button>
                <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
            </div>
            <div class="div-error-message">
                <p style="">{{ msg }}</p>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { router } from '../../_helpers';

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
        ...mapState('account', ['status']),
        ...mapState({
            account: state => state.account,
            users: state => state.users.all,
            // changePasswordState: (state) => state.changePasswordState
        })
    },
    created () {
        // this.changePasswordState = true
    },
    methods: {
        ...mapActions('account', ['changePassword']),
        handleSubmit (e) {
            this.msg = ''
            console.log(this.account)
            const data = {
                user_id: this.account.id,
                user_password: this.newPassword
            }
            if(this.currentPassword != this.account.user.username) {
                this.msg = '現在のパスワードが間違っています'
                return
            }
            if (this.newPassword.length < 8) {
                this.msg = 'パスワードは半角8文字以上で入力してください'
                return
            }
            if (this.newPassword != this.confirmPassword) {
                this.msg = '新しいパスワードが一致していません'
                return
            }
            this.changePassword(data)
        }
    }
};
</script>

<style>
    .div-form-input {
        margin-top: 0.5rem;
    }
    .div-form-button {
        margin-top: 2.5rem;
        text-align: center;
    }
    .div-error-message {
        display: flex;
        justify-content: center;
        color: #E02020; 
        font-size: 16px;
    }
</style>