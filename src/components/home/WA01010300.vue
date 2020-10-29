<template>
  <div class="home-screen">
    <b-tabs card align="right">
      <b-tab title="顧客選択"  @click="changeTab('selection')" :active="(tabSelected === 'selection')">
        <b-card-text class="selected-content">
          <div v-if="!isEdit">
            <p class="title">顧客を選択して「次へ」を押してください</p>
            <div class="content-search">
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
                  <b-button class="bg-transparent border-0" variant="primary" @click="handleSearch">
                    <img :src="imgSearchIcon" width="30" height="30">
                    <!-- <b-icon icon="search" /> -->
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </div>
            <div class="table-main">
              <b-table
                ref="selectableTable"
                hover
                :responsive="true"
                :fields="cols"
                :items="users.items"
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
                      :value="data.item.consumer_id"
                      @click="selectedRow(data.item)"
                    />
                  </div>
                    
                </template>
                <template #cell(username)="data">
                  {{ data.item.consumer_name }}
                </template>

                <template #cell(birthday)="data">
                  {{ data.item.company_id }}
                </template>

                <template #cell(phone)="data">
                  {{ data.item.phone_number_1 }}
                </template>

                <template #cell(memo)="data">
                  {{ data.item.mail_address }}
                </template>

                <template
                  #cell(action)="data"
                  v-bind:class="{ 'selected-item': selectedItem != '' }"
                >
                  <div
                    style="padding: 0.5rem"
                    v-if="selectedItem === data.item.consumer_id"
                  >
                    <a v-b-modal.modal-edit>
                      <!-- <b-icon icon="pencil" /> -->
                      <img
                        :src="imgEditIcon"
                        width="25"
                        height="25"
                      />
                      <b-modal id="modal-edit" hide-header centered @ok="okEdit()">
                        <div>選択したお客様情報を編集しますか？</div>
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
                        <div>選択したお客様情報を削除しますか？</div>
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
            <div class="bottom-table">
                <b-button variant="primary" class="btn-next" href="/WA01010400">次へ</b-button>
            </div>
          </div>
          <WA01010310 v-if="isEdit" @changeEdit="isEdit = $event"></WA01010310>
        </b-card-text>
      </b-tab>
      <b-tab title="顧客登録"  @click="changeTab('register')" :active="(tabSelected === 'register')">
        <b-card-text class="selected-content">
          <WA01010320></WA01010320>
        </b-card-text>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WA01010320 from './WA01010320.vue';
import WA01010310 from '../edit-user/WA01010310.vue';

export default {
  data() {
    return {
      imgSearchIcon: './static/img/search-icon.png',
      imgEditIcon: './static/img/pen.svg',
      imgDeleteIcon: './static/img/trash.svg',
      searchString: '',
      cols: [
        { key: "checked", label: "", class: "col-check" },
        { key: "username", label: "氏名" },
        { key: "birthday", label: "年齢" },
        { key: "phone", label: "電話番号1" },
        { key: "memo", label: "メモ" },
        { key: "action", label: "" , class: "col-spec" },
      ],
      selectedItem: '',
      isEdit: false,
      users: {
        items: [{
          fullname: 'Khang',
                namekana: '',
                age: '24',
                birthday: '1996/03/09',
                postalcode: '3424',
                address: '32/2',
                phone1: '19001560',
                phone2: '19001560',
                memo: 'manhkhang@vn-cubesystem.com'
        },]
      },
      tabSelected: '',
    };
  },
  components: {
    WA01010320,
    WA01010310,
  },
  computed: {
    ...mapState({
      employees: (state) => state.employees,
      //consumers: (state) => state.consumers.all,
      files: (state) => state.files,
      // changePasswordState: (state) => state.changePasswordState
      
    }),
  },
  created() {
    this.getAllConsumer();
    this.changePasswordState = false
    console.log(this.users)
    // console.log(this.changePasswordState)
  },
  methods: {
    ...mapActions("consumers", {
      getAllConsumer: "getAll",
      deleteUser: "delete",
    //   deleteItem: "deleteItem"
    }),
    ...mapActions("files", {
      editItem: "editItem",
    //   deleteItem: "deleteItem"
    }),
    ...mapActions("alert", { error: "error" }),
    deleteItem(consumer_id) {
        if(consumer_id !== this.selectedItem) {
            return
        }
        console.log('success')
    },
    onRowSelected(items) {
        this.selectedItem = items[0]? items[0].consumer_id : null
    },
    rowActive(item, type) {
      if (!item || type !== 'row') return;
      if(item.consumer_id === this.selectedItem) return 'b-table-row-selected table-active'
    },
    selectedRow(item) {
        this.$refs.selectableTable.selectRow(this.users.items.indexOf(item))
    },
    // Event click button 編集 in edit modal
    okEdit() {
      this.isEdit = true;
    },
    // Event click button 編集 in delete modal
    okDelete() {
      console.log("delete success");
    },
    // Event click button search
    handleSearch() {
      
    },
    changeTab(tab) {
      // Set error message empty when change tab
      if (this.tabSelected !== tab) {
        this.error('');
      }
      this.tabSelected = tab;
    }
  },
  
};
</script>

<style>
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

.content-search {
  margin: auto;
  width: 495px;
}

.content-search .input-group-append {
  border: 1px solid #ced4da;
  border-radius: 0 .5rem .5rem 0;
}

.table-main {
  margin: 1.5rem 0.75rem;
  border: 1px solid;
  height: 397px;
  overflow: auto;
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

