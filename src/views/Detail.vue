<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          'menu_History' | localizeFilter
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income' ? income : outcome }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              green: record.type === 'income',
              red: record.type === 'outcome'
            }"
          >
            <div class="card-content white-text">
              <p>
                {{ 'description' | localizeFilter }}: {{ record.description }}
              </p>
              <p>
                {{ 'amount' | localizeFilter }}:
                {{ record.amount | currencyFilter }}
              </p>
              <p>
                {{ 'category' | localizeFilter }}: {{ record.categoryName }}
              </p>

              <small>{{ record.date | dateFilter('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="center" v-else>Запись с id={{ $route.params.id }} не найдена</p>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localizeFilter';

export default {
  name: 'Detail',
  data: () => ({
    record: null,
    loading: true,
    income: localizeFilter('income'),
    outcome: localizeFilter('outcome')
  }),

  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title
    };

    this.loading = false;
  }
};
</script>
