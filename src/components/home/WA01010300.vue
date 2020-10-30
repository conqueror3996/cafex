<template>
  <div class="home-screen">
    <b-tabs card align="right">
      <template #tabs-start v-if="isAgent">
        <div class="div-back-button nav-item align-self-center">
          <button class="button-manage-mode" @click="$router.push({path:'/WA01020300'})"><img class="img-back-icon" :src="imgManageMode" alt=""></button>
        </div>
      </template>

      <b-tab :title="isAgent ? '顧客一覧' : '顧客選択' "  @click="changeTab('selection')" :active="(tabSelected === 'selection')">
        <b-card-text class="selected-content">
          <div v-if="!isEdit">
            <p class="title" v-if="!isAgent">顧客を選択して「次へ」を押してください</p>
            <div :class="!isAgent ? 'content-search' : 'content-search agent-search'">
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
                :fields="computedFields"
                :items="consumers"
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
                <template #cell(username)="data">
                  {{ data.item.consumerName }}
                </template>

                <template #cell(birthday)="data">
                  {{ data.item.birthdate }} ({{ data.item.age }})
                </template>

                <template #cell(phone)="data">
                  {{ data.item.phoneNumber1 }}
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
            <div class="bottom-table" v-if="!isAgent">
                <b-button variant="primary" class="btn-next" href="/WA01010400">次へ</b-button>
            </div>
          </div>
          <WA01010310 v-if="isEdit" @changeEdit="isEdit = $event"></WA01010310>
        </b-card-text>
      </b-tab>
      <b-tab title="顧客登録"  @click="changeTab('register')" :active="(tabSelected === 'register')" v-if="!isAgent">
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
import fileJson from '../../../static/file.json'

export default {
  props: {
    isAgent: {
      type: Boolean,
      default: false,
    }
  }, // remove if have info login
  data() {
    return {
      imgSearchIcon: './static/img/search-icon.png',
      imgEditIcon: './static/img/pen.svg',
      imgDeleteIcon: './static/img/trash.svg',
      imgManageMode: './static/img/btn_back_mode_select.svg',
      searchString: '',
      cols: [
        { key: "checked", label: "", class: "col-check" }, // column only display both agent and not
        { key: "username", label: "氏名" },
        { key: "birthday", label: "年齢" },
        { key: "phone", label: "電話番号1" },
        { key: "memo", label: "メモ", isAgentCols: false }, // column only display if not agent
        { key: "salesperson", label: "担当営業員", isAgentCols: true }, // column only display if is agent
        { key: "belonging", label: "所属", isAgentCols: true },
        { key: "action", label: "" , class: "col-spec", isAgentCols: false },
      ],
      selectedItem: '',
      isEdit: false,
      users: {
        items: [{
          consumerId: '4565645561',
          consumerName: 'Khang',
          consumerNameKana: '',
          age: '24',
          birthdate: '1996/03/09',
          postalCode: '3424',
          address: '32/2',
          phoneNumber1: '19001560',
          phoneNumber2: '19001560',
          consumerMemo: 'manhkhang@vn-cubesystem.com'
        },]
      },
      tabSelected: '',
      consumers: []
    };
  },
  components: {
    WA01010320,
    WA01010310,
  },
  computed: {
    ...mapState({
      employees: (state) => state.employees,
      // consumers: (state) => state.consumers.all,
      files: (state) => state.files,
      // changePasswordState: (state) => state.changePasswordState
    }),
    computedFields() {
      if(!this.isAgent)
        return this.cols.filter(field => !field.hasOwnProperty('isAgentCols') || !field.isAgentCols);
      else
        return this.cols.filter(field => !field.hasOwnProperty('isAgentCols') || field.isAgentCols);;
    }
  },
  created() {
    this.getAllConsumer();
    this.changePasswordState = false
    // console.log(this.$router)
    this.consumers = fileJson.consumer
    console.log(fileJson)
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
    deleteItem(consumerId) {
        if(consumerId !== this.selectedItem) {
            return
        }
        console.log('success')
    },
    onRowSelected(items) {
      console.log(items)
        this.selectedItem = items[0]? items[0].consumerId : null
    },
    rowActive(item, type) {
      if (!item || type !== 'row') return;
      if(item.consumerId === this.selectedItem) return 'b-table-row-selected table-active'
    },
    selectedRow(item) {
      this.$refs.selectableTable.selectRow(this.consumers.indexOf(item))
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

.agent-search {
  padding-top: 3rem;
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

