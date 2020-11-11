<template>
  <div id="main" class="clearfix">
      <div id="left">
        <div class="box-search border-box">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="ショートコード" maxlength="4" >
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="button">送信</button>
            </div>
          </div>
        </div>
        <div class="box-info border-box scroll-bar">
          <div style="font-size: 14px">
            <p style="margin: 0;">お客様コード：<span v-if="this.localConsumer">{{ this.localConsumer.consumerName }}</span></p> 
            <p style="margin: 0;">氏名　     ： <span v-if="this.localConsumer">{{ this.localConsumer.consumerNameKana }}</span> </p> 
            <span for="contractor">属性情報</span> 
            <ul id="v-for-object" class="contractor-info">
              <li v-for="(value, name) in this.localConsumer" :key="name" style="margin-top: 0.5rem;">
                <span v-if="Object.keys(labels).includes(name)" > 
                  {{ labels[name] }} : {{ value }} 
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="box-tab border-box scroll-bar">
          <div class="action-panel">
            <button class="btn btn-outline-primary small-font" @click="showSimulation = true; showDescription = false; showContract = false">
              <span>ライフプラン<br /> シミュレーション</span>
            </button>
            <button class="btn btn-outline-primary" @click="showSimulation = false; showDescription = true; showContract = false">
              <span>商品説明</span>
            </button>
            <button class="btn btn-outline-primary" @click="showSimulation = false; showDescription = false; showContract = true">
              <span>契約申込</span>
            </button>
          </div>
          
          <div class="content-action">
            <div class="simulation" v-if="showSimulation">
              <button class="btn btn-outline-primary">
                <span>代行入力</span>
              </button>
            </div>
            <div class="description" v-if="showDescription">
              <label>ファイル</label>
              <div class="input-group">
                <select class="select-page" id="select-page" name="doc-page" v-model="docPageIndex" @change="changeDoc">
                      <option v-bind:key="gIdx" :value="gIdx" v-for="(obj, gIdx) in docFiles">{{obj.groupName}}
                      </option>
                  </select>
              </div>
              <label>ページ</label>
              <div class="input-group">
                <select class="page-select" id="select-page" v-model="docSubPageIndex" @change="changeSubPage">
                  <option v-bind:key="gIdx" :value="gIdx" v-for="(obj, gIdx) in docSubPage">{{obj.label}}
                  </option>
                </select>
              </div>
              <button class="btn btn-primary" @click="pushDocUrl">
                <span>共有</span>
              </button>
              <div class="document-preview">
                <img :src="docPageObj.value" />
              </div>
            </div>
            <div class="contract" v-if="showContract">
              <button class="btn btn-outline-primary">
                <span>代行入力</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="right" class="border-box"></div>
  </div>
  <!-- <div class="screen-contact">
    <div class="side-right">
      <div class="screen-share">
      </div>
    </div>
  </div> -->
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { auth } from '../../_helpers/'
import moment from 'moment';

export default {
  data() {
    return {
      showSimulation: true,
      showDescription: false,
      showContract: false,
      docFiles: [],
      docPageIndex: '',
      docSubPageIndex: '',
      docSubPage: [],
      docPageObj: {},
      labels: {
          age: '年齢',
          birthdate: '生年月日',
          address: '住所',
          phoneNumber1: '電話番号１',
          phoneNumber2: '電話番号２',
        },
      localConsumerId: '',
      localConsumer: {}
    }
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
      // this.localConsumer = this.consumers
      this.localConsumer = {
        consumerName: this.consumers.item.consumerName,
        consumerNameKana: this.consumers.item.consumerNameKana,
        birthdate: auth.formatDateTime(this.consumers.item.birthdate, 'yyyy/MM/DD'),
        age: this.consumers.item.age,
        address: this.consumers.item.address,
        phoneNumber1: this.consumers.item.phoneNumber1,
        phoneNumber2: this.consumers.item.phoneNumber2,
      }
      // this.localConsumer.item.birthdate = moment(this.localConsumer.item.birthdate).format('yyyy/MM/DD')
    })
    this.getDocFile("NRI").then((res) => {
      this.docFiles = res.data.docList;
    });
  },
  methods: {
    ...mapActions("employees", {
      getUserInfo: "userInfo"
    }),
    ...mapActions("files", {
      getDocFile: "getDocFile",
    }),
    ...mapActions("consumers", {
      getConsumerByID: "getConsumerByID",
    }),
    changeDoc(event) {
      this.docSubPage = this.docFiles[parseInt(this.docPageIndex)].list;
      this.docSubPageIndex = 0;
      this.changeSubPage();
    },
    changeSubPage(event) {
      if(this.docSubPageIndex !== '') {
        this.docPageObj = this.docSubPage[parseInt(this.docSubPageIndex)];
      }
    },
    initInfo () {
        this.localConsumerId = localStorage.getItem('consumerId')
        console.log(this.localConsumerId)
      },
    pushDocUrl() {
      if(this.docSubPageIndex != '') {

      }
    }
  },

};
</script>

<style>
body{margin:0px;padding:0px;background:#f0f0f0;overflow:hidden !important;width:100%;height:100vh;}
		.clearfix:after{clear:both;content:".";display:block;height:0;visibility:hidden;}
		
		.inner{width:calc(100% - 40px);margin:auto;}
		.logo{display:inline-block;padding:10px 0px 0px 10px;width:25%;float:left;}
		#header{width:100%;height:120px;}
		.mw100{max-width:100%;}
		/* #main{margin-top:30px;} */
		.border-box{border:1px solid #e0e0e0;box-sizing:border-box;}
		#left{width:calc(25% - 5px);float:left;height:calc(100vh - 150px);}
		.box-search{background:#fff;border-radius:10px;width:100%;height:calc(100% - 90%); padding: 2px 2px 0 2px;} /*10%*/
		.box-info{background:#fff;border-radius:10px;width:100%;height:calc(100% - 60% - 20px);margin-top:20px;}
		.box-tab{background:#fff;border-radius:10px;width:100%;height:calc(100% - 50% - 20px);margin-top:20px;}
		#right{width:calc(75% - 15px);float:right;height:calc(100vh - 150px);background:#fff;border-radius:10px;}
    .contractor-info {
      list-style: none;
      padding: 0;
      margin: 0;
      padding-left: 15px;
    }
    .scroll-bar {
      overflow: hidden;
      overflow-y: scroll;
      padding: 5px;
    }
    .scroll-bar::-webkit-scrollbar {
      width: 0.5em;
    }
    
    .scroll-bar::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    
    .scroll-bar::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
		@media(max-width:1366px){
			.inner{width:calc(100% - 40px)}
			.logo{width:9%;}
			#header{height:100px;}
			/* #main{margin-top:20px;} */
			#left,#right{height:calc(100vh - 120px);}
			#left{width:calc(25% - 10px);}
			#right{width:calc(75% - 10px);}
			.box-search{height: calc(100% - 90%); padding: 5px 5px 0 5px;}
			.box-info{height: calc(100% - 60% - 20px);margin-top:15px;}
			.box-tab{height: calc(100% - 50% - 10px);margin-top:15px;}
		}
 .screen-contact {
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1410px;
  height: 710px;
  margin-top: .5rem;
}

.side-left {
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  padding-right: 1rem;
  margin: auto auto;
}

.side-right {
  width: 75%;
  margin-left: 2rem;
  margin: auto auto;
}

.screen-share {
  background-color: #ffffff;
  width: 100%;
  height: 702px;
  border-radius: .5rem;
}

.search-code {
  background-color: #ffffff;
  width: 100%;
  height: 52px;
  border-radius: .5rem;
  padding: .45rem 1rem;
}

.search-contact {
  border: 1px solid;
  border-radius: .5rem;
}

.btn-search-text {
  color: black;
}

.screen-contact .info {
  background-color: #ffffff;
  width: 100%;
  height: 228px;
  border-radius: .5rem;
  margin-top: .5rem;
}

.content-info {
  margin-left: 1rem;
  margin-top: .5rem;
  font-size: 13px;
}
.content-info p{
  margin-bottom: .5rem;
}
.content-info p.info-sub {
  margin-left: 2rem;
}

.action {
  background-color: #ffffff;
  width: 100%;
  height: 400px;
  border-radius: .5rem;
  margin-top: .5rem;
}

.action-panel {
  margin: .75rem .3rem;
  text-align: center;
}

.action-panel button {
  width: 32%;
  height: 3rem;
  line-height: 1rem;
}

.action-panel .small-font span {
  font-size: 9px;
}

.action-panel span {
  font-size: 0.75rem;
  color: black;
}

.action-panel button:hover {
    color: #fff;
    background-color: #BCD9D6 !important;
}

.action-panel button.focus, .action-panel button:focus {
    box-shadow: 0 0 0 0.2rem rgba(155, 224, 217,.5);
}

.action-panel button:not(:disabled):not(.disabled).active, .action-panel button:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #BCD9D6 !important;
}

.simulation {
  text-align: center;
  margin-top: 8rem;
}

.simulation button {
  color: #000000;
  border-radius: 1rem;
}

.contract {
  text-align: center;
  margin-top: 8rem;
}

.contract button {
  color: #000000;
  border-radius: 1rem;
}

.description {
  padding: 0 1rem;
}

.description label{
  margin-bottom: 0px;
}

.description select{
  height: 34px;
  width: 100%;
  border: 1px solid #dbdad7;
}

.description button{
  margin-top: 0.5rem;
  width: 100%;
  border-radius: 1rem;
  height: 25px;
  font-size: 14px;
  padding-top: 0px;
}

.description .document-preview {
  margin-top: .5rem;
  background-color: #cacfce;
  width: 100%;
  height: 165px;
  overflow: auto;
}

.description .document-preview img {
  width: 100%;
}
/*
@media (max-width: 1400px) {
  .screen-contact {
    width: 100%
  }
};

@media (max-width: 1200px) {
  .action-panel {
    margin: .75rem .3rem;
    text-align: center;
  }

  .action-panel button {
    padding-left: .25rem;
    padding-right: .25rem;
    width: 30%;
  }

  .action-panel span {
    font-size: 12px;
    color: black;
  }
  .action-panel .small-font span {
    font-size: 8px;
  }
};

@media (max-width: 1024px) {
  .action-panel {
    margin: .75rem 0.2rem;
  }

  .action-panel span {
    font-size: 11px;
    color: black;
  }

  .action-panel button {
    width: 32%;
  }
  .action-panel .small-font span {
    font-size: 8px;
  }
}; */
</style>
