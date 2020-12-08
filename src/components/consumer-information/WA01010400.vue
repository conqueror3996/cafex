<template>
  <div class="box-page WA01010400">
    <b-button @click="$router.push('/WA01010300')">
      <img :src="imgBackIcon" />
    </b-button>
    <div class="screen-medium">
      <div class="customer-info-screen">
          <div class="title-information">
            <p>お客様情報</p>
          </div>
          <div class="content-information">
              <div class="information">
                  <p>氏名：<span v-if="this.localConsumer.item">{{ this.localConsumer.item.consumerName }}</span></p> 
                  <p>氏名（カナ）: <span v-if="this.localConsumer.item">{{ this.localConsumer.item.consumerNameKana }}</span> </p> 
                  <span for="contractor">お客様情報</span> 
                  <ul id="v-for-object" class="contractor-info">
                    <li v-for="(value, name) in Object.keys(labels)" :key="name">
                      <span> 
                        {{ labels[value] }} : {{ localConsumer.item ? localConsumer.item[value] : '' }} 
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
import { auth } from '../../_helpers/'

export default {
  data() {
    return {
        imgButtonFile: './static/img/btn_start_file_manage.svg',
        imgButtonRemote: './static/img/button_remote.svg',
        imgBackIcon: './static/img/btn_back_consumer_select.svg',
        labels: {
          age: '年齢',
          birthdate: '生年月日',
          postalCode: '郵便番号',
          address: '住所',
          // mailAddress: 'メールアドレス',
          // consumerMemo: 'メモ',
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
      this.localConsumer.item.birthdate = this.localConsumer.item.birthdate ? auth.formatDateTime(this.localConsumer.item.birthdate, 'yyyy/MM/DD') : ''
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
  },
};
</script>

<style>
.logo{width:8%}
.information p{margin-bottom:6px;}
.screen-medium{margin-top:25px;position: relative;}
.box-page.WA01010400{position: relative;}
.box-page.WA01010400 > button.btn {position:absolute;left:0px;top:0px;z-index:999;background-color:transparent;border:none;padding:0px}
.box-page.WA01010400 > button.btn:focus{box-shadow:none;}
.box-page.WA01010400 > .screen-medium button.btn-secondary {
    background-color: transparent;
    border: none;
    padding: 0px;
    position: absolute;
    right: 100%;
    top: 0;
    z-index: 999;
    margin-right: 10px;
    width: 175px;
}
.WA01010400 .customer-info-screen {
  background-color: #ffffff;
  width: 100%;
  height: auto;
  padding: 1.5rem 3rem 0 3rem;
  margin: auto;
}
.WA01010400 .title-information {
  width: 100%;
  display: inline-block;
}

.WA01010400 .title-information p{
    height: 28px;
    color: #313131;
    font-size: 24px;
    font-weight: 400;
    text-align: left;
    float: left;
    clear: right;
}

.WA01010400 .title-information button {
  float: right;
  padding: 0;
  border-radius: .7rem;
  border: none;
}

.WA01010400 .title-information button img {
  float: right;
}

.WA01010400 .content-information {
    /* width: 1102px; */
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin: 0px auto;
}

.WA01010400 .contractor-info {
    list-style: none;
}
.WA01010400 .contractor-info li{padding:5px 0px;}
.WA01010400 .information {
  width: 100%;
  height: auto;
  border-radius: 8px;
  border: solid 3px #979797;
  background: #ffffff;
  padding: 1rem 2rem;
}

.WA01010400 .information label {
  font-size: 16px;
}

.WA01010400 .customer-info-screen .form-group {
  width: 100%;
  text-align: center;
  display: inline-block;
  margin-bottom: 4rem;
}

.WA01010400 .customer-info-screen .form-group button{
  margin: 40px 4rem 0 4rem;
  width: 331px;
  height: 85px;
  padding: 0px;
}

.WA01010400 .customer-info-screen .form-group button img{
    width: 100%;
}
@media(max-width:1440px){
  .WA01010400 .screen-medium{max-width:1050px;}
  .header{height:90px;}
  .WA01010400 .customer-info-screen{padding:10px 30px 0px 30px}
  .WA01010400 .title-information p{font-size:21px;margin-bottom:10px}
  .WA01010400 .customer-info-screen .form-group button{width:250px;margin-top:10px}
  .WA01010400 .information{padding:10px 15px;}
}
@media (max-width: 1370px) {
  .WA01010400 .screen-medium{max-width:975px;}
  .WA01010400 .customer-info-screen .form-group{margin-bottom:25px;}
  .WA01010400 .customer-info-screen {
    height: auto;
  }
  .WA01010400 .information {
    height: 50vh;
    font-size: 14px;
  }
  .WA01010400 .customer-info-screen .form-group button {
    margin-top: 20px;
    width: 298px;
    height: 77px;
  }
}

@media (max-width: 1024px) {
  .WA01010400 .customer-info-screen {
    height: calc(80vh);
  }
  .WA01010400 .information {
    height: 50vh;
    font-size: 13px;
  }
  .WA01010400 .customer-info-screen .form-group button {
    margin: 20px 2rem 0 2rem;
  }
}

@media (max-width: 1000px) {
  .WA01010400 .customer-info-screen .form-group button{
    width: 35%;
    height: auto;
  }
}

@media (max-width: 600px) {
  
  .WA01010400 .information {
    font-size: 14px;
  }
}
</style>