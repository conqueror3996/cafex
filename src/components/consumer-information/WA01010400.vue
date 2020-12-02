<template>
  <div class="screen-medium">
  <div class="customer-info-screen">
        <div class="title-information">
           <p >お客様情報</p>
           <b-button @click="$router.push('/WA01010300')">
             <img :src="imgBackIcon" />
           </b-button>
        </div>
        <div class="content-information">
            <div class="information">
                <p style="margin: 0;">氏名：<span v-if="this.localConsumer.item">{{ this.localConsumer.item.consumerName }}</span></p> 
                <p style="margin: 0;">氏名（カナ）: <span v-if="this.localConsumer.item">{{ this.localConsumer.item.consumerNameKana }}</span> </p> 
                <span for="contractor">お客様情報</span> 
                <ul id="v-for-object" class="contractor-info">
                  <li v-for="(value, name) in this.localConsumer.item" :key="name" style="margin-top: 0.5rem;">
                    <span v-if="Object.keys(labels).includes(name)" > 
                      {{ labels[name] }} : {{ value }} 
                    </span>
                  </li>
                </ul>
                <!-- <label class="label-contractor" for="age">年齢：{{ customer_detail.age }}</label> 
                <label class="label-contractor" for="birthday">生年月日：{{ customer_detail.birthday }}</label> 
                <label class="label-contractor" for="postalcode">郵便番号：{{ customer_detail.post_code }}</label> 
                <label class="label-contractor" for="address">住所：{{ customer_detail.address }}</label> 
                <label class="label-contractor" for="phone1">電話番号１：{{ customer_detail.phone1 }}</label> 
                <label class="label-contractor" for="phone2">電話番号２：{{ customer_detail.phone2 }}</label>  
                href="/WA01010500"
                -->
            </div>
            <div class="form-group"> 
                <b-button variant="link" class="button-file" @click="$router.push('/WA01010500')"><img :src="imgButtonFile"></b-button>
                <b-button variant="link" class="button-remote" @click="goContact()"><img :src="imgButtonRemote"></b-button>
            </div>
        </div>
    
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Consumer } from '../../models';
import moment from 'moment';

export default {
  data() {
    return {
        imgButtonFile: './static/img/btn_start_file_manage.svg',
        imgButtonRemote: './static/img/button_remote.svg',
        imgBackIcon: './static/img/btn_back_consumer_select.svg',
        // customer_detail: {
        //   fullname: 'Khang',
        //   name_kana: 'Khang',
        //   age: '24',
        //   birthday: '1996/03/09',
        //   post_code: '3424',
        //   address: '32/2',
        //   phone1: '0914957644',
        //   phone2: '19001560',
        //   memo: 'manhkhang@vn-cubesystem.com'
        // },
        // requestJson: {
        //     user_id: 1
        // },
        labels: {
          age: '年齢',
          birthdate: '生年月日',
          postalCode: '郵便番号',
          address: '住所',
          mailAddress: 'メールアドレス',
          consumerMemo: 'メモ',
          phoneNumber1: '電話番号１',
          phoneNumber2: '電話番号２',
        },
        localConsumerId: '',
        localConsumer: {}
    };
  },
  computed: {
    ...mapState({
      employees: (state) => state.employees,
      consumers: (state) => state.consumers.single,
      detail: (state) => state.consumers.single
    }),
  },
  created() {
    this.getUserInfo()
    this.initInfo()
    this.getConsumerByID(this.localConsumerId).then(() => {
      this.localConsumer = this.consumers
      this.localConsumer.item.birthdate = moment(this.localConsumer.item.birthdate).format('yyyy/MM/DD')
    })
  },
  methods: {
      ...mapActions("consumers", {
          getConsumerByID: "getConsumerByID",
          goTo: "goToFileManagement",
          // setUserDetail: "setUserDetail",
      }),
      ...mapActions("employees", {
          getUserInfo: "userInfo"
      }),
      goContact(){
        let routeData = this.$router.resolve({name: 'WA01010600'});
        window.open(routeData.href, '_blank');
        // this.$router.push('/');
      },
      initInfo () {
        this.localConsumerId = localStorage.getItem('consumerId')
      },
      goManageFile() {
        this.goTo(this.localConsumer.item)
      }
      // goToFileManagement() {
      //   this.detail = this.customer_detail
      // }
    // ...mapActions("users", {
    //   getAllUsers: "getAll",
    //   deleteUser: "delete",
    // //   editItem: "editItem",
    // //   deleteItem: "deleteItem"
    // }),
    // editItem(user_id) {
    //   if(user_id !== this.selectedItem) {
    //       return
    //   }
    //   console.log('success')
  },

//   deleteItem(user_id) {
//       if(user_id !== this.selectedItem) {
//           return
//       }
//       console.log('success')
//   },
//   onRowSelected(items) {
//         this.selectedItem = items[0].user_id
//       },
//   selectedRow(item) {
//         this.$refs.selectableTable.selectRow(this.users.items.indexOf(item))
//       },
//   },
  
};
</script>

<style>
.customer-info-screen {
  background-color: #ffffff;
  width: 100%;
  height: auto;
  padding: 1.5rem 3rem 0 3rem;
  margin: auto;
}
.title-information {
  width: 100%;
  display: inline-block;
}

.title-information p{
    width: 100px;
    height: 28px;
    color: #313131;
    font-size: 24px;
    font-weight: 400;
    /* line-height: 32px;
    margin: 25px 0px 0px 123px; */
    text-align: left;
    float: left;
    clear: right;
}

.title-information button {
  float: right;
  padding: 0;
  border-radius: .7rem;
  border: none;
}

.title-information button img {
  float: right;
}

/* .title-information button:hover {
    color: #fff;
    background-color: #02ad9c;
    border-color: #9ed9d3;
}

.title-information button.focus, .title-information button:focus {
    box-shadow: 0 0 0 0.2rem rgba(158, 217, 211,.5);
}

.title-information button:not(:disabled):not(.disabled).active, .title-information button:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #02ad9c;
    border-color: #9ed9d3;
} */
/* .div-login {
    display: flex;
    justify-content: center;
    flex-direction: row;
    background-color: transparent;
    width: auto !important;
    height: 100vh !important;
    border-radius: 0px !important;
} */

.content-information {
    /* width: 1102px; */
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 0px auto;
}

.contractor-info {
    list-style: none;
}
.information {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: solid 3px #979797;
  background: #ffffff;
  padding: 1rem 2rem;
}

.information label {
  font-size: 16px;
}

.customer-info-screen .form-group {
  width: 100%;
  text-align: center;
  display: inline-block;
  margin-bottom: 4rem;
}

.customer-info-screen .form-group button{
  margin: 40px 4rem 0 4rem;
  width: 331px;
  height: 85px;
  padding: 0px;
}

.customer-info-screen .form-group button img{
    width: 100%;
}

@media (max-width: 1366px) {
  .customer-info-screen {
    height: calc(80vh - 15px);
  }
  .information {
    height: 50vh;
    font-size: 14px;
  }
  .customer-info-screen .form-group button {
    margin-top: 20px;
    width: 298px;
    height: 77px;
  }
}

@media (max-width: 1024px) {
  .customer-info-screen {
    height: calc(80vh);
  }
  .information {
    height: 50vh;
    font-size: 13px;
  }
  .customer-info-screen .form-group button {
    margin: 20px 2rem 0 2rem;
  }
}

@media (max-width: 1000px) {
  .customer-info-screen .form-group button{
    width: 35%;
    height: auto;
  }
}

@media (max-width: 600px) {
  
  .information {
    font-size: 14px;
  }
}
</style>