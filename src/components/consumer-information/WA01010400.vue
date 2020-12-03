<template>
  <div class="box-page">
    <b-button @click="$router.push('/WA01010300')">
      <img :src="imgBackIcon" class="back-icon" />
    </b-button>
    <div class="screen-medium">
      <div class="customer-info-screen">
          <div class="title-information">
            <p>お客様情報</p>
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
              </div>
              <div class="form-group"> 
                  <b-button variant="link" class="button-file" @click="$router.push('/WA01010500')"><img :src="imgButtonFile"></b-button>
                  <b-button variant="link" class="button-remote" @click="goContact()"><img :src="imgButtonRemote"></b-button>
              </div>
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
.logo{width:8%}
.screen-medium{margin-top:25px}
.box-page{position: relative;}
.box-page > button.btn {position:absolute;left:5px;top:0px;z-index:999;background-color:transparent;border:none;padding:0px}
.box-page > button.btn:focus{box-shadow:none;}
.back-icon{width: 100%;}
.customer-info-screen {
    background-color: #ffffff;
    width: 110%;
    height: auto;
    padding: 1.5rem 3rem 0 3rem;
    margin: 0px 0px 0px -70px;
}
.title-information {
  width: 100%;
  display: inline-block;
}

.title-information p{
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
@media(max-width:1440px){
  .screen-medium{max-width:1050px;}
  .header{height:90px;}
  .customer-info-screen{padding: 10px 30px 0px 30px;margin: 0px 0px 0px 40px;width: 95%;}
  .title-information p{font-size:21px;margin-bottom:10px}
  .customer-info-screen .form-group button{width:250px;margin-top:10px}
  .information{padding:10px 15px;}
  .account img {height: 45px;}
}
@media (max-width: 1370px) {
  .screen-medium{max-width:975px;}
  .customer-info-screen .form-group{margin-bottom:25px;}
  .customer-info-screen {
    height: auto;
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
    padding: 10px 30px 0px 30px;
    margin: 0px 0px 0px 190px;
    height: calc(75vh);
    width: calc(60vw);
  }
  .information {
    height: 50vh;
    font-size: 13px;
  }
  .customer-info-screen .form-group button {
    margin: 20px 2rem 0 2rem;
  }
  .customer-info-screen .form-group {
    column-count: 2;
  }
  .back-icon {
    width: 90%;
  }

  .customer-info-screen .form-group button img {
    width: 100%;
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