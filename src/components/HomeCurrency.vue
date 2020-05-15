<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card wrap">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс</th>
              <th>Дата</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="curr in currencies" :key="curr">
              <th>{{ curr }}</th>
              <th>{{ rates[curr].toFixed(3) }}</th>
              <th>{{ date | dateFilter("date") }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeCurrency",
  data: () => ({
    currencies: ["UAH", "RUB", "USD", "EUR"],
  }),
  props: ["rates", "date"],
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 400px;
}
</style>
