<template>
  <div>
    <b-modal
        id="modal-confirm"
        hide-header
        centered
        size="lg"
        @ok="handleEdit()"
        @hide="handleHide()"
        @cancel="handleHide()"
        :visible="showConfirmEdit"
        :hide-backdrop="true"
      >
        <div class="confirm-info">
          <p>氏名：{{ localConsumer.consumerName }}</p>
          <p>氏名（カナ）：{{ localConsumer.consumerNameKana }}</p>
          <p>生年月日：{{ formatDateItem(localConsumer.birthdate) }}</p>
          <p>電話番号１：{{ localConsumer.phoneNumber1 }}</p>
          <p>電話番号２：{{ localConsumer.phoneNumber2 }}</p>
          <p>メールアドレス：{{ localConsumer.mailAddress }}</p>
          <p>郵便番号：{{ localConsumer.postalCode }}</p>
          <p>住所：{{ localConsumer.address }}</p>
          <p>メモ：{{ localConsumer.consumerMemo }}</p>
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
import { commonFunctions } from '../../common';

export default {
    props: {
      showConfirmEdit: Boolean,
      localConsumer: {},
      backHome: Function,
    },
    computed: {
      ...mapState({
        employees: (state) => state.employees,
      })
    },
    created() {
    },
    methods: {
      ...mapActions("employees", {
      getUserInfo: "userInfo",
      }),
      ...mapActions("consumers", {
        update: "updateConsumer",
        deleteUser: "deleteConsumer",
        getAll: "getAll"
      }),
      handleEdit() {
        const data = {
          body: this.localConsumer,
          params: this.$route.params.consumerId
        }
        this.update(data).then(() => {
          this.backHome();
        })
        
      },
      handleHide() {
          this.$emit("changeModalConfirm", false)
      },
      formatDateItem(input) {
        return commonFunctions.formatDate(input)
      }
    },
};
</script>

<style>
div#modal-confirm .modal-dialog {
  margin-top: 4rem;
}

div.modal#modal-confirm .modal-dialog .modal-content {
  width: 594px;
  height: 528px;
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
