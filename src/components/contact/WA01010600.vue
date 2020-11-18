<template>
  <div id="main" class="clearfix">
      <div id="left">
        <div class="box-search border-box">
          <div class="input-search">
            <input type="text" class="txt-search" placeholder="ショートコード" maxlength="4" v-model="shortCode">
            <div class="input-group-btn">
              <button class="btn-send_code" type="button" 
                @click="start" :disabled="shortCode.length!=4" v-show="!isSharing">
                  送信
              </button>
              <button class="btn-send_code" type="button" 
                @click="end" v-show="isSharing">
                  終了
              </button>
            </div>
          </div>
        </div>
        <div class="box-info border-box">
          <div class="box-parent">
            <p><span class="new-title new-title-block">お客様コード</span>: <span v-if="this.localConsumer">{{ this.localConsumer.consumerName }}</span></p> 
            <p><span class="new-title new-title-block">氏名</span>: <span v-if="this.localConsumer">{{ this.localConsumer.consumerNameKana }}</span> </p> 
            <span for="contractor">属性情報</span> 
            <ul id="v-for-object" class="contractor-info">
              <li v-for="(value, name) in this.localConsumer" :key="name">
                <div v-if="Object.keys(labels).includes(name)" > 
                  <span class="new-title">{{ labels[name] }}</span> : <div class="info-text">{{ value }} </div>
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
                <select class="select-page" id="select-page" name="doc-page" v-model="docFileObj" @change="changeDoc">
                      <option v-bind:key="file.fileId" :value="{fileId: file.fileId, totalPage: file.fileTotalPages}" v-for="file in files">{{file.fileName}}
                      </option>
                  </select>
              </div>
              <label>ページ</label>
              <div class="input-group">
                <select class="page-select" id="select-page" v-model="docSubPageIndex" @change="changeSubPage">
                  <option v-bind:key="idx" :value="obj" v-for="(obj, idx) in docSubPage">{{obj}}
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
      <div id="right" class="border-box">
        <div ref="remoteView" class="remote-view">
            <div v-show="!isSharing">{{isSharing?'':'Not shared...'}}</div>
            <div v-show="!isSharing" style="position: relative;">
                <video id="previewvideo" style="background: black;width: 500px;margin-bottom: 20px;" autoplay
                    playsinline></video>
                <button type="button" name="camera-setting" class="single-button" title="カメラ設定"
                     @click="loadDevice()"
                    style="margin: 0;position: absolute;width: 50px;height: 50px;right: 0;cursor: pointer;"
                    v-show="gService.isDisplayMediaMode">
                    <!-- [matMenuTriggerFor]="camMenu" -->
                    <em class="material-icons">videocam</em>
                </button>
                <!-- <mat-menu #camMenu="matMenu">
                    <button mat-menu-item *ngFor="let cam of cams;let index=index;" style="cursor: pointer;"
                        (click)="setCam(cam)">{{cam.label}}</button>
                </mat-menu> -->
            </div>
            <div v-show="!isSharing"></div>
            <!-- width: 200px;height: 150px; -->
            <!-- display: none; -->
            <div id="localvideo" v-show="isSharing || (!gService.isDisplayMediaMode && appView)" :class="previewStyle"
                style="background: black;position: absolute;z-index: 3;">
            </div>
        </div>
        <div class="form-frame" v-show="isShowFormContainer">
            <div class="form-container">
                <div class="form-container--title">
                    代行入力フォーム
                    <em class="material-icons" @click="isShowFormContainer=false">close</em>
                </div>
                <div class="form-container--body" ref="formBody"></div>
            </div>
        </div>
      </div>
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
      // docFiles: [],
      files: [],
      //docFileIndex: '',
      docSubPageIndex: '',
      docSubPage: [],
      docFileObj: {},
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
      localConsumer: {},
      previewStyle: '',
      docUrl: ''
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
    this.getUserInfo().then(() => {
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
          consumerId: this.consumers.item.consumerId,
        }
        // this.localConsumer.item.birthdate = moment(this.localConsumer.item.birthdate).format('yyyy/MM/DD')
        this.getAllFile({employeeId: this.employees.employee.employeeId, consumerId : this.localConsumer.consumerId, page: 1, maximumRecordsPerPage: 20}).then((res) => {
          this.files = res.data.file;
        });
      })
    })
    // this.getDocFile("NRI").then((res) => {
    //   this.docFiles = res.data.docList;
    // });
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
    console.log("window.location", window.location)
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
      // getDocFile: "getDocFile",
      getAllFile: "getAllFile",
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
      this.AssistAgentSDK.setRemoteView(this.$refs.remoteView);
      this.config.autoanswer = false;
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
          this.$refs.formBody.innerHTML = '';
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
          this.$refs.formBody.appendChild(formElement);
        } else {
        }
        this.beforeFormElement = formElement;
      });
    },

    // start sharing
    start() {
      this.AssistAgentSDK = window['AssistAgentSDK'];
      this.AssistAgentSDK.sdkUrl = './assets/sdk/';
      this.initDom();

      const url = new URL(this.gService.envConfig.cafexDomain || location.origin);
      this.config.targetServer = this.getEncodedServerAddr(url);
      this.config.url = this.gService.envConfig.cafexDomain || location.origin;

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
          this.isSharing = false;
          this.isShowFormContainer = false;
          const configSupport = {
            correlationId: resCode.cid,
            sessionToken: res.token,
            retryIntervals: [1.0, 2.0],
            url: this.gService.envConfig.cafexDomain || location.origin,
            shadowCursor: true,
          };
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
    consumerResize(width, height) {
      const remoteView = this.$refs.remoteView;
      const remoteaspect = height / width;
      const localAspect = remoteView.parentElement.offsetHeight / remoteView.parentElement.offsetWidth;
      if (localAspect >= remoteaspect) {
        // ローカルの方が縦長の時
        const scaled = remoteView.parentElement.offsetWidth * remoteaspect;
        this.scale = scaled / height;
        remoteView.style.height = `${scaled}px`;
        remoteView.style.width = '100%';
      } else {
        // リモートの方が縦長の時
        const scaled = remoteView.parentElement.offsetHeight * (1 / remoteaspect);
        this.scale = scaled / width;
        remoteView.style.height = '100%';
        remoteView.style.width = `${scaled}px`;
      }
      // if (width > 480) {
      //   this.previewStyle.top = `calc(20px * ${this.scale})`;
      //   this.previewStyle.right = `calc(20px * ${this.scale})`;
      //   delete this.previewStyle.bottom;
      //   delete this.previewStyle.left;

      //   if (this.g.isDisplayMediaMode) {
      //     this.previewStyle.width = `calc( (${width}px - 40px ) * ${this.scale})`;
      //   } else {
      //     this.previewStyle.width = `calc(200px * ${this.scale})`;
      //   }
      //   delete this.previewStyle.height;
      // } else {
      //   this.previewStyle.top = `calc(20px * ${this.scale})`;
      //   delete this.previewStyle.right;
      //   delete this.previewStyle.bottom;
      //   delete this.previewStyle.left;
      //   delete this.previewStyle.width;
      //   this.previewStyle.height = `calc(${height / 4}px * ${this.scale})`;
      // }
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
      this.docSubPage.length = 0
      let index = 0;
      for (let i = 1; i <= this.docFileObj.totalPage; i++) {
        this.docSubPage[index] = "Page_" + i; 
        index ++;
      }
      this.docSubPageIndex = this.docSubPage[0];
      // this.docSubPage = this.docFiles[parseInt(this.docFileIndex)].list;
      // this.docSubPageIndex = 0;
      // this.changeSubPage();
    },
    changeSubPage(event) {
      // if(this.docSubPageIndex !== '') {
      //   this.docPageObj = this.docSubPage[parseInt(this.docSubPageIndex)];
      // }
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
      if(this.docSubPageIndex !== '' && this.docFileObj.fileId !== '') {
          this.docUrl = this.employees.employee.employeeId + "/" + this.docFileObj.fileId + "/" + this.docSubPageIndex + ".png";
      }
    }
  },

};
</script>

<style>
  body{margin:0px;padding:0px;background:#f0f0f0;overflow:hidden !important;width:100%;height:100vh;}
  .clearfix:after{clear:both;content:".";display:block;height:0;visibility:hidden;}
  .inner{width:calc(100% - 20px);margin:auto;max-width:unset !important}
  .logo-small{display:inline-block;padding:10px 0px 0px 10px;}
  .mw100{max-width:100%;}
  header.header{height:125px;}
  .border-box{border:1px solid #e0e0e0;box-sizing:border-box;}
  #left{width:calc(20% - 5px);float:left;height:calc(100vh - 135px);}
  #right{width:calc(80% - 5px);float:right;height:calc(100vh - 135px);background:#fff;border-radius:10px;}
  .box-search{background:#fff;border-radius:8px;width:100%;height:65px;padding:13px;} /*10%*/
  .input-search{position:relative;width:100%;height:65px;}
  .txt-search{width:100%;height:35px;border:none;border-radius:25px;padding-left:15px;
    -ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color=#4D4D4D)";/*IE 8*/
    -moz-box-shadow: 1px 1px 4px #4D4D4D inset;/*FF 3.5+*/
    -webkit-box-shadow: 1px 1px 4px #4D4D4D inset;/*Saf3-4, Chrome, iOS 4.0.2-4.2, Android 2.3+*/
    box-shadow: 1px 1px 4px #4D4D4D inset;/* FF3.5+, Opera 9+, Saf1+, Chrome, IE10 */
    filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color=#4D4D4D); /*IE 5.5-7*/
  }
  .btn-send_code{width:72px;height:32px;background:#ddd;border-radius:25px;border:none;position:absolute;right:1px;top:1px;display:block;z-index:999;cursor:pointer;}
  .box-info{background:#fff;border-radius:8px;width:100%;height:calc(40% - 10px);margin-top:10px;padding:15px;font-size:15px;}
  .box-tab{background:#fff;border-radius:8px;width:100%;height:calc(60% - 75px);margin-top:10px;}
  
  .contractor-info {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .box-info .box-parent > p, .contractor-info li{margin-bottom:8px;}
  .contractor-info li div > span{padding-left:15px;}
  .scroll-bar {
    overflow: hidden;
    overflow-y: scroll;
    padding: 5px;
  }
  
  .scroll-bar::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  .scroll-bar::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  .new-title {
    width: 35%;
    display: inline-block;
  }
  .info-text {
    width: 60%;
    display: inline-block;
    white-space: normal;
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
  @media(min-width:2000px){
    .logo-small{width:5%}
    .box-info .box-parent > p, .contractor-info li{margin-bottom:6px;}
  }
  @media(max-width:1600px){
   .logo-small{width:8%}
   .box-info .box-parent > p, .contractor-info li{margin-bottom:3px;}
   .new-title { width: 40%; }
   .info-text { width: 55%; }
  }
  @media(max-width:1366px){
    .inner{width:calc(100% - 40px)}
    .logo-small{width:9%;}
    #header{height:100px;}
    /* #main{margin-top:20px;} */
    #left,#right{height:calc(100vh - 130px);}
    #left{width:calc(25% - 10px);}
    #right{width:calc(75% - 10px);}
    .box-search{background:#fff;border-radius:10px;width:100%;height:55px;padding:9px;} /*10%*/
    .input-search{position:relative;width:100%;height:55px;}
    .box-info{height: calc(100% - 58% - 10px);margin-top:10px;line-height:18px;font-size:14px;padding:10px 15px;}
    .box-info .box-parent > p, .contractor-info li{margin-bottom:12px;}
    .box-tab{height: calc(100% - 50% - 10px);margin-top:10px;}
  }
  @media(max-width:1100px){
   .new-title { width: 42%; }
   .info-text { width: 51%; }
   .action-panel .small-font span {
      font-size: 8px;
    }
    .action-panel button {
      width: 31%;
      padding-left: .5rem;
    }
    .action-panel button.small-font {
      padding-left: .1rem;
    }
  }
</style>
