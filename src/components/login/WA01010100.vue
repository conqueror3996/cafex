<template>
<div class="box-login">
        <p class="title">ログイン</p>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label>メールアドレス</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" maxlength="190" autofocus>
            </div>
            <div class="form-group">
                <label>パスワード</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" maxlength="20">
            </div>
            <div class="form-group">
                <button type="submit" :disabled="status.loggingIn" class="btn btn-primary btn-login">Sign in</button>
                <img v-show="status.loggingIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { connectAPI } from '../../_helpers';
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
        ...mapState('employees', ['status']),
        ...mapState({
            employees: state => state.employee,
        })
    },
    created () {
        // reset login status
        // this.logout();
        
    },
    methods: {
        ...mapActions('employees', ['login', 'logout']),
        async handleSubmit (e) {
            
            this.submitted = true;
            const { username, password } = this;
            if (username && password) {
                await this.login({ username, password })
            } else {
                //this.employee.err = 'メールアドレス、もしくはパスワードが間違'
                return
            }
        }
    }
};
</script>

<style scoped>
/*login*/
.box-login{width:484px;margin:20px auto 0px auto;background:#fff;border-radius:10px;padding:3rem;box-sizing:border-box;}
.box-login > p.title{text-align:center;font-size:24px;border-bottom:2px solid rgb(151, 151, 151);margin-bottom:35px;}
.btn-login{width:60%;margin:75px auto 0px auto;display:block;}

@media(max-width:1440px){
    .box-login{height:420px;}
    .btn-login{margin-top:45px;}
}
</style>