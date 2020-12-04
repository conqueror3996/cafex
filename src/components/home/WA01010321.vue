<template>
  <div>
    <b-modal
        id="modal-reg"
        hide-header
        centered
        @ok="handleReg()"
        @hide="handleHide()"
        cancel-disabled
        size="lg"
        :visible="showModal"
        :hide-backdrop="true"
      >
        <div class="confirm-info">
          <p>氏名：{{ data.consumerName }}</p>
          <p>氏名（カナ）：{{ data.consumerNameKana }}</p>
          <p>生年月日：{{ data.birthdate ? formatDateItem(data.birthdate) : '' }}</p>
          <p>電話番号１：{{ data.phoneNumber1 }}</p>
          <p>電話番号２：{{ data.phoneNumber2 }}</p>
          <p>メールアドレス：{{ data.mailAddress }}</p>
          <p>郵便番号：{{ data.postalCode }}</p>
          <p>住所：{{ data.address }}</p>
          <p>メモ：{{ data.consumerMemo }}</p>
        </div>
        <template #modal-footer="{ ok, cancel }">
          <div>
            <b-button size="sm" variant="primary" @click="ok()">
              登録
            </b-button>
            
            <b-button size="sm" variant="danger" @click="cancel()">
              キャンセル
            </b-button>
          </div>
        </template>
      </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Consumer } from '../../models';
import { commonFunctions } from '../../common';

export default {
    props: {
        showModal: Boolean,
        data: {},
        backHome: Function,
    },
    created() {
      
    },
    methods: {
      ...mapActions("consumers", {
            addConsumer: "addConsumer",
      }),
      handleReg() {
        this.addConsumer(this.data).then(() => {
          this.refreshData()
          this.backHome();
        });
        
      },
      handleHide() {
          this.$emit("changeShowModal", false)
      },
      formatDateItem(input) {
        return commonFunctions.formatDate(input)
      },
      refreshData() {
        if (this.data) {
            this.data.consumerName = ''
            this.data.consumerNameKana = ''
            this.data.birthdate = ''
            this.data.phoneNumber1 = ''
            this.data.phoneNumber2 = ''
            this.data.mailAddress = ''
            this.data.postalCode = ''
            this.data.address = ''
            this.data.consumerMemo = ''
          }
      }
    }
};
</script>

<style>

div.modal#modal-reg .modal-content {
  width: 594px;
  height: 528px;
  margin: 0 auto;
}

div#modal-reg .modal-dialog {
  margin-top: 4rem;
}

.modal-body {
  padding-top: 1.25rem;
}

.modal-footer {
  align-self: center;
  border-top: none;
  padding-bottom: 2rem;
}

.modal-footer button {
  width: 170px;
  height: 44px;
  border-radius: 0.5rem;
  margin: 0 1rem;
}
</style>

<style scoped>
.confirm-info {
  padding: 1rem 1rem .5rem 1rem;
  font-size: 14px;
  text-align: left;
  height: 407px;
  width: 471px;
  overflow: auto;
  margin: auto
}

.confirm-info p {
  padding-top: 0.2rem;
}
</style>
