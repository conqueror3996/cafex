<template>
  <div class="selected-content">
    <div>
        <p class="title-information">顧客情報</p>
        <div class="content-information">
            <div class="information">
                <p style="margin: 0;">氏名：{{ customer_detail.fullname }}</p> 
                <p style="margin: 0;">氏名（カナ）: {{ customer_detail.name_kana }} </p> 
                <span for="contractor">契約者情報</span> 
                <ul id="v-for-object" class="contractor-info">
                  <li v-for="(value, name) in customer_detail" :key="name" style="margin-top: 0.5rem;">
                    <span v-if="Object.keys(labels).includes(name)" > 
                      {{ labels[name] }} : {{ value }} 
                    </span>
                  </li>
                </ul>
                <!-- <label class="label-contractor" for="age">年齢：{{ customer_detail.age }}</label> 
                <label class="label-contractor" for="birthday">生年月日：{{ customer_detail.birthday }}</label> 
                <label class="label-contractor" for="postalcode">郵便番号：{{ customer_detail.post_code }}</label> 
                <label class="label-contractor" for="address">住所：{{ customer_detail.address }}</label> 
                <label class="label-contractor" for="phone1">電話番号１：{{ customer_detail.phone1 }}</label> 
                <label class="label-contractor" for="phone2">電話番号２：{{ customer_detail.phone2 }}</label>  
                href="/WA01010500"
                -->
            </div>
            <div class="form-group"> 
                <b-button class="btn btn-primary button-file" @click="goTo(customer_detail)"><img :src="imgButtonFile"></b-button>
                <b-button class="btn btn-primary button-remote"><img :src="imgButtonFile"></b-button>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
        imgButtonFile: './static/img/button_file.png',
        imgButtonRemote: './static/img/button_remote.png',
        customer_detail: {
          fullname: 'Khang',
          name_kana: 'Khang',
          age: '24',
          birthday: '1996/03/09',
          post_code: '3424',
          address: '32/2',
          phone1: '0914957644',
          phone2: '19001560',
          memo: 'manhkhang@vn-cubesystem.com'
        },
        requestJson: {
            user_id: 1
        },
        labels: {
          age: '年齢',
          birthday: '生年月日',
          post_code: '郵便番号',
          address: '住所',
          phone1: '電話番号１',
          phone2: '電話番号２',
        }
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users.all,
      detail: (state) => state.users.single
    }),
  },
  created() {
    this.getUser(this.requestJson);
    // this.setUserDetail(this.customer_detail)
    // console.log(this.detail)
  },
  methods: {
      ...mapActions("users", {
          getUser: "getUserById",
          goTo: "goToFileManagement",
          // setUserDetail: "setUserDetail",
      }),
      // goToFileManagement() {
      //   this.detail = this.customer_detail
      // }
    // ...mapActions("users", {
    //   getAllUsers: "getAll",
    //   deleteUser: "delete",
    // //   editItem: "editItem",
    // //   deleteItem: "deleteItem"
    // }),
    // editItem(user_id) {
    //   if(user_id !== this.selectedItem) {
    //       return
    //   }
    //   console.log('success')
  },

//   deleteItem(user_id) {
//       if(user_id !== this.selectedItem) {
//           return
//       }
//       console.log('success')
//   },
//   onRowSelected(items) {
//         this.selectedItem = items[0].user_id
//       },
//   selectedRow(item) {
//         this.$refs.selectableTable.selectRow(this.users.items.indexOf(item))
//       },
//   },
  
};
</script>

<style>
.title-information {
    width: 100px;
    height: 28px;
    color: #313131;
    font-family: "HiraginoSans-W3";
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    margin: 25px 0px 0px 123px;
}

.selected-content {
    background-color: #ffffff;
    width: 1327px;
    height: 572px;
}

.div-login {
    display: flex;
    justify-content: center;
    flex-direction: row;
    background-color: transparent;
    width: auto !important;
    height: 100vh !important;
    border-radius: 0px !important;
}

.content-information {
    width: 1102px;
    height: 297px;
    border: 1px solid #ccc!important;
    border-radius: 5px;
    margin: 15px 0px 0px 123px;
}

.contractor-info {
    list-style-type: none;
}
.information {
  width: 1102px;
  height: 297px;
  border-radius: 8px;
  border: solid 3px #979797;
  background: #ffffff;
  padding: 1rem 2rem;
}

.information label {
  font-size: 16px;
}

.button-file {
  margin: 40px 0px 0px 0px;
}

.button-remote {
  margin: 40px 0px 0px 90px;
}
</style>