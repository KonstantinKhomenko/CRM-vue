<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card wrap">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="curr of currencies" :key="curr" class="currency-line">
          <span>{{ getCurrency(curr) | currencyFilter(curr) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBill",

  data: () => ({
    currencies: ["UAH", "RUB", "USD", "EUR"],
  }),

  props: ["rates"],

  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["UAH"] / this.rates["EUR"])
      );
    },
  },

  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency]);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 400px;
}
</style>
