<template>
  <div id="main" class="clearfix">
    <div class="toolbar">
      <form name="toolsForm" class="tools"  v-show="isSharing">
        <!-- -->
        <b-button-group size="xs" class="edit-tools">
        <b-button variant="light" title="選択" @click="selectedTool = 'control-selected'; touch()" :class="selectedTool === 'control-selected'? 'active' : ''">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-hand-index-thumb" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6.75 1a.75.75 0 0 0-.75.75V9.5a.5.5 0 0 1-.854.354l-2.41-2.411a.517.517 0 0 0-.809.631l2.512 4.185 1.232 2.465a.5.5 0 0 0 .447.276h6.302a.5.5 0 0 0 .434-.252l1.395-2.442a2.5 2.5 0 0 0 .317-.991l.272-2.715a1 1 0 0 0-.995-1.1H13.5v1a.5.5 0 1 1-1 0V7.154a4.208 4.208 0 0 0-.2-.26c-.187-.222-.368-.383-.486-.43-.124-.05-.392-.063-.708-.039a4.844 4.844 0 0 0-.106.01V8a.5.5 0 1 1-1 0V5.986c0-.167-.073-.272-.15-.314a1.657 1.657 0 0 0-.448-.182c-.179-.035-.5-.04-.816-.027l-.086.004V8a.5.5 0 1 1-1 0V1.75A.75.75 0 0 0 6.75 1zM8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v6.543L3.443 6.736A1.517 1.517 0 0 0 1.07 8.588l2.491 4.153 1.215 2.43A1.5 1.5 0 0 0 6.118 16h6.302a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.272-2.715a2 2 0 0 0-1.99-2.199h-.582a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.634 2.634 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002zm2.094 2.025z"/>
          </svg>
        選択</b-button>
        <b-button variant="light" title="ポイント" @click="selectedTool = 'spotlight-selected'; spotlight()" :class="selectedTool === 'spotlight-selected'? 'active' : ''">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bullseye" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path fill-rule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
            <path fill-rule="evenodd" d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          </svg>
          ポイント</b-button>
        <b-button variant="light" title="赤ペン"  @click="selectedTool = 'draw-赤ペン'; paint('red')" style="color: red;" :class="selectedTool === 'draw-赤ペン'? 'active' : ''">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
          </svg>
         <span style="color: black;"> 赤ペン</span> </b-button>
        <b-button variant="light" title="蛍光ペン" @click="selectedTool = 'draw-蛍光ペン'; paint('green')" style="color: green;" :class="selectedTool === 'draw-蛍光ペン'? 'active' : ''">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
          </svg>
          <span style="color: black;">蛍光ペン</span> </b-button>
        <b-button variant="light" @click="clearSelected">消去</b-button>
        </b-button-group>
        <button type="button" name="zoom" class="single-button" title="拡大鏡" @click="startZoom">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-zoom-in" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"/>
            <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
        </button>
        <!-- <button type="button" name="camera-setting" class="single-button" title="カメラ設定" [matMenuTriggerFor]="camMenu"
            (click)="loadDevice()">
            <em class="material-icons">videocam</em>
        </button> -->
        <!-- <button type="button" name="formShowHide" class="edit-tools" (click)="isShowFormContainer=!isShowFormContainer">
            代行入力
        </button> -->
    </form>
    </div>
      <div id="left">
        <div class="box-search border-box">
          <div class="input-search">
            <input type="text" class="txt-search" placeholder="ショートコード" maxlength="4" v-model="shortCode" v-on:keyup.enter="!isSharing ? start() : ''">
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
            <div><span class="new-title new-title-block">氏名</span>: <div v-if="this.localConsumer" class="info-text">{{ this.localConsumer.consumerName }}</div></div> 
            <div><span class="new-title new-title-block">カナ</span>: <div v-if="this.localConsumer"  class="info-text">{{ this.localConsumer.consumerNameKana }}</div> </div> 
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
            <button class="btn btn-outline-secondary small-font" @click="showSimulation = true; showDescription = false; showContract = false; pushLink('share-plan1')">
            <!-- <button class="btn btn-outline-primary small-font" @click="showSimulation = true; showDescription = false; showContract = false"> -->
              <span>ライフプラン<br /> シミュレーション</span>
            </button>
            <button class="btn btn-outline-secondary" @click="showSimulation = false; showDescription = true; showContract = false">
              <span>商品説明</span>
            </button>
            <button class="btn btn-outline-secondary" @click="showSimulation = false; showDescription = false; showContract = true; pushLink('share-form1')">
              <span>契約申込</span>
            </button>
          </div>
          
          <div class="content-action">
            <div class="simulation" v-if="showSimulation">
              <button class="btn btn-outline-secondary">
                <span>代行入力</span>
              </button>
            </div>
            <div class="description" v-if="showDescription">
              <label>ファイル</label>
              <div class="input-group">
                <select class="select-page" id="select-page" name="doc-page" v-model="docFileObj" @change="changeDoc">
                      <option v-bind:key="file.fileId" :value="{fileId: file.fileId, fileName: file.fileName, totalPage: file.fileTotalPages}" v-for="file in files">{{file.fileName}}
                      </option>
                  </select>
              </div>
              <label>ページ</label>
              <div class="input-group">
                <select class="page-select" id="select-page" v-model="docSubPageIndex" @change="changeSubPage">
                  <option value=""></option>
                  <option v-bind:key="idx" :value="obj" v-for="(obj, idx) in docSubPage">Page {{obj}}
                  </option>
                </select>
              </div>
              <button class="btn btn-primary" @click="pushDocUrl()">
                <span>共有</span>
              </button>
              <div class="document-preview">
                <img :src="responseImage" />
              </div>
            </div>
            <div class="contract" v-if="showContract">
              <button class="btn btn-outline-secondary">
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
            <div></div>
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
      docUrl: '',
      responseImage: '',
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
        }).catch((err) => {
          this.files = [];
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
      getUserInfo: "userInfo",
      shareDoc: "shareDoc",
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
          this.pushScreen('share-doc');
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
        this.docSubPage[index] = i; 
        index ++;
      }
      //this.docSubPageIndex = this.docSubPage[0];
      // this.docSubPage = this.docFiles[parseInt(this.docFileIndex)].list;
      // this.docSubPageIndex = 0;
      // this.changeSubPage();
    },
    changeSubPage(event) {
      // if(this.docSubPageIndex !== '') {
      //   this.docPageObj = this.docSubPage[parseInt(this.docSubPageIndex)];
      // }
      if(this.docSubPageIndex !== '' && this.docFileObj.fileId !== '') {
          this.docUrl = this.employees.employee.employeeId + "/" + this.docFileObj.fileId + "/page_" + this.docSubPageIndex + ".png";
          const data = {
            docUrl: this.docUrl
          }
          this.shareDoc(data).then((res) => {
            this.responseImage = res.docUrl
          })
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
    pushScreen(targetLink) {
      if (this.isSharing && targetLink) {
        this.appView = targetLink === 'share-doc';
        const obj = { type: 'doc', body: { path: targetLink } };
        this.AssistAgentSDK.pushLink(`javascript:receiver.next(${JSON.stringify(obj)})`);
      }
    },
    pushDocUrl() {
      if (this.isSharing) {
        let nameFile = this.docFileObj.fileName + "-P." + this.docSubPageIndex;
        const obj = { type: 'doc', body: { path: 'share-doc', label: nameFile , value : this.responseImage } };
        this.AssistAgentSDK.pushLink(`javascript:receiver.next(${JSON.stringify(obj)})`);
      }
    },
    touch() {
      console.log("into touch")
      console.log("this.selectedTool", this.selectedTool)
      this.AssistAgentSDK.controlSelected();
    },
    spotlight() {
      console.log("into spotlight")
      console.log("this.selectedTool", this.selectedTool)
      try { this.AssistAgentSDK.spotlightSelected(); } 
      catch (e) 
      { return; }
    },
    
    drawSelected() {
      try { this.AssistAgentSDK.drawSelected(); } catch (e) { return; }
    },
    paint(color) {
      let drawStyle = {};
      if (color === 'red') {
        drawStyle = {label: "赤ペン", colour: "#FF0000", width: 1, opacity: 1};
      }else {
        drawStyle = {label: "蛍光ペン", colour: "#78F54E", width: 25, opacity: 0.4}
      }
      this.drawSelected();
      try { this.AssistAgentSDK.setAgentDrawStyle(drawStyle.colour, drawStyle.opacity, drawStyle.width); } 
      catch (e) { return }
    },
    clearSelected() {
      console.log('into clear')
      this.AssistAgentSDK.clearSelected();
    },
    startZoom() {
      this.AssistAgentSDK.startZoom();
    }
  }

};
</script>

<style>
  body{margin:0px;padding:0px;background:#f0f0f0;overflow:hidden !important;width:100%;height:100vh;}
  .clearfix:after{clear:both;content:".";display:block;height:0;visibility:hidden;}
  .inner{width:calc(100% - 20px);margin:auto;max-width:unset !important}
  .logo-small{display:inline-block;padding:10px 0px 0px 10px;}
  .mw100{max-width:100%;}
  /* header.header{height:125px;} */
  .border-box{border:1px solid #e0e0e0;box-sizing:border-box;}
  #left{width:calc(20% - 5px);float:left;height:calc(100vh - 145px);}
  #right{width:calc(80% - 5px);float:right;height:calc(100vh - 145px);background:#fff;border-radius:10px;}
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
  .box-info{background:#fff;border-radius:8px;width:100%;height:calc(40% - 10px);margin-top:10px;padding:15px;font-size:15px;overflow: auto;}
  .box-tab{background:#fff;border-radius:8px;width:100%;height:calc(60% - 75px);margin-top:10px;}
  .remote-view {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
  }
  .toolbar {
    position: absolute;
    top: 5vh;
    right: 20vw;
  }
  .edit-tools button {
    width: 120px;
    border: 1px solid #000 !important;
  }
  
  .tools .btn-group>.btn:first-child {
    border-top-left-radius: 3rem !important;
    border-bottom-left-radius: 3rem !important;
  }

  .tools .btn-group>.btn:last-child {
    border-top-right-radius: 3rem !important;
    border-bottom-right-radius: 3rem !important;
  }

  .single-button {
    margin-left: 20px;
    border-radius: 50px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    width: 45px;
    height: 45px;
    border: none;
    background-color: #ffffff;
    color: #000;
    position: relative;
    padding-top: 5px;
  }
  /* .remote-view-element{width:calc(80% - 5px) !important;height:calc(100vh - 145px) !important;} */
  .contractor-info {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .box-info .box-parent > p, .box-info .box-parent div, .contractor-info li{margin-bottom:3px;}
  .box-info .box-parent div, .contractor-info li div {vertical-align: middle;}
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
   .new-title { width: 40%; }
   .info-text { width: 55%; }
  }
  @media(max-width:1440px){
    .inner{width:calc(100% - 40px)}
    .logo-small{width:9%;}
    #header{height:100px;}
    /* #main{margin-top:20px;} */
    #left,#right{height:calc(100vh - 130px);}
    #left{width:calc(25% - 10px);}
    #right{width:calc(75% - 10px);}
    .box-search{background:#fff;border-radius:10px;width:100%;height:55px;padding:9px;} /*10%*/
    .input-search{position:relative;width:100%;height:55px;}
    .box-info{height: calc(100% - 59% - 10px);margin-top:10px;line-height:18px;font-size:14px;padding:10px 15px;}
    .box-tab{height: calc(100% - 52% - 10px);margin-top:10px;}
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
