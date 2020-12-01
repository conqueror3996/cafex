<template>
<div class="screen-medium">
  <div class="home-admin">
    <b-tabs card align="right">
      <template #tabs-start>
        <div class="div-back-button nav-item align-self-center">
          <button class="button-manage-mode" @click="$router.push({path:'/WA01020300'})"><img class="img-back-icon" :src="imgManageMode" alt=""></button>
        </div>
      </template>
      <b-tab title="従業員一覧" @click="changeTab('selection')" :active="(tabSelected === 'selection')">
        <b-card-text class="selected-content">
          <div v-if="!isEdit">
            <!-- <p class="title">顧客を選択して「次へ」を押してください</p> -->
            <div class="content-search">
              <b-form @submit.stop.prevent="handleSearch">
              <b-input-group>
                <b-form-input
                  type="text"
                  placeholder="従業員名を入力して検索"
                  class="border-right-0"
                  maxlength=38
                  v-model="searchString"
                  autofocus></b-form-input>
                <b-input-group-append>
                  <b-button class="bg-transparent border-0" variant="primary" type="submit">
                    <img :src="imgSearchIcon" width="30" height="30">
                    <!-- <b-icon icon="search" /> -->
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              </b-form> 
            </div>
            <div class="table-main" >
              <b-table
                ref="selectableTable"
                hover
                sticky-header
                :fields="cols"
                :items="localEmployees"
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
                      :value="data.item.employeeId"
                      @click="selectedRow(data.item)"
                    />
                  </div>
                    
                </template>
                <template #cell(branchName)="data">
                  {{ data.item.branchName }}
                </template>

                <template #cell(employeeName)="data">
                  {{ data.item.employeeName }}
                </template>

                <template #cell(mailAddress)="data">
                  {{ data.item.mailAddress }}
                </template>

                <template #cell(rollName)="data">
                  {{ data.item.rollName }}
                </template>

                <template
                  #cell(action)="data"
                  v-bind:class="{ 'selected-item': selectedItem != '' }"
                >
                  <div
                    style="padding: 0.5rem"
                    v-if="selectedItem === data.item.employeeId"
                  >
                    <a v-b-modal.modal-edit>
                      <!-- <b-icon icon="pencil" /> -->
                      <img
                        :src="imgEditIcon"
                        width="25"
                        height="25"
                      />
                      <b-modal id="modal-edit" hide-header centered @ok="okEdit()">
                        <div>{{errorMess.WA0102040001}}</div>
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
                        <div>{{errorMess.WA0102040002}}</div>
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
                <span @click="funcGetAllEmployee(inputData, meta.page - 1)" :class="{'disabled' : meta.page === 1 }">
                  <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </span>
                <span>{{ meta.page }}/{{ meta.maximumPage }}</span>
                <span @click="funcGetAllEmployee(inputData, meta.page + 1)" :class="{'disabled' : meta.page === meta.maximumPage }">
                  <i class="fa fa-chevron-right" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <!-- <div class="bottom-table">
                <b-button variant="primary" class="btn-next" href="/WA01010400">次へ</b-button>
            </div> -->
          </div>
          <WA01020410 v-if="isEdit" @changeEdit="isEdit = $event"></WA01020410>
        </b-card-text>
      </b-tab>
      <b-tab title="従業員登録" @click="changeTab('register')" :active="(tabSelected === 'register')">
        <b-card-text class="selected-content">
          <WA01020500></WA01020500>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WA01020500 from './WA01020500.vue';
import WA01020410 from '../edit-user/WA01020410.vue';
import moment from 'moment';
import errorMessage from '../../../validate/errormessage'

export default {
  data() {
    return {
      errorMess: errorMessage,
      imgManageMode: './static/img/btn_back_mode_select.svg',
      imgSearchIcon: './static/img/search-icon.svg',
      imgEditIcon: './static/img/pen.svg',
      imgDeleteIcon: './static/img/trash.svg',
      searchString: '',
      cols: [
        { key: "checked", label: "", class: "col-check" },
        { key: "branchName", label: "所属" },
        { key: "employeeName", label: "氏名", class: "col-name" },
        { key: "mailAddress", label: "メールアドレス" },
        { key: "rollName", label: "ロール" },
        { key: "action", label: "" , class: "col-spec" },
      ],
      selectedItem: '',
      isEdit: false,
      localEmployees: [],
      inputData: {},
      meta: {},
      tabSelected: '',
    };
  },
  components: {
    WA01020500,
    WA01020410,
  },
  computed: {
    ...mapState({
      employees: (state) => state.employees,
      consumers: (state) => state.consumers.all,
      files: (state) => state.files,
      // changePasswordState: (state) => state.changePasswordState
    }),
    
  },
  created() {
    this.getUserInfo().then(() => {
      this.inputData = { page: 1, maximumRecordsPerPage: 30, keywords: '%%' }
      this.funcGetAllEmployee(this.inputData, 1);
    })
    this.changePasswordState = false;
  },
  methods: {
    ...mapActions("employees", {
      getAllEmployees: "getAll",
      getUserInfo: "userInfo",
      deleteEmployee: "deleteEmployee",
    }),
    ...mapActions("files", {
      editItem: "editItem",
    //   deleteItem: "deleteItem"
    }),
    ...mapActions("alert", { 
      error: "error",
      clear: "clear",
    }),
    funcGetAllEmployee(input, page){
      input.page = page;
      this.getAllEmployees(input).then(() => {
        this.meta = this.employees.all.meta;
        this.localEmployees = this.employees.all.employee ? this.formatConsumerData(this.employees.all.employee) : []
      }).catch((err) => {
        this.localEmployees = [];
        this.meta = { page: 1, maximumPage: 1}
      });
    },
    deleteItem(employeeId) {
        if(employeeId !== this.selectedItem) {
            return
        }
    },
    onRowSelected(items) {
      if (!items[0]) {
        this.selectedItem = ''
      } else {
        this.selectedItem = items[0]? items[0].employeeId : null
      }
    },
    rowActive(item, type) {
      if (!item || type !== 'row') return;
      if(item.employeeId === this.selectedItem) return 'b-table-row-selected table-active'
    },
    selectedRow(item) {
        this.$refs.selectableTable.selectRow(this.employees.items.indexOf(item))
    },
    // Event click button 編集 in edit modal
    okEdit() {
      this.isEdit = true;
      this.$route.params.employeeId = this.selectedItem
    },
    // Event click button 編集 in delete modal
    okDelete() {
      this.deleteEmployee(this.selectedItem).then(() => {
        this.funcGetAllEmployee(this.inputData, this.meta.page)
      })
    },
    // Event click button search
    handleSearch() {
      this.inputData.keywords = '%' + this.searchString.trim() + '%'
      this.funcGetAllEmployee(this.inputData, 1)
      // this.localEmployees = this.employees.all.filter(item => { return item.employeeName.toLowerCase().includes(this.searchString.toLowerCase().trim())})
    },
    formatConsumerData(arrInput) {
      return arrInput.map((e) => {
        return {
          ...e,
          birthdate: moment(e.birthdate).format('yyyy/MM/DD')
        }
      })
    },
    changeTab(tab) {
      console.log(tab)
      // Set error message empty when change tab
      if (this.tabSelected !== tab) {
        this.clear();
      }
      this.tabSelected = tab;
    },
  },
  
};
</script>

<style>
.col-name {
  width: 20rem;
}

.inner .alert {
    white-space: pre-line;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: .5rem;
}

.button-manage-mode img {
  padding-right: 5px;
}

.div-back-button {
  margin-right: 18px;
  margin-bottom: 1px;
}

.div-back-button button {
  outline: unset;
}


.button-manage-mode {
  cursor: pointer;
  margin-bottom: 1px;
  margin-right: -5px;
  border: none;
}

.home-admin .nav-tabs .nav-link {
  width: 135px;
  text-align: center;
  background-color: #D8D8D8;
}

.home-admin .nav-link.active {
  color: #0091FF !important;
  background-color: #ffffff;
}

.home-admin .card-header {
  padding: 0.75rem 0.55rem 0.75rem 1.25rem;
  background-color: transparent;
  border: none;
}
.home-admin .card-body {
  padding: 0px;
}

.home-admin .form-control {
  height: calc(7vh - 20px);
  border-radius: 0.5rem;
}

.home-admin .input-group-text {
  border-radius: 0.5rem;
}

.selected-content {
  background-color: #ffffff;
  height: calc(75vh - 30px);
  width: calc(93vw - 27px);
}

.table-main {
  height: calc(40vh - 30px);
}

.title {
  text-align: center;
  font-size: 24px;
  padding-top: 0.75rem;
}

.home-admin .content-search {
  margin: auto;
  width: calc(60vh - 20px);
  padding-top: 3rem;
}

.card-header-tabs {
  width: calc(77vw - 15px);
}

.home-admin .content-search .input-group-append {
  border: 1px solid #ced4da;
  border-radius: 0 .5rem .5rem 0;
}

.home-admin .table-main {
  margin: 1.5rem 0.75rem 10px 0.75rem;
  border: 1px solid #000;
  /* border-top: none; */
  height: 397px;
  overflow: auto;
}

.home-admin .table-main .table.b-table>thead>tr>th {
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
  height: auto;
  border-radius: .5rem;
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
.pagination {
  height: calc(5vh - 10px);
}
/* .pagination{
  width:150px;
  height: 40px;
  border-bottom: 1px solid #dcdcdb;
  border-top: 1px solid #dcdcdb;
  margin:0px auto 5px auto;
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


@media (max-width: 1920px){
  .home-admin {
    margin-top: 0;
  }
  .home-admin .tab-pane .selected-content {
    margin: 0rem 2rem 1rem -13.5rem;
  }
    .home-admin .table-main {
    margin: 2rem 1.5rem 1rem 1.5rem;
  }
  .home-admin .form-control {
    height: 51px;
  }
  .card-header-tabs{
    margin-top: 1rem;
    margin-left: 3.7rem;
  }
  .account img {
    height: 50px;
  }
  /*.mw100 {
    max-width: 150%;
  } */
};

@media (max-width: 1755px) {
  .home-admin {
    margin-top: -3rem;
  }
  .home-admin .tab-pane .selected-content {
    margin: 0rem 2rem 1rem -8.5rem;
  }
    .home-admin .table-main {
    margin: 2rem 1.5rem 1rem 1.5rem;
  }
  .home-admin .form-control {
    height: 51px;
  }
  .card-header-tabs{
    margin-top: 1rem;
    margin-left: 7.1rem;
  }
  .account img {
    height: 45px;
  }
};

@media (max-width: 1600px) {
  .home-admin {
    margin-top: -3rem;
  }
  .home-admin .tab-pane .selected-content {
    margin: 0rem 2rem 1rem -4.5rem;
  }
    .home-admin .table-main {
    margin: 2rem 1.5rem 1rem 1.5rem;
  }
  .home-admin .form-control {
    height: 51px;
  }
  .card-header-tabs{
    margin-top: 1rem;
    margin-left: 9.5rem;
  }
  .account img {
    height: 45px;
  }
};

@media (max-width: 1469px) {
  .home-admin {
    margin-top: -3rem;
  }
  .home-admin .tab-pane .selected-content {
    margin: 0rem 2rem 1rem -0.5rem;
  }
    .home-admin .table-main {
    margin: 2rem 1.5rem 1rem 1.5rem;
  }
  .home-admin .form-control {
    height: 51px;
  }
  .card-header-tabs{
    margin-top: 1rem;
    margin-left: 12.2rem;
  }
  .account img {
    height: 45px;
  }
};

@media (max-width: 1325px) {
  .home-admin {
    margin-top: -3rem;
  }
  .home-admin .tab-pane .selected-content {
    margin: 0rem 2rem 1rem 3.2rem;
  }
    .home-admin .table-main {
    margin: 2rem 1.5rem 1rem 1.5rem;
  }
  .home-admin .form-control {
    height: 51px;
  }
  .card-header-tabs{
    margin-top: 1rem;
    margin-left: 14.5rem;
  }
  .account img {
    height: 45px;
  }
};

@media (max-width: 1024px) and (min-height: 768px) and (min-width: 769px) and (max-height: 1023px) {
  .home-admin {
    margin-top: -3rem;
  }
  .home-admin .tab-pane .selected-content {
    height: calc(90vh - 30px);
    width: calc(120vw - 27px);
    margin: 0rem 2rem 1rem 3rem;
    border-top: 1px solid rgba(0,0,0,.125);
  }
    .home-admin .table-main {
    height: 450px;
    width: 1130px;
    margin: 2rem 1rem 1rem 2.4rem;
    /* border-top: 1px solid rgba(0,0,0,.125); */
  }
  .home-admin .form-control {
    height: 51px;
  }
  .card-header-tabs{
    margin-left: -7.2rem;
    width: 1345px;
  }
  .account img {
    height: 40px;
    margin-right: -300px;
  }
  .mw100 {
    max-width: 150%;
  }
};

@media (max-width: 768px) and (min-height: 1024px) {
  .home-admin {
    margin-top: -3rem;
  }
  .home-admin .tab-pane .selected-content {
    height: calc(65vh - 30px);
    width: calc(131vw - 27px);
    margin: 0rem 2rem 1rem 2.4rem;
    border-top: 1px solid rgba(0,0,0,.125);
  }
  .home-admin .table-main {
    margin: 2rem 1rem 1rem 2rem;
  }
  .home-admin .content-search {
    padding-bottom: .6rem;
  }


  .card-header-tabs{
    margin-left: 26.3rem;
  }
  .account img {
    height: 40px;
    margin-right: -300px;
  }
  .mw100 {
    max-width: 200%;
  }
};

/* @media (max-width: 1327px) {
  .home-admin {
    width: 96%;
    margin: 0 auto;
  }
}; */
/* @media (max-width: 600px) {
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
  .home-admin .content-search {
    width: 375px;
  }
};

@media (max-width: 414px) {
  .home-admin .content-search {
    width: 305px;
  }
}; */



</style>

