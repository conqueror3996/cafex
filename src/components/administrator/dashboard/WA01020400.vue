<template>
<div>
  <div v-if="!isEdit" id="WA01020400" class="clearfix">
    <div class="box-search">
      <div class="input-group mb-3">
        <input type="text" class="form-control txt-search" placeholder="従業員名を入力して検索">
        <div class="input-group-append">
          <button class="btn btn-search" type="button"><img :src="imgSearchIcon" width="30" height="30"></button>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
          <thead>
            <tr>
              <th></th>
              <th>所属</th>
              <th>氏名</th>
              <th>メールアドレス</th>
              <th>ロール</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in localEmployees" :key="item.employeeId" :id="item.employeeId" @click="onRowSelected(item, index)" :class="{'active': (item.employeeId === selectedItem && item.checked)}">
              <td>
                <input
                  type="radio"
                  name="checked"
                  :checked="item.employeeId === selectedItem && item.checked"
                /> 
              </td>
              <td>{{ item.branchName }}</td>
              <td>{{ item.employeeName }}</td>
              <td>{{ item.mailAddress }}</td>
              <td>{{ item.rollName }}</td>
              <td>
                <a class="action-row" v-b-modal.modal-edit>
                  <img
                    :src="imgEditIcon"
                    width="25"
                    height="25"
                  />
                  
                </a>
                <a class="action-row" v-b-modal.modal-delete>
                  <img
                    :src="imgDeleteIcon"
                    width="25"
                    height="25"
                  />
                  
                </a>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
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
    
  </div>
  <WA01020410 v-if="isEdit" @changeEdit="isEdit = $event"></WA01020410>
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
      isActive: false,
      isChecked: false
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
    funcGetAllEmployee(input, page){
      input.page = page;
      this.getAllEmployees(input).then(() => {
        this.meta = this.employees.all.meta;
        this.localEmployees = this.employees.all.employee ? this.formatConsumerData(this.employees.all.employee) : []
        console.log(this.localEmployees)
        this.localEmployees = this.localEmployees.map((e) => {
          const newArr = {...e, checked: false}
          return newArr
        })
        console.log(this.localEmployees)
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
    onRowSelected(employee, index) {
      this.selectedItem = employee.employeeId
      const checked = !employee.checked
      this.localEmployees[index].checked = checked
    },
    rowActive(item, type) {
      if (!item || type !== 'row') return;
      if(item.employeeId === this.selectedItem) return 'b-table-row-selected table-active'
    },
    selectedRow(employeeId) {
        //this.$refs.selectableTable.selectRow(this.employees.items.indexOf(item))
        if(employeeId === this.selectedItem){
          var element = document.getElementById(item.employeeId);
          element.classList.add("acitve");
        }
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
    afterCommit(event){
      this.funcGetAllEmployee(this.inputData, 1);
      return event;
    }
  },
  
};
</script>

<style>
#WA01020400{background: #fff;max-width:1440px;margin:auto;padding:35px;}
</style>

