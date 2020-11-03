<template>
  <div class="manage-file-conent">
    <div class="info">
      <div class="info-title">
        <p>お客様情報</p>
        <b-button variant="primary" @click="$router.push('/WA01010400')">
          <img :src="imgBackIcon" />
        </b-button>
      </div>
      <div class="info-table">
        <b-table :fields="userCols" :items="user">
          <template #cell(fullname)="data">
            {{ data.item.fullname }}
          </template>
          <template #cell(age)="data">
            {{ data.item.age }}
          </template>
          <template #cell(phone1)="data">
            {{ data.item.phone1 }}
          </template>
          <template #cell(memo)="data">
            {{ data.item.memo }}
          </template>
        </b-table>
      </div>
    </div>
    <div class="detail">
      <div class="file-content">
        <div class="file-table">
          <b-table hover :fields="fileCols" :items="files" @row-hovered="rowHovered" @row-unhovered="rowUnhovered">
            <template #cell(fileName)="data">
              {{ data.item.fileName }}
            </template>
            <template #cell(fileTotalPages)="data">
              {{ data.item.fileTotalPages }}
            </template>
            <template #cell(fileRegistrationDate)="data">
              {{ data.item.fileRegistrationDate }}
            </template>
            <template #cell(action)="data">
              <div class="action-link" v-if="hoveredItem === data.item.fileId">
                <a v-b-modal.modal-delete @click="openModal(data.item)">
                  <img :src="imgDeleteIcon" width="25" height="28" />
                </a>
              </div>
                  <b-modal
                    id="modal-delete"
                    hide-header
                    centered
                    @ok="deleteFile(data.item)"
                    v-if="modalItem === data.item.fileId"
                    @close="closeModal()"
                  >
                    <div>選択したファイルを削除してもよろしいでしょうか</div>
                    <template #modal-footer="{ ok, cancel }">
                      <div>
                        <b-button size="sm" variant="primary" @click="ok()">
                          削除
                        </b-button>
                        <b-button size="sm" variant="danger" @click="cancel()">
                          キャンセル
                        </b-button>
                      </div>
                    </template>
                  </b-modal>
            </template>
          </b-table>
        </div>
        <div class="file-footer">
          <label variant="primary" class="btn btn-upload" for="file">
            <img
              class="img-btn"
              :src="imgUploadIcon"
            />
          </label>
          <input type="file" value="ファイルアップロード" id="file" @change="uploadFile" accept=".pdf" />
           <!-- multiple="multiple" -->
        </div>
      </div>
      <div class="panel"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import validate from '../../validate/validate.js';

export default {
  data() {
    return {
      imgDeleteIcon: './static/img/trash.svg',
      imgUploadIcon: './static/img/btn_file_upload.svg',
      imgBackIcon: './static/img/btn_back_mode_select.svg',
      userCols: [
        { key: "fullname", label: "氏名" },
        { key: "age", label: "生年月日（年齢）" },
        { key: "phone1", label: "電話番号1" },
        { key: "memo", label: "メモ" },
      ],
      fileCols: [
        { key: "fileName", label: "ファイル名" },
        { key: "fileTotalPages", label: "総ページ数" },
        { key: "fileRegistrationDate", label: "登録日時" },
        { key: "action", label: "", tdClass: "col-action" },
      ],
      user: [
        {
          user_id: "123",
          user_name: "test",
          firstName: "tertet",
          lastName: "demo",
        },
      ],
      hoveredItem: '',
      modalItem: '',
      files: [],
    };
  },
  computed: {
    ...mapState({
      detail: (state) => state.consumers.single
    }),
    ...mapState({
      employees: (state) => state.employees,
    }),
  },
  created() {
    this.getUserInfo().then(() => {
      console.log("this.employees", this.employees)
      this.getAllFile({employeeId: this.employees.employee.employeeId, consumerId :'02f68b58f74d419da790892c784801e3', page: 1, maximumRecordsPerPage: 20}).then((res) => {
        
        console.log("res",res)
        this.files = res.data.file;
      });
    })
    this.user[0] = this.detail 
  },
  methods: {
    ...mapActions("alert", {
        error: "error",
    }),
    ...mapActions("files", {
        getAllFile: "getAllFile",
        addFile: "addFile",
        deleteFile: "deleteFile"
    }),
    ...mapActions("employees", {
      getUserInfo: "userInfo",
    }),
    deleteFile(file) {
      console.log("file", file)
      // this.deleteFile(file.fileType, file.fileId).then(() => {

      // })
    },
    rowHovered(item) {
        this.hoveredItem = item.fileId;
    },
    rowUnhovered() {
        this.hoveredItem = '';
    },
    openModal(item) {
        this.modalItem = item.fileId;
    },
    closeModal() {
        this.modalItem = '';
    },
    uploadFile(event) {
      const files = event.target.files;
      let errorMessage = '';
      for (var i = 0; i < files.length; i++)
      {
        const filename = files[i].name;
        const filetype = filename.substring(filename.length - 3, filename.length);
        if(filetype !== 'pdf') {
          alert("unsupport file type");
          return;
        }
        if(files[i].size/1024/1024 > 100)
        {
          errorMessage = validate.getMessageErrorFromCode("S02011");
          break;
        }
      }
      
      if(errorMessage !== '') {
          this.error(errorMessage)
      } else {
          this.error('')
          let formData = new FormData();
          formData.append('file', event.target.files[0])
          this.addFile("pdf", formData).then()
      }
    }
  },
};
</script>

<style>
.manage-file-conent {
  margin: 0 auto;
}
/* .manage-file-conent {
  display: flex;
  justify-content: left;
  flex-direction: column;
  width: 1344px;
} */
/* .table {
  margin-bottom: unset;
}

.table thead th {
  border-bottom: 2px solid #9d9fa0;
  font-weight: normal;
} */

.manage-file-conent .table td,
.manage-file-conent .table th {
  border-top: inherit !important;
  padding: 0.45rem 2rem;
}

.manage-file-conent .table td.col-action {
    padding: unset;
}
.manage-file-conent .table th.col-action {
    padding: unset;
}

.manage-file-conent .table .col-action div.action-link{
  width: 50%;
  float:right;
}
/* .action-link {
    display: none;
} */
/* 
.table-hover tbody tr:hover {
    background-color: rgba(203, 245, 229, 0.4);
} */

/* .table-hover tbody tr:hover .action-link {
    display: unset;
} */

.modal-content {
  width: 501px;
  height: 149px;
  margin: 0 auto;
}

.modal-body {
  text-align: center;
  font-size: 18px !important;
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
}

.manage-file-conent .info {
  margin: 0 auto;
  width: 100%;
}

.manage-file-conent .info-title {
  width: 100%;
  display: inline-block;
}

.manage-file-conent .info-title p {
  text-align: left;
  float: left;
  clear: right;
  margin-bottom: 0px;
  padding-top: 1.25rem;
}

.manage-file-conent .info-title button {
  float: right;
  border-radius: .7rem;
  padding: 0;
  border: none;
}

/* .info-title button:hover {
    color: #fff;
    background-color: #0091FF;
    border-color: #9ed9d3;
}

.info-title button.focus, .info-title button:focus {
    box-shadow: 0 0 0 0.2rem rgba(158, 217, 211,.5);
}

.info-title button:not(:disabled):not(.disabled).active, .info-title button:not(:disabled):not(.disabled):active {
    color: #fff;
    background-color: #0091FF;
    border-color: #9ed9d3;
} */

.manage-file-conent .info-table {
  background-color: #ffffff;
  width: 100%;
  border: 1px solid #97989c;
  border-radius: 0.5rem;
  height: 77px;
}

.detail {
  display: flex;
  flex-direction: row;
  margin: 1rem auto auto 0;
  background-color: #ffffff;
  border-radius: 0.5rem;
  width: 100%;
  height: 538px;
  border: 2px solid #cacaca;
}

.file-content {
  margin: 1.5rem;
}

.file-table {
  width: 739px;
  height: 401px;
  border: 1px solid #97989c;
  overflow: auto;
}
.file-table table {
  position: sticky;
}
.file-table .table.b-table>thead>tr>th {
  background-color: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
}

.file-footer {
  margin-top: 1.75rem;
  text-align: center;
}

.btn-upload {
  border-radius: 0.5rem;
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.content-btn {
  float: left;
  padding-left: 0.25rem;
  padding-top: 0.75rem;
}

.img-btn {
  float: right;
  margin-right: 0.5rem;
}

input[type="file"] {
	display: none;
}

.panel {
  width: 466.43px;
  height: 490px;
  background-color: #ececec;
  border: 2px solid #e2e3e7;
  border-radius: 0.6rem;
  margin: auto;
}

@media (max-width: 1327px) {
  .manage-file-conent {
    width: 96%;
  }
  
  .file-content {
    width: 70%;
  }
  .file-table {
    width: 100%;
    height: 401px;
    border: 1px solid #97989c;
    overflow: auto;
  }
  .panel {
    width: 30%;
    height: 490px;
    background-color: #d2d4d9;
    border: 2px solid #bebfc2;
    border-radius: 0.6rem;
    margin: 2rem;
  }
}
</style>
