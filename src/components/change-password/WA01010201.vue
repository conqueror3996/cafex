<template>
    <div class="box-login">
        <p style="font-size: 24px; text-align: center; margin-bottom: 0">パスワード変更</p>
        <hr style="height: 1px; background-color:#979797; margin-top:0">
        <form @submit.prevent="handleSubmit" style="margin-top: 3rem;">
            <div class="div-change-password">
                <img :src="imgChangePassword">
            </div>
            <div class="div-change-password">
                <p style="font-size: 18px; margin-top: 20px;">パスワードの再登録が完了しました</p>
            </div>
            <div class="form-group div-form-button">
                <a @click="logout()" style="color: #0091FF">ログイン画面に戻る</a>
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

export default {
    data () {
        return {
            imgChangePassword: './static/img/change-password.svg',
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
            employees: state => state.employees,
            consumers: state => state.consumers.all
        }),
        ...mapActions("employees", {
            logout: "logout",
        }),
    },
    created () {
        
    },
    methods: {
        
    }
};
</script>

<style>
    .div-form-input {
        margin-top: 0.5rem;
    }
    .div-form-button {
        margin-top: 10rem;
        text-align: center;
    }
    .div-change-password {
        display: flex;
        justify-content: center;
    }
</style>