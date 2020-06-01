<template>
  <div>
    <div class="page-title">
      <h3>{{ 'planning' | localizeFilter }}</h3>
      <h4>{{ info.bill | currencyFilter('UAH') }}</h4>
    </div>

    <Loader v-if="loading" />

    <div class="center" v-else-if="!categories.length">
      {{ 'noCategories' | localizeFilter }}
      <div>
        <router-link to="/categories">{{
          'newCategory' | localizeFilter
        }}</router-link>
      </div>
    </div>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currencyFilter('UAH') }} из
          {{ cat.limit | currencyFilter('UAH') }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPersent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import currencyFilter from '@/filters/currencyFilter';
import localizeFilter from '@/filters/localizeFilter';

export default {
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: []
  }),

  metaInfo() {
    return {
      title: this.$title('menu_Planning')
    };
  },

  computed: {
    ...mapGetters(['info'])
  },

  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetchCategories');

    this.categories = categories.map(cat => {
      const spend = records
        .filter(rec => rec.categoryId === cat.id)
        .filter(rec => rec.type === 'outcome')
        .reduce((total, rec) => (total += +rec.amount), 0);

      const persent = (100 * spend) / cat.limit;
      const progressPersent = persent > 100 ? 100 : persent;
      const progressColor =
        persent < 60 ? 'green' : persent < 100 ? 'yellow' : 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${
        tooltipValue < 0 ? localizeFilter('excess') : localizeFilter('left')
      } ${currencyFilter(Math.abs(tooltipValue))}`;

      return {
        ...cat,
        progressPersent,
        progressColor,
        spend,
        tooltip
      };
    });

    this.loading = false;
  }
};
</script>
