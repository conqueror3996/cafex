<template>
  <div id="main" class="clearfix">
      <div id="left">
        <div class="box-search border-box">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="ショートコード" maxlength="4" v-model="shortCode">
            <div class="input-group-append">
              <button class="btn btn-outline-primary" type="button" 
                @click="start" :disabled="shortCode.length!=4" v-show="!isSharing">
                  送信
              </button>
              <button class="btn btn-outline-primary" type="button" 
                @click="end" v-show="isSharing">
                  終了
              </button>
            </div>
          </div>
        </div>
        <div class="box-info border-box scroll-bar">
          <div style="font-size: 14px">
            <p style="margin: 0;"><span class="new-title new-title-block">お客様コード</span>: <span v-if="this.localConsumer">{{ this.localConsumer.consumerName }}</span></p> 
            <p style="margin: 0;"><span class="new-title new-title-block">氏名</span>: <span v-if="this.localConsumer">{{ this.localConsumer.consumerNameKana }}</span> </p> 
            <span for="contractor">属性情報</span> 
            <ul id="v-for-object" class="contractor-info">
              <li v-for="(value, name) in this.localConsumer" :key="name" style="margin-top: 0.5rem;">
                <div v-if="Object.keys(labels).includes(name)" > 
                  <span class="new-title">{{ labels[name] }}</span> : {{ value }} 
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="box-tab border-box scroll-bar">
          <div class="action-panel">
            <button class="btn btn-outline-primary small-font" @click="pushLink('share-plan1')">
            <!-- <button class="btn btn-outline-primary small-font" @click="showSimulation = true; showDescription = false; showContract = false"> -->
              <span>ライフプラン<br /> シミュレーション</span>
            </button>
            <button class="btn btn-outline-primary" @click="showSimulation = false; showDescription = true; showContract = false">
              <span>商品説明</span>
            </button>
            <button class="btn btn-outline-primary" @click="pushLink('share-form1')">
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
import { auth } from '../../_helpers/'
import moment from 'moment';
import { mapActions, mapState } from 'vuex'
import GServer from '../../_services/g.service'
import agentService from '../../_services/agent.service'
import apiService from '../../_services/api.service'
import Assist from '../../models/AssistAgentSDK'

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
      // remote data
      agent: {},
      AssistAgentSDK: {},
      CallManager: {},
      UC: {},
      gServiceTemp: {},
      isSharing: false,
      isShowFormContainer: false,
      targetLink: '#/consumer/app',
      selectedTool: null,
      ctrlType: 'doc',
      remoteView: {},
      remoteVideo: {},
      formBody: {},
      config: {
        autoanswer: true,
        username: `N27-01`,
        password: 'none',
        name: 'Agent',
        locale: 'ja',
        type: 'create',
        targetServer: null,
      },
      shortCode: '',
      beforeFormElement: null,
      drawStyles: [
        { label: '赤ペン', colour: '#FF0000', width: 1, opacity: 1 },
        { label: '蛍光ペン', colour: '#78F54E', width: 25, opacity: 0.4 }
      ],
      isInit: false,
      appView: false,
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
      detail: (state) => state.consumers.single,
      gService: (state) => {
        return state.service.serviceConfig;
        },
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
        consumerId: this.consumers.consumerId,
      }
      // this.localConsumer.item.birthdate = moment(this.localConsumer.item.birthdate).format('yyyy/MM/DD')
    })
    this.getDocFile("NRI").then((res) => {
      this.docFiles = res.data.docList;
    });
        // Get GService Info
    this.agent = agentService
    console.log("this.agent", this.agent)
    this.AssistAgentSDK = Assist.AssistAgentSDK;
    this.CallManager = Assist.CafexCallManager,
    this.UC = Assist.UC;
    
    // Init GService
    this.gServiceTemp = GServer;
    this.gServiceTemp.urlParamMap = this.$route.query;
    this.gServiceTemp.isMock = !(this.gServiceTemp.urlParamMap['isMock'] === undefined || this.gServiceTemp.urlParamMap['isMock'] === 'false');
    this.gServiceTemp.orgCd = this.gServiceTemp.urlParamMap['orgCd'] || 'NRI';
    
    // load default config from json file
    console.log("before loadConfig")
    apiService.loadConfig(this.gServiceTemp.orgCd).then((res) => {
      console.log("get success");
      console.log("after loadConfig")
      this.gServiceTemp.appConfig = res.data;
      console.log("after set appCOnfig")
      // ユーザー別デフォルト設定値をロードする。URLで指定がある場合はそちらを優先する。
      this.gServiceTemp.connectionType = ['dial', 'code', 'code2'].indexOf(this.gServiceTemp.urlParamMap['connectionType']) === -1 ? res.data.defaultConnectionType : this.gServiceTemp.urlParamMap['connectionType'];
      this.gServiceTemp.envType = this.gServiceTemp.urlParamMap['envType'] || res.data.defaultEnvType;
      apiService.loadEnvConfig(this.gServiceTemp.envType).then((resEnv) => {
        this.gServiceTemp.envConfig = resEnv.data;
        
        console.log("this.gServiceTemp", this.gServiceTemp)
        this.setConfig(this.gServiceTemp)
        this.ready(); // add js file to body
      });
    });
  },
    mounted() {
    // console.log("window['AssistAgentSDK']", window['AssistAgentSDK'])
    // this.AssistAgentSDK = window['AssistAgentSDK'];
    // this.AssistAgentSDK.sdkUrl = './assets/sdk/';
    // this.initDom();
    // const url = new URL(this.gService.envConfig.cafexDomain || location.origin);
    // this.config.targetServer = this.getEncodedServerAddr(url);
    // this.config.url = this.gService.envConfig.cafexDomain || location.origin;
    // console.log(this.config.targetServer);
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
    ...mapActions("service", {
      setConfig: "setServiceConfig",
    }),

    // function add sdk js file to body
    ready() {
      console.log("this.gService", this.gService)
      this.agent.init(this.gService);
      // Load script js
      this.loadStyle(`${this.gService.envConfig.cafexDomain}/assistserver/sdk/web/shared/css/shared-window.css`);
      this.loadStyle(`${this.gService.envConfig.cafexDomain}/assistserver/sdk/web/agent/css/assist-console.css`);
      const scriptSrcList = [
        `${this.gService.envConfig.cafexDomain}/assistserver/sdk/web/shared/js/thirdparty/i18next-1.7.4.min.js`,
        `./static/js/custom-adapter-new.js`,
        `./static/js/sub.js`,
        `${this.gService.envConfig.cafexDomain}/gateway/csdk-phone.js`,
        `${this.gService.envConfig.cafexDomain}/gateway/csdk-aed.js`,
        `${this.gService.envConfig.cafexDomain}/gateway/csdk-common.js`,
        `${this.gService.envConfig.cafexDomain}/assistserver/sdk/web/shared/js/assist-aed.js`,
        `${this.gService.envConfig.cafexDomain}/assistserver/sdk/web/shared/js/shared-windows.js`,
        `${this.gService.envConfig.cafexDomain}/assistserver/sdk/web/agent/js/assist-console.js`,
        `${this.gService.envConfig.cafexDomain}/assistserver/sdk/web/agent/js/assist-console-callmanager.js`,
      ];
      scriptSrcList.forEach(scriptUrl => {
        this.loadScripts(scriptUrl);
      });
      // console.log("window", window)
      // this.AssistAgentSDK.sdkUrl = './assets/sdk/';
      // this.initDom();

      // const url = new URL(this.gService.envConfig.cafexDomain || location.origin);
      // this.config.targetServer = this.getEncodedServerAddr(url);
      // this.config.url = this.gService.envConfig.cafexDomain || location.origin;
      // console.log(this.config.targetServer);
    },

    getEncodedServerAddr(url) {
      var protocol = url.protocol;
        var port = url.port;
        var hostname = url.hostname;
        if (port === "") { if (protocol === "https:") { port = "443"; } else { port = "80"; } }
        const uri = protocol + "//" + hostname + ":" + port;
        console.log(`getEncodedServerAddr(${uri})`);
        return btoa(uri);
    },

    //Load script SDK
    loadScripts(scriptUrl) {
      let jsElement = document.createElement('script')
      jsElement.setAttribute('src', scriptUrl)
      document.body.appendChild(jsElement)
    },

    //Load style SDK
    loadStyle(styleUrl) {
      let styleElement = document.createElement('link')
      styleElement.rel = 'stylesheet';
      styleElement.href = styleUrl;
      document.body.appendChild(styleElement);
    },

    //init DOM SDK
    initDom() {
      
      this.AssistAgentSDK.setLocale('ja');
      this.AssistAgentSDK.setScreenShareActiveCallback(isActive => {
        this.isSharing = isActive;
        if (isActive) {
          console.log("###Screen Share Active.###");
          this.selectedTool = 'control-selected';
          AssistAgentSDK.controlSelected();
          this.pushLink('share-doc');
        } else {
        }
      });
      this.AssistAgentSDK.setConsumerLeftCallback(() => {
        console.log("### Consumer Left ###");
      });
      this.AssistAgentSDK.setConsumerEndedSupportCallback(() => {
        console.log("### Consumer Ended Support ###");
        this.end();
      });
      this.AssistAgentSDK.setConnectionLostCallback(() => {
        alert("通信が切断されました。");
        console.log("### Connection Down ###");
        // this.end();
      });
      this.AssistAgentSDK.setConnectionEstablishedCallback(() => {
        console.log("### Connection Established ###");
      });
      this.AssistAgentSDK.setCallEndedCallback(() => {
        console.log("### Call Ended ###");
      });
      this.AssistAgentSDK.setConsumerJoinedCallback(() => {
        console.log("### Consumer Joined ###");
        AssistAgentSDK.requestScreenShare();
      });
      this.AssistAgentSDK.setRemoteViewCallBack((width, height) => {
        this.consumerResize(width, height);
        console.log(`resize${width}:${height}`);
      });
      this.AssistAgentSDK.setFormCallBack((formElement) => {
        this.isShowFormContainer = false;
        let flg = false;
        if (!formElement) {
          // フォーム無しの場合はフォームコンテナの中身を消して非表示にする。
          this.formBody.nativeElement.innerHTML = '';
          this.isShowFormContainer = false;
        } else if (!this.beforeFormElement) {
          // 新たにフォーム追加のパターン
          flg = true;
        } else {
          // フォーム更新のパターン
          // TODO 何故か同じフォームが二回飛んできてしまう。何かのバグのような気がする。
          if (this.beforeFormElement === formElement) {
            console.log('Equal');
          } else if (this.beforeFormElement.id === formElement.id) {
            this.beforeFormElement.remove();
            flg = true;
            console.log('EqualId');
          } else {
            this.beforeFormElement.remove();
            flg = true;
            console.log('Else');
            flg = true;
          }
        }
        console.log(`setFormCallBack:${flg}`);
        console.log(formElement);
        if (flg) {
          this.formBody.nativeElement.appendChild(formElement);
        } else {
        }
        this.beforeFormElement = formElement;
      });
    },

    // start sharing
    start() {
      
      console.log("window", window)
      
      console.log("window['AssistAgentSDK']", window['AssistAgentSDK'])
      this.AssistAgentSDK = window['AssistAgentSDK'];
      this.AssistAgentSDK.sdkUrl = './assets/sdk/';
      this.initDom();

      const url = new URL(this.gService.envConfig.cafexDomain || location.origin);
      this.config.targetServer = this.getEncodedServerAddr(url);
      this.config.url = this.gService.envConfig.cafexDomain || location.origin;
      console.log(this.config.targetServer);

      switch (this.gService.connectionType) {
        case 'code':
          this.startCode(this.shortCode);
          break;
        case 'code2':
          // this.startCode2(this.shortCode);
          break;
      }
    },

    // startCode
    async startCode(code) {
      const res = await this.makeSession();
        this.agent.startWithExistingShortCode(this.shortCode).then((resCode) => {
          this.isSharing = true;
          this.isShowFormContainer = false;
          const configSupport = {
            correlationId: resCode.cid,
            sessionToken: res.token,
            retryIntervals: [1.0, 2.0],
            url: this.gService.envConfig.cafexDomain || location.origin,
            shadowCursor: true,
          };
          console.log(`startSupport:configSupport(${JSON.stringify(configSupport)})`);
          this.AssistAgentSDK.startSupport(configSupport);
        })
    },

    // make session
    async makeSession() {
      console.log(`assistserver/agent ${JSON.stringify(this.config)}`);
      const res = await this.agent.makeAgentSession(this.config);
        
        console.log(res);
        this.config.sessionToken = res.token;
        if (['dial', 'code2'].indexOf(this.gService.connectionType) !== -1) {
          this.CallManager.init(this.config);
          this.CallManager.configureStartCall = () => {
            this.AssistAgentSDK.requestScreenShare();
          };
          this.CallManager.configureEndCall = () => {
            console.log("### End Call ###");
            this.isSharing = false;
            this.isShowFormContainer = false;
          };
            
          // CallManager.setRemoteVideoElement(document.getElementById("remotevideo"));
          this.CallManager.setLocalVideoElement(document.getElementById("previewvideo"));

          this.UC.phone.onIncomingCall = ((newCall) => {
            this.agent.callObj = newCall;
            newCall.enableLocalAudio(true);
            newCall.enableLocalVideo(true);
            newCall.enableScreenshare(true);
            var response = confirm("Call from: " + newCall.getRemoteAddress() + " - Would you like to answer?");
            if (response === true) {
              //What to do when the remote party ends the call
              newCall.onEnded = function () {
                alert("Call Ended");
                this.end();
              };
              newCall.answer('enabled', 'disabled');
            } else {
              //Reject the call
              newCall.end();
            }
          }).bind(this);
        }

        return res;
    },
    end() {
      this.isSharing = false;
      this.isShowFormContainer = false;
      this.agent.agentInfo = {};
      this.shortCode = '';
      if (this.agent.callObj) {
        try {
          this.agent.callObj.enableLocalAudio(false);
          this.agent.callObj.enableLocalVideo(false);
          this.agent.callObj.enableScreenshare(false);
          this.agent.callObj.end();
        } catch (e) {
          console.log(e);
        }
      }
      this.AssistAgentSDK.endSupport();
      document.cookie = '';
      location.reload();
    },
    // change doc
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
    pushLink(targetLink){
      console.log("into pushlink")
      if (this.isSharing && targetLink) {
        this.appView = targetLink === 'share-app';
        const obj = { type: 'link', body: { path: targetLink } };
        this.AssistAgentSDK.pushLink(`javascript:receiver.next(${JSON.stringify(obj)})`);
      }
    },
    pushDocUrl() {
      if(this.docSubPageIndex != '') {

      }
    }
  },

};
</script>

<style>
    body{margin:0px;padding:0px;background:#f0f0f0;overflow:hidden;width:100%;height:100vh;}
		.clearfix:after{clear:both;content:".";display:block;height:0;visibility:hidden;}
		
		.inner{width:calc(100% - 40px);margin:auto;max-width:unset !important}
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
    .new-title {
      width: 25%;
      display: inline-block;
    }
    .new-title.new-title-block{
      width: calc(25% + 15px);
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
