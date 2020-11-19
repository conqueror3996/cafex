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
        <b-table sticky-header :fields="userCols" :items="consumer">
          <template #cell(consumerName)="data">
            {{ data.item.consumerName }}
          </template>
          <template #cell(age)="data">
            {{ data.item.birthdate }} {{ data.item.age ? `(${data.item.age})` : null}}
          </template>
          <template #cell(phoneNumber1)="data">
            {{ data.item.phoneNumber1 }}
          </template>
          <template #cell(consumerMemo)="data">
            {{ data.item.consumerMemo }}
          </template>
        </b-table>
      </div>
    </div>
    <div class="detail">
      <div class="file-content">
        <div class="file-table">
          <b-table hover :fields="fileCols" select-mode="single" selectable :items="files" @row-hovered="rowHovered" @row-unhovered="rowUnhovered" @row-selected="rowSelected">
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
              <div class="action-link" v-if="hoveredItem === data.item.fileId || selectedItem == data.item.fileId">
                <a v-b-modal.modal-delete @click="openModal(data.item)">
                  <img :src="imgDeleteIcon" width="25" height="28" />
                </a>
              </div>
                  <b-modal
                    id="modal-delete"
                    hide-header
                    centered
                    @ok="handledeleteFile(data.item)"
                    v-if="modalItem === data.item.fileId"
                    @close="closeModal()"
                  >
                    <div>{{errorMess.WA0101050002}}</div>
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
          <label variant="primary" :class="isUploading ? 'btn btn-upload disabled' : 'btn btn-upload'" for="file" >
            <img
              class="img-btn"
              :src="imgUploadIcon"
            />
          </label>
          <input type="file" value="ファイルアップロード" id="file" @change="uploadFile" accept=".pdf" :disabled="isUploading" />
           <!-- multiple="multiple" -->
           <img v-show="isUploading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </div>
      </div>
      <div class="panel"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import validate from '../../validate/validate.js';
import errorMessage from '../../validate/errormessage';
import moment from 'moment';
import { auth } from '../../_helpers';

export default {
  data() {
    return {
      errorMess: errorMessage,
      imgDeleteIcon: './static/img/trash.svg',
      imgUploadIcon: './static/img/btn_file_upload.svg',
      imgBackIcon: './static/img/btn_back_mode_select.svg',
      userCols: [
        { key: "consumerName", label: "氏名" },
        { key: "age", label: "生年月日（年齢）" },
        { key: "phoneNumber1", label: "電話番号1" },
        { key: "consumerMemo", label: "メモ" },
      ],
      fileCols: [
        { key: "fileName", label: "ファイル名", class: "col-medium" },
        { key: "fileTotalPages", label: "総ページ数", class: "col-small" },
        { key: "fileRegistrationDate", label: "登録日時", class: "col-medium" },
        { key: "action", label: "", class: "col-action" },
      ],
      consumer:[],
      hoveredItem: '',
      selectedItem: '',
      modalItem: '',
      files: [],
      localConsumerId: '',
      isUploading: false
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
    this.initInfo()
    this.getUserInfo().then(() => {
      return this.getConsumerByID(this.localConsumerId).then(() => {
        this.consumer = [this.detail.item]
        this.consumer[0].birthdate = moment(this.consumer[0].birthday).format('yyyy/MM/DD');
        console.log("this.consumer", this.consumer)
      })
    }).then(() => {
        this.getAllFile({employeeId: this.employees.employee.employeeId, consumerId : this.consumer[0].consumerId, page: 1, maximumRecordsPerPage: 20}).then((res) => {
          this.files = this.formatFileData(res.data.file);
      });
    })
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
    ...mapActions("consumers", {
        getConsumerByID: "getConsumerByID",
    }),
    initInfo () {
      this.localConsumerId = localStorage.getItem('consumerId')
    },
    handledeleteFile(file) {
      this.deleteFile(file).then(() => {
        this.getAllFile({employeeId: this.employees.employee.employeeId, consumerId : this.consumer[0].consumerId, page: 1, maximumRecordsPerPage: 20}).then((res) => {
          this.files = res.data.file;
        });
      })
    },
    rowHovered(item) {
        this.hoveredItem = item.fileId;
    },
    rowSelected(item) {
      if(item.length > 0) {
        this.selectedItem = item[0].fileId;
      }
      else {
        this.selectedItem = '';
      }
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
    formatFileData(arrInput) {
      return arrInput.map((e) => {
        return {
          ...e,
          fileRegistrationDate: auth.formatDateTime(e.fileRegistrationDate, 'yyyy/MM/DD hh:mm')
        }
      })
    },
    uploadFile(event) {
      const files = event.target.files;
      let errorMessage = '';
      if(files.length < 1) return;
      this.isUploading = true;
      for (var i = 0; i < files.length; i++)
      {
        const filename = files[i].name;
        const filetype = filename.substring(filename.length - 3, filename.length);
        if(filetype !== 'pdf') {
          errorMessage = validate.getMessageErrorFromCode("S02014");
          break;
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
          formData.append('consumerId', this.consumer[0].consumerId)
          formData.append('file', event.target.files[0])
          this.addFile({ fileType: "0001", data: formData}).then(() => {
            this.getAllFile({employeeId: this.employees.employee.employeeId, consumerId : this.consumer[0].consumerId, page: 1, maximumRecordsPerPage: 20}).then((res) => {
              this.isUploading = false;
              this.files = res.data.file;
            })
            .catch(() => {
              this.isUploading = false;
            });
          })
      }
    }
  },
};
</script>

<style>
.manage-file-conent {
  max-width: 1344px;
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

.manage-file-conent .file-table .table td,
.manage-file-conent .file-table .table th {
  padding: 0.45rem .75rem;
}

.manage-file-conent .file-table .table td.col-action,
.manage-file-conent .file-table .table th.col-action  {
    padding: unset;
    width: 50px;
}
.manage-file-conent .file-table .table td.col-small,
.manage-file-conent .file-table .table th.col-small {
    width: 20%;
}

.manage-file-conent .file-table .table td.col-medium,
.manage-file-conent .file-table .table th.col-medium {
    width: 30%;
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
  height: auto;
  overflow: auto;
}
.manage-file-conent .info-table .table {
  margin-bottom: unset;
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

.manage-file-conent .file-footer {
  margin-top: 1.75rem;
  text-align: center;
}

.manage-file-conent .btn-upload {
  border-radius: 0.5rem;
  color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.manage-file-conent .content-btn {
  float: left;
  padding-left: 0.25rem;
  padding-top: 0.75rem;
}

.manage-file-conent .img-btn {
  float: right;
  margin-right: 0.5rem;
}

.manage-file-conent input[type="file"] {
	display: none;
}

.manage-file-conent .panel {
  width: 466.43px;
  height: 490px;
  background-color: #ececec;
  border: 2px solid #e2e3e7;
  border-radius: 0.6rem;
  margin: auto;
}

@media (max-width: 1366px) {
  .file-table {
    height: calc(40vh - 20px);
  }
  .manage-file-conent .panel {
    height: calc(50vh - 15px);
    margin: 1.5rem auto;
  }
  .detail {
    height: calc(55vh - 10px);
  }
  .manage-file-conent .file-footer {
    margin-top: .5rem;
  }
}

@media (max-width: 1327px) {
  .manage-file-conent {
    width: 96%;
  }
  
  .manage-file-conent .file-content {
    width: 65%;
  }
  .manage-file-conent .file-table {
    width: 100%;
    border: 1px solid #97989c;
    overflow: auto;
  }
  .manage-file-conent .panel {
    width: 28%;
    background-color: #ececec;
    border: 2px solid #bebfc2;
    border-radius: 0.6rem;
    margin: 1.5rem auto;
  }
}

@media (max-width: 1024px) {
  .manage-file-conent .file-table {
    height: calc(40vh - 20px);
  }
  .manage-file-conent .file-content {
    width: 65%;
  }
  .manage-file-conent .panel {
    width: 28%;
    height: calc(50vh);
    margin: 1.5rem auto;
  }
  .detail {
    height: calc(60vh - 20px);
  }
  .manage-file-conent .file-footer {
    margin-top: 1.5rem;
  }
}
</style>
