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
      >
        <div class="confirm-info">
          <p>氏名：</p>
          <p>氏名（カナ）：</p>
          <p>生年月日：</p>
          <p>電話番号１：</p>
          <p>電話番号２：</p>
          <p>メールアドレス：</p>
          <p>郵便番号：</p>
          <p>住所：</p>
          <p>メモ：</p>
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
export default {
    props: [
        'showConfirmEdit',
    ],
    methods: {
        handleEdit() {

        },
        handleHide() {
            this.$emit("changeModalConfirm", false)
        }
    }
};
</script>

<style>
.modal-backdrop {
  opacity: 0.5 !important;
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
