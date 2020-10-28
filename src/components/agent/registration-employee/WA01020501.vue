<template>
    <div class="box-login">
        <p style="font-size: 24px; text-align: center; margin-bottom: 0">従業員登録</p>
        <hr style="height: 1px; background-color:#979797; margin-top:0">
        <form @submit.prevent="handlesubmit" style="margin-top: 3rem;">
            <div class="div-change-password">
                <img :src="imgchangepassword">
            </div>
            <div class="div-change-password">
                <p style="font-size: 18px; margin-top: 20px;">従業員の登録が完了しました</p>
            </div>
            <div class="form-group div-form-button">
                <a href="#" style="color: #0091ff">従業員一覧画面に戻る</a>
                <img v-show="status.loggingin" src="data:image/gif;base64,r0lgodlheaaqapiaap///waaamlcwkjcqgaaagjiyokcgpkskih/c05fvfndqvbfmi4waweaaaah/hpdcmvhdgvkihdpdgggywphegxvywquaw5mbwah+qqjcgaaacwaaaaaeaaqaaadmwi63p4wyklre2mioggznadomgyjrbexwroumcg2lmdewnhqlvsyod2mbzkydadka+diaaah+qqjcgaaacwaaaaaeaaqaaadnai63p5ojcegg4qmu7dmikrxqlfuydezigbmrvsaqhwctxxf7weyb4ag1xjihkmzsiukkhiaifkecqoaaaasaaaaabaaeaaaazyiujijk8pbyjdmlfyvbovjha70gu7xsujhmktwhpakzlo9hmaokwjz7rf8aypddzkpzbqfvwqaifkecqoaaaasaaaaabaaeaaaazmiumilk8oyhphsnfzfhyumcyuhdaqxridhhbgqrokw0r8dyljd8z0fmdgsgo/iphi5taaaifkecqoaaaasaaaaabaaeaaaaziiunink0rnzbtwgpnmgqwmdsngxgjuliweur5owuipz8paeame6twfwyysgo/ipfksaaah+qqjcgaaacwaaaaaeaaqaaadmwi6imkqorfjdoe82p4wgccc4ceuqradylesojembgsuc2g7sdx3lqgbmlajibufbslkaaah+qqjcgaaacwaaaaaeaaqaaadmgi63p7wcrhznfvdmghu2nfwlwci3wgc3tswhufgxtaukgcbtgenbmjaejsxgmlwzpeaach5bakkaaaalaaaaaaqabaaaamyclrc/jdksatlqtsckdcecajdii7hcq4emtcpyrcuubjcyrghvtqlaib1yhicnlsrkaaaowaaaaaaaaaaaa==" />
                <!-- <router-link to="/register" class="btn btn-link">register</router-link> -->
            </div>
            <div class="div-error-message">
                <p style="">{{ msg }}</p>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data () {
        return {
            imgchangepassword: './static/img/change-password.png',
            currentpassword: '',
            newpassword: '',
            confirmpassword: '',
            msg: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('employees', ['status']),
        ...mapState({
            employees: state => state.employees,
            consumers: state => state.consumers.all
        })
    },
    created () {
        // reset login status
        // this.logout();
    },
    methods: {
        // ...mapactions('account', ['login', 'logout']),
        // handlesubmit (e) {
        //     this.msg = ''
        //     this.submitted = true;
        //     const { username, password } = this;
        //     if (username && password) {
        //         this.login({ username, password })
        //     }
        //     if(this.currentpassword != this.account.user.username) {
        //         this.msg = '現在のパスワードが間違っています'
        //         return
        //     }
        //     if (this.newpassword.length < 8) {
        //         this.msg = 'パスワードは半角8文字以上で入力してください'
        //         return
        //     }
        //     if (this.newpassword != this.confirmpassword) {
        //         this.msg = '新しいパスワードが一致していません'
        //         return
        //     }
        // }
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