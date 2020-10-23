<template>
  <div class="screen-contact">
    <div class="side-left">
      <div class="search-code">
        <b-input-group>
          <b-form-input
            type="text"
            placeholder="ショートコード"
            class="border-right-0 search-contact"
            maxlength=4
          ></b-form-input>
          <b-input-group-append>
            <b-button class="bg-transparent">
              <span class="btn-search-text">送信</span>
              <!-- <b-icon icon="search" /> -->
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <div class="info">
        <div class="content-info">
          <p>お客様コード：</p>
          <p>氏名　：</p>
          <p>属性情報</p>
          <p class="info-sub">年齢　：</p>
          <p class="info-sub">生年月日　：</p>
          <p class="info-sub">住所　：</p>
          <p class="info-sub">電話番号1　：</p>
          <p class="info-sub">電話番号2　：</p>
        </div>
      </div>
      <div class="action">
        <div class="action-panel">
          <b-button class="bg-transparent">
            <span class="">シミュレーション</span>
          </b-button>
          <b-button class="bg-transparent">
            <span class="">商品説明</span>
          </b-button>
          <b-button class="bg-transparent">
            <span class="">契約申込</span>
          </b-button>
        </div>
      </div>
    </div>
    <div class="side-right">
      <div class="screen-share">
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.screen-contact {
  display: flex;
  flex-direction: row;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 1410px;
  height: 710px;
}

.side-left {
  width: 25%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  padding-right: 1rem;
  margin: auto auto;
}

.side-right {
  width: 75%;
  margin-left: 2rem;
  margin: auto auto;
}

.screen-share {
  background-color: #ffffff;
  width: 100%;
  height: 702px;
  border-radius: .5rem;
}

.search-code {
  background-color: #ffffff;
  width: 100%;
  height: 52px;
  border-radius: .5rem;
  padding: .45rem 1rem;
}

.search-contact {
  border: 1px solid;
  border-radius: .5rem;
}

.btn-search-text {
  color: black;
}

.screen-contact .info {
  background-color: #ffffff;
  width: 100%;
  height: 228px;
  border-radius: .5rem;
  margin-top: .5rem;
}

.content-info {
  margin-left: 1rem;
  margin-top: .5rem;
  font-size: 13px;
}
.content-info p{
  margin-bottom: .5rem;
}
.content-info p.info-sub {
  margin-left: 2rem;
}

.action {
  background-color: #ffffff;
  width: 100%;
  height: 400px;
  border-radius: .5rem;
  margin-top: .5rem;
}

.action-panel {
  margin: .75rem .5rem;
  text-align: center;
}

.action-panel span {
  font-size: 0.75rem;
  color: black;
}

@media (max-width: 1400px) {
  .screen-contact {
    width: 100%
  }
};

@media (max-width: 1200px) {
  .action-panel {
    margin: .75rem .5rem;
    text-align: center;
  }

  .action-panel button {
    padding-left: .25rem;
    padding-right: .25rem;
  }

  .action-panel span {
    font-size: 12px;
    color: black;
  }
};

@media (max-width: 1000px) {
  .action-panel {
    margin: .75rem 0;
  }

  .action-panel span {
    font-size: 11px;
    color: black;
  }
};
</style>
