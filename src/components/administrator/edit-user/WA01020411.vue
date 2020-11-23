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
          <ul class="div-information">
            <li>氏名：{{ localEmployee.employeeName }}</li>
            <li>氏名（カナ）：{{ localEmployee.mailAddress }}</li>
            <li>所属：{{ localEmployee.branchNumber }}</li>
            <li>パスワード： **************</li>
          </ul>
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
import { mapActions, mapState } from 'vuex';
export default {
    data() {
      return {
        localPassword: '',
      }
    },
    props: {
      showConfirmEdit: Boolean,
      localEmployee: {},
      backHome: Function,
    },
    computed: {
      ...mapState({
        alert: state => state.alert,
        employees: (state) => state.employees,
      })
    },
    created() {
    },
    methods: {
      ...mapActions("employees", {
        updateEmployee: "updateEmployee"
      }),

      handleEdit() {
        // this.$set('contacts[' + newPsgId + ']', newObj)
        console.log(this.localEmployee)
        const data = {
          body: this.localEmployee,
          params: this.$route.params.employeeId
        }
        this.updateEmployee(data).then(() => {
          this.backHome();
        })
      },
      handleHide() {
        this.$emit("changeModalConfirm", false)
      },
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
  font-size: 13px;
  text-align: left;
  height: 407px;
  width: 471px;
  overflow: auto;
  margin: auto
}

.div-information li {
  margin-top: 10px;
  list-style: none;
  font-size: 16px;
  font-family: 'HiraginoSan-W3';
}

.confirm-info p {
  padding-top: 0.2rem;
}
</style>
