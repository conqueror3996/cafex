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
      >
        <div class="confirm-info">
          <p>氏名：{{ data.consumerName }}</p>
          <p>氏名（カナ）：{{ data.consumerNameKana }}</p>
          <p>生年月日：{{ formatDateItem(data.birthdate) }}</p>
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
              実行
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
        data: {}
    },
    methods: {
      ...mapActions("consumers", {
            addConsumer: "addConsumer",
      }),
      handleReg() {
        this.addConsumer(this.data)
      },
      handleHide() {
          this.$emit("changeShowModal", false)
      },
      formatDateItem(input) {
        return commonFunctions.formatDate(input)
      }
    }
};
</script>

<style>
.modal-backdrop {
  opacity: 0.5 !important;
}

div.modal#modal-reg .modal-content {
  width: 594px;
  height: 528px;
  margin: 0 auto;
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
