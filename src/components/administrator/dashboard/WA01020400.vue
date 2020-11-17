<template>
  <div class="home-admin">
    <b-tabs card align="right">
      <template #tabs-start>
        <div class="div-back-button nav-item align-self-center">
          <button class="button-manage-mode" @click="$router.push({path:'/WA01020300'})"><img class="img-back-icon" :src="imgManageMode" alt=""></button>
        </div>
      </template>
      <b-tab title="従業員一覧">
        <b-card-text class="selected-content">
          <div v-if="!isEdit">
            <!-- <p style="font-family: 'HiraginoSan-W3'" class="title">顧客を選択して「次へ」を押してください</p> -->
            <div class="content-search">
              <b-form @submit.stop.prevent="handleSearch">
              <b-input-group>
                <b-form-input
                  type="text"
                  placeholder="従業員名を入力して検索"
                  class="border-right-0"
                  maxlength=38
                  v-model="searchString"
                  style="font-family: 'HiraginoSan-W3'"
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
            <div class="table-main">
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
                        <div style="font-family: 'HiraginoSan-W3'">{{errorMess.WA0102040001}}</div>
                        <template #modal-footer="{ ok, cancel }">
                          <div>
                            <b-button
                              size="sm"
                              variant="primary"
                              @click="ok()"
                              style="font-family: 'HiraginoSan-W3'"
                            >
                              編集
                            </b-button>
                            <b-button
                              size="sm"
                              variant="danger"
                              @click="cancel()"
                              style="font-family: 'HiraginoSan-W3'"
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
                        <div style="font-family: 'HiraginoSan-W3'">{{errorMess.WA0102040002}}</div>
                        <template #modal-footer="{ ok, cancel }">
                          <div>
                            <b-button
                              size="sm"
                              variant="primary"
                              @click="ok()"
                              style="font-family: 'HiraginoSan-W3'"
                            >
                              削除
                            </b-button>
                            <b-button
                              size="sm"
                              variant="danger"
                              @click="cancel()"
                              style="font-family: 'HiraginoSan-W3'"
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
            <!-- <div class="bottom-table">
                <b-button variant="primary" class="btn-next" href="/WA01010400">次へ</b-button>
            </div> -->
          </div>
          <WA01020410 v-if="isEdit" @changeEdit="isEdit = $event"></WA01020410>
        </b-card-text>
      </b-tab>
      <b-tab title="従業員登録">
        <b-card-text class="selected-content">
          <WA01020500></WA01020500>
        </b-card-text>
      </b-tab>
    </b-tabs>
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
        { key: "employeeName", label: "氏名", class: "col-name" },
        { key: "branchName", label: "所属" },
        { key: "mailAddress", label: "メールアドレス" },
        { key: "rollName", label: "ロール" },
        { key: "action", label: "" , class: "col-spec" },
      ],
      selectedItem: '',
      isEdit: false,
      localEmployees: [],
      inputData: {}
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
      this.inputData = { page: 1, maximumRecordsPerPage: 40 }
      this.getAllEmployees(this.inputData).then(() => {
        this.localEmployees = this.employees.all ? this.formatConsumerData(this.employees.all) : []
      });
    })
    this.changePasswordState = false
  },
  methods: {
    ...mapActions("employees", {
      getAllEmployees: "getAll",
      getUserInfo: "userInfo"
    }),
    ...mapActions("files", {
      editItem: "editItem",
    //   deleteItem: "deleteItem"
    }),
    deleteItem(employeeId) {
        if(employeeId !== this.selectedItem) {
            return
        }
        console.log('success')
    },
    onRowSelected(items) {
        this.selectedItem = items[0]? items[0].employeeId : null
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
      console.log("delete success");
    },
    // Event click button search
    handleSearch() {
      this.localEmployees = this.employees.all.filter(item => { return item.employeeName.toLowerCase().includes(this.searchString.toLowerCase().trim())})
    },
    formatConsumerData(arrInput) {
      return arrInput.map((e) => {
        return {
          ...e,
          birthdate: moment(e.birthdate).format('yyyy/MM/DD')
        }
      })
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
}
.home-admin .card-body {
  padding: 0px;
}

.home-admin .form-control {
  border-radius: 0.5rem;
}

.home-admin .input-group-text {
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

.home-admin .content-search {
  margin: auto;
  width: 495px;
  padding-top: 3rem;
}

.home-admin .content-search .input-group-append {
  border: 1px solid #ced4da;
  border-radius: 0 .5rem .5rem 0;
}

.home-admin .table-main {
  margin: 1.5rem 0.75rem;
  border: 1px solid;
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

@media (max-width: 1327px) {
  .home-admin {
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
  .home-admin .content-search {
    width: 375px;
  }
};

@media (max-width: 414px) {
  .home-admin .content-search {
    width: 305px;
  }
};

</style>

