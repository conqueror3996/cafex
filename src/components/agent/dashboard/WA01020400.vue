<template>
  <div class="home-screen">
    <b-tabs card align="right">
      <template #tabs-start>
        <li role="presentation" class="nav-item align-self-center">
          <button style="border: none;" @click="ok()"><img :src="imgManageMode" alt=""></button>
        </li>
      </template>
      <b-tab title="従業員一覧">
        <b-card-text class="selected-content">
          <div v-if="!isEdit">
            <p class="title">顧客を選択して「次へ」を押してください</p>
            <div class="content-search">
              <b-input-group>
                <b-form-input
                  type="text"
                  placeholder="従業員名を入力して検索"
                  class="border-right-0"
                  maxlength=38
                  v-model="searchString"
                  autofocus></b-form-input>
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
                <template #cell(company)="data">
                  {{ data.item.consumer_name_kana }}
                </template>

                <template #cell(username)="data">
                  {{ data.item.consumer_name_kana }}
                </template>

                <!-- <template #cell(phone)="data">
                  {{ data.item.phone_number_1 }}
                </template> -->

                <template #cell(mailaddress)="data">
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
                        <div>選択した営業員情報を編集しますか？</div>
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
                        <div>選択した営業員にはお客様情報が紐付いています。削除しますか？</div>
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

export default {
  data() {
    return {
      imgManageMode: './static/img/button_manage_mode.png',
      imgSearchIcon: './static/img/search-icon.png',
      imgEditIcon: './static/img/edit-icon.png',
      imgDeleteIcon: './static/img/delete-icon.png',
      searchString: '',
      cols: [
        { key: "checked", label: "", class: "col-check" },
        { key: "username", label: "氏名" },
        { key: "company", label: "所属" },
        { key: "mailaddress", label: "メールアドレス" },
        { key: "roll", label: "ロール" },

        // { key: "birthday", label: "年齢" },
        // { key: "phone", label: "電話番号1" },
        // { key: "memo", label: "メモ" },
        { key: "action", label: "" , class: "col-spec" },
      ],
      selectedItem: '',
      isEdit: false,
    };
  },
  components: {
    WA01020500,
    WA01020410,
  },
  computed: {
    ...mapState({
      employee: (state) => state.employee,
      consumers: (state) => state.consumers.all,
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
      
    }
  },
  
};
</script>

<style>
.home-screen .nav-tabs .nav-link {
  width: 135px;
  text-align: center;
}

.home-screen .nav-link.active {
  color: #007bff !important;
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

