<template>
    <div style="margin:3rem; height: 100%">
        <p style="font-size: 24px; text-align: center; margin-bottom: 0">ログイン</p>
        <hr style="height: 1px; background-color:#979797; margin-top:0">
        <form @submit.prevent="handleSubmit" >
            <div class="form-group div-form-input">
                <label for="username">メールアドレス</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <!-- <div v-show="submitted && !username" class="invalid-feedback">Username is required</div> -->
            </div>
            <div class="form-group div-form-input">
                <label htmlFor="password">パスワード</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <!-- <div v-show="submitted && !password" class="invalid-feedback">Password is required</div> -->
            </div>
            <div class="form-group div-form-button">
                <button class="btn btn-primary" style="width: 60%" :disabled="status.loggingIn">Sign In</button>
                <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false,
            msg: ''
        }
    },
    computed: {
        ...mapState('account', ['status']),
        ...mapState({
            account: state => state.account,
        })
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit (e) {
            
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                this.login({ username, password })
            } else {
                this.account.err = 'メールアドレス、もしくはパスワードが間違'
                return
            }
        }
    }
};
</script>

<style>
    .div-form-input {
        margin-top: 2rem;
    }
    .div-form-button {
        margin-top: 4rem;
        text-align: center;
    }

    .error-message {
        color: #E02020;
    }
</style>