<template>
  <div class="screen-medium">
  <div class="home-screen">
    <b-tabs card align="right">
      <template #tabs-start v-if="this.localEmployee.rollCode === '21'">
        <div class="div-back-button nav-item align-self-center">
          <button class="button-manage-mode" @click="$router.push({path:'/WA01020300'})"><img class="img-back-icon" :src="imgManageMode" alt=""></button>
        </div>
      </template>

      <b-tab :title="this.localEmployee.rollCode === '21' ? '顧客一覧' : '顧客選択' "  @click="changeTab('selection')" :active="(tabSelected === 'selection')">
        <b-card-text class="selected-content">
          <div v-if="!isEdit">
            <p class="title" v-if="this.localEmployee.rollCode !== '21'">顧客を選択して「次へ」を押してください</p>
            <div :class="this.localEmployee.rollCode !== '21' ? 'content-search' : 'content-search admin-search'">
              <b-form @submit.stop.prevent="handleSearch">
              <b-input-group>
                <b-form-input
                  type="text"
                  placeholder="氏名を入力して検索"
                  class="border-right-0"
                  maxlength=38
                  v-model="searchString"
                  autofocus
                ></b-form-input>
                <b-input-group-append>
                  <b-button class="bg-transparent border-0" variant="primary" type="submit">
                    <img :src="imgSearchIcon" width="30" height="30">
                    <!-- <b-icon icon="search" /> -->
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              </b-form>
            </div>
            <div class="table-main">
              <b-table
                sticky-header
                ref="selectableTable"
                hover
                :fields="computedFields"
                :items="localConsumers"
                selectable
                select-mode="single"
                @row-selected="onRowSelected"
                :tbody-tr-class="rowActive"
              >
                <template #cell(checked)="data">
                    <div style="padding-left: .75rem;">
                    <input
                      type="radio"
                      name="checked"
                      v-model="selectedItem"
                      :value="data.item.consumerId"
                      @click="selectedRow(data.item)"
                    />
                  </div>
                    
                </template>
                <template #cell(fullname)="data">
                  {{ data.item.consumerName }}
                </template>

                <template #cell(kana)="data">
                  {{ data.item.consumerNameKana }}
                </template>

                <template #cell(salesperson)="data">
                  {{ data.item.employeeName }}
                </template>

                <template #cell(age)="data">
                  {{ data.item.birthdate }} ({{ data.item.age }})
                </template>

                <template #cell(phone1)="data">
                  {{ data.item.phoneNumber1 }}
                </template>

                <template #cell(branch)="data">
                  {{ data.item.branchName }}
                </template>

                <template #cell(memo)="data">
                  {{ data.item.consumerMemo }}
                </template>

                <template
                  #cell(action)="data"
                  v-bind:class="{ 'selected-item': selectedItem != '' }"
                >
                  <div
                    style="padding: 0.5rem"
                    v-if="selectedItem === data.item.consumerId"
                  >
                    <a v-b-modal.modal-edit>
                      <!-- <b-icon icon="pencil" /> -->
                      <img
                        :src="imgEditIcon"
                        width="25"
                        height="25"
                      />
                      <b-modal id="modal-edit" hide-header centered @ok="okEdit()">
                        <div>{{errorMess.WA0101030001}}</div>
                        <template #modal-footer="{ ok, cancel }">
                          <div>
                            <b-button
                              size="sm"
                              variant="primary"
                              @click="ok()"
                            >
                              編集
                            </b-button>
                            <b-button
                              size="sm"
                              variant="danger"
                              @click="cancel()"
                            >
                              キャンセル
                            </b-button>
                          </div>
                        </template>
                      </b-modal>
                    </a>
                    <a v-b-modal.modal-delete>
                      <!-- <b-icon icon="trash" /> -->
                      <img
                        :src="imgDeleteIcon"
                        width="25"
                        height="25"
                      />
                      <b-modal id="modal-delete" hide-header centered @ok="okDelete()">
                        <div>{{errorMess.WA0101030002}}</div>
                        <template #modal-footer="{ ok, cancel }">
                          <div>
                            <b-button
                              size="sm"
                              variant="primary"
                              @click="ok()"
                            >
                              削除
                            </b-button>
                            <b-button
                              size="sm"
                              variant="danger"
                              @click="cancel()"
                            >
                              キャンセル
                            </b-button>
                          </div>
                        </template>
                      </b-modal>
                    </a>
                  </div>
                </template>
              </b-table>
            </div>
            <div class="pagination">
              <div class="box-paging">
                <span @click="funcGetAllConsumer(inputData, meta.page - 1)" :class="{'disabled' : meta.page === 1 }">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
                <span>{{ meta.page }}/{{ meta.maximumPage }}</span>
                <span @click="funcGetAllConsumer(inputData, meta.page + 1)" :class="{'disabled' : meta.page === meta.maximumPage }">
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <div class="bottom-table" v-if="this.localEmployee.rollCode !== '21'">
                <b-button variant="primary" :disabled="this.selectedItem === ''" class="btn-next" @click="information()">次へ</b-button>
            </div>
            
          </div>
          <WA01010310 v-if="isEdit" @changeEdit="isEdit = afterChanges($event)"></WA01010310>
        </b-card-text>
      </b-tab>
      <b-tab title="顧客登録"  @click="changeTab('register')" :active="(tabSelected === 'register')" v-if="this.localEmployee.rollCode !== '21'">
        <b-card-text class="selected-content">
          <WA01010320 @changeSelectedTab="tabSelected = afterChanges($event)"></WA01010320>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WA01010320 from './WA01010320.vue';
import WA01010310 from '../edit-user/WA01010310.vue';
import fileJson from '../../../static/file.json'
import moment from 'moment';
import { Consumer } from '../../models';
import errorMessage from '../../validate/errormessage'
import { auth } from '../../_helpers/'

export default {
  props: {
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // }
  }, // remove if have info login
  data() {
    return {
      imgSearchIcon: './static/img/search-icon.svg',
      imgEditIcon: './static/img/pen.svg',
      imgDeleteIcon: './static/img/trash.svg',
      imgManageMode: './static/img/btn_back_mode_select.svg',
      searchString: '',
      cols: [
        { key: "checked", label: "", class: "col-check" }, // column only display both admin and not
        { key: "fullname", label: "氏名", class: "col-name" },
        { key: "kana", label: "氏名（カナ）", class:"col-kana", isAdminCols: true },
        { key: "age", label: "年齢", class:"col-age", isAdminCols: false },
        { key: "age", label: "生年月日（年齢）", class:"col-age", isAdminCols: true },
        { key: "phone1", label: "電話番号1", class: "col-phone1" },
        { key: "memo", label: "メモ", class: "col-memo", isAdminCols: false }, // column only display if not admin
        { key: "salesperson", label: "担当営業員", class: "col-sales", isAdminCols: true }, // column only display if is admin
        { key: "branch", label: "所属", class: "col-branch", isAdminCols: true },
        { key: "action", label: "" , class: "col-spec", isAdminCols: false },
      ],
      selectedItem: '',
      selectedConsumer: {},
      isEdit: false,
      // users: {
      //   items: [{
      //     consumerId: '4565645561',
      //     consumerName: 'Khang',
      //     consumerNameKana: '',
      //     age: '24',
      //     birthdate: '1996/03/09',
      //     postalCode: '3424',
      //     address: '32/2',
      //     phoneNumber1: '19001560',
      //     phoneNumber2: '19001560',
      //     consumerMemo: 'manhkhang@vn-cubesystem.com'
      //   },]
      // },
      tabSelected: '',
      localEmployee: {},
      localConsumers: [],
      consumerSelected: '',
      inputData: {},
      errorMess: errorMessage,
      meta: {},
    };
  },
  components: {
    WA01010320,
    WA01010310,
  },
  computed: {
    ...mapState({
      employees: (state) => state.employees,
      consumers: (state) => state.consumers.all.items,
      files: (state) => state.files,
      // changePasswordState: (state) => state.changePasswordState
    }),
    computedFields() {
      if(this.localEmployee.rollCode !== '21')
        return this.cols.filter(field => !field.hasOwnProperty('isAdminCols') || !field.isAdminCols);
      else
        return this.cols.filter(field => !field.hasOwnProperty('isAdminCols') || field.isAdminCols);
    }
  },
  created() {
    this.getUserInfo().then(() => {
      this.inputData = { 
          employeeId: this.employees.employee && this.employees.employee.rollCode === '23' ? this.employees.employee.employeeId : null, 
          page: 1, 
          maximumRecordsPerPage: 30,
          keywords: '%%'
        }
      this.localEmployee = this.employees.employee
      this.funcGetAllConsumer(this.inputData, 1);
    })
    // this.changePasswordState = false
  },
  methods: {
    ...mapActions("consumers", {
      getAllConsumer: "getAll",
      deleteConsumer: "deleteConsumer",
    //   deleteItem: "deleteItem"
    }),
    ...mapActions("files", { 
      editItem: "editItem",
    //   deleteItem: "deleteItem"
    }),
    ...mapActions("employees", {
      getUserInfo: "userInfo",
    }),
    ...mapActions("alert", { 
      error: "error",
      clear: "clear",
    }),

    funcGetAllConsumer(input, page) {
      input.page = page;
      this.getAllConsumer(input).then(() => {
        this.meta = this.consumers ? this.consumers.meta : {};
        this.localConsumers = this.consumers.consumer ? this.formatConsumerData(this.consumers.consumer) : []
      }).catch((err) => {
        this.localConsumers = [];
        this.meta = { page: 1, maximumPage: 1}
      });
    },
    deleteItem(consumerId) {
        if(consumerId !== this.selectedItem) {
            return
        }
    },
    onRowSelected(items) {
      if (!items[0]) {
        this.selectedItem = ''
      } else {
        this.selectedItem = items[0]? items[0].consumerId : null
        this.selectedConsumer= items[0] 
      }
    },
    rowActive(item, type) {
      if (!item || type !== 'row') return;
      if(item.consumerId === this.selectedItem) return 'b-table-row-selected table-active'
    },
    selectedRow(item) {
      this.$refs.selectableTable.selectRow(this.localConsumers.indexOf(item))
      // console.log('test', this.$refs.selectedItem)
    },
    // Event click button 編集 in edit modal
    okEdit() {
      this.isEdit = true;
      this.$route.params.consumerId = this.selectedItem
    },
    // Event click button 編集 in delete modal
    okDelete() {
      this.deleteConsumer(this.selectedItem).then(() => {
        console.log("delete success", this.selectedItem);
        this.funcGetAllConsumer(this.inputData, this.meta.page)
      })
    },
    // Event click button search
    handleSearch() {
      console.log('seach', this.searchString.trim())
      this.inputData.keywords = '%' + this.searchString.trim() + '%'
      
      this.funcGetAllConsumer(this.inputData, 1)
      // this.localConsumers = this.consumers.filter(item => { return item.consumerName.toLowerCase().includes(this.searchString.toLowerCase().trim()) || item.consumerNameKana.toLowerCase().includes(this.searchString.toLowerCase().trim()) })
    },
    changeTab(tab) {
      // Set error message empty when change tab
      if (this.tabSelected !== tab) {
        this.clear();
      }
      this.tabSelected = tab;
    },
    formatConsumerData(arrInput) {
      return arrInput.map((e) => {
        return {
          ...e,
          birthdate: auth.formatDateTime(e.birthdate, 'yyyy/MM/DD') ,
          phoneNumber1: auth.formatPhoneNumber(e.phoneNumber1),
          phoneNumber2: auth.formatPhoneNumber(e.phoneNumber2)
        }
      })
    },
    information() {
      if(this.selectedItem)
      {
        localStorage.setItem('consumerId', this.selectedItem)
        // var tempConsumer = new Consumer;
        // tempConsumer.setItem(this.selectedConsumer)
        this.$router.push({
          name: 'WA01010400',
      })
      }
    },
    afterChanges(event) {
      this.funcGetAllConsumer(this.inputData, 1)
      return event
    } 
  },
  
};
</script>

<style>
.col-name {
  width: 15rem;
}

.col-age {
  width: 15rem;
}

.col-phone1 {
  width: 15rem;
}

.home-screen .card-header {
  font-size: 18px;
  color: #0091FF;
}

.home-screen .nav-tabs .nav-link {
  width: 135px;
  text-align: center;
  background-color: #D8D8D8;
}

.home-screen .nav-link.active {
  color: #0091FF !important;
  background-color: #ffffff;
}

.home-screen .nav-tabs a:hover {
    color: #0091FF;
}

.home-screen .div-back-button {
  margin-right: 18px;
  margin-bottom: 1px;
}

.home-screen .div-back-button button {
  outline: unset;
}
.home-screen .button-manage-mode {
  cursor: pointer;
  margin-bottom: 1px;
  margin-right: -5px;
  border: none;
}

.home-screen .card-header {
  padding: 0.75rem 0.55rem 0.75rem 1.25rem;
  background-color: transparent;
}
.home-screen .card-body {
  padding: 0px;
}

.home-screen .form-control {
  border-radius: 0.5rem;
}

.home-screen .input-group-text {
  border-radius: 0.5rem;
}

.selected-content {
  background-color: #ffffff;
  height: 625px;
}

.title {
  text-align: center;
  font-size: 24px;
  padding-top: 0.75rem;
}

.admin-search {
  padding-top: 2rem;
}

.content-search {
  /* margin-top: 100px; */
  margin: auto;
  width: 495px; 
}

.content-search .input-group-append {
  border: 1px solid #ced4da;
  border-radius: 0 .5rem .5rem 0;
}

.table-main {
  margin: 1.5rem 0.75rem 10px 0.75rem;
  border: 1px solid;
  height: 377px;
  overflow: auto;
}
.table-main .table.b-table>thead>tr>th {
  background-color: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}
.col-spec {
  width: 8rem;
}
.col-spec a {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.col-check {
  width: 3rem;
}
.bottom-table {
  text-align: center;
}
.btn-next {
  width: 172px;
  height: 44px;
  font-size: 18px;
  border-radius: .5rem;
}

.selected-item {
  background-color: rgba(0, 0, 0, 0.075);
}

.modal-content {
  width: 501px;
  height: 149px;
  margin: 0 auto
}

.modal-body {
  text-align: center;
  font-size: 16px;
  padding-top: 1.25rem;
}

.modal-footer {
  align-self: center;
  border-top: none;
  padding-bottom: 1.5rem;
}

.modal-footer button {
  width: 170px;
  height: 44px;
  border-radius: 0.5rem;
  margin: 0 1rem;
  font-size: 18px;
}
/* .pagination{
  width:150px;
  height: 40px;
  border-bottom: 1px solid #dcdcdb;
  border-top: 1px solid #dcdcdb;
  margin:0px auto 10px auto;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.pagination span{
  display: inline-block;
  font-size: 15px;
  font-weight:bold;
}
.pagination .box-paging span:nth-child(1),.pagination .box-paging span:nth-child(3){cursor: pointer;padding:2px;}
.pagination .box-paging span.disabled{pointer-events: none;color:#6d6d6d}
.pagination .box-paging span:nth-child(2){padding:0px 20px;} */
@media (max-width: 1366px) {
  .home-screen {
    width: 96%;
    margin: 0 auto;
    height: 100vh;
  }
  
  .selected-content {
    height: calc(70vh);
  }
  .table-main {
    height: calc(35vh - 30px);
  }
  
};

@media (max-width: 1024px) {
  .selected-content {
    height: calc(75vh - 5px);
  }
  
  .table-main {
    height: calc(40vh - 30px);
  }
};

@media (max-width: 1327px) {
  .home-screen {
    width: 96%;
    margin: 0 auto;
  }
};
@media (max-width: 600px) {
  .title {
    text-align: center;
    font-size: 20px;
  }
  .content-search {
    width: 435px;
  }
  
  .col-spec {
    width: 3rem;
  }
};

@media (max-width: 600px) {
  .title {
    text-align: center;
    font-size: 16px;
  }
  .content-search {
    width: 375px;
  }
};

@media (max-width: 414px) {
  .content-search {
    width: 305px;
  }
};

</style>

